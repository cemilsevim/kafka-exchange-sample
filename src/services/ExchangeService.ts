import KafkaClient from '../clients/KafkaClient';
import TcmbService, { ExchangeRates } from './TcmbService';

class ExchangeService {
  private tcmbService: TcmbService;

  constructor() {
    this.tcmbService = new TcmbService();
  }

  async exchangeRateProducer(): Promise<{
    data: { exchangeRates: ExchangeRates };
    metadata: any;
  }> {
    const exchangeRates = await this.tcmbService.exchangeRates();
    const admin = KafkaClient.admin();
    const producer = KafkaClient.producer();

    await Promise.all([admin.connect(), producer.connect()]);

    await admin.createTopics({
      waitForLeaders: true,
      topics: [{ topic: 'exchange-rates' }],
    });
    const recordMetadata = await producer.send({
      topic: 'exchange-rates',
      messages: [{ value: JSON.stringify(exchangeRates) }],
    });

    await Promise.all([admin.disconnect(), producer.disconnect()]);

    return {
      data: { exchangeRates },
      metadata: recordMetadata,
    };
  }
}

new ExchangeService().exchangeRateProducer().then((exchangeRates) => {
  console.log('Exchange rates', exchangeRates);
});

export default ExchangeService;
