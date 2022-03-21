import express from 'express';
import ExchangeService from './services/ExchangeService';

class App {
  private exchangeService: ExchangeService;

  constructor() {
    this.exchangeService = new ExchangeService();
  }

  bootstrap() {
    const app = express();

    app.get('/save/exchanges/rates', this.saveExchangeRates);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.info(`Started on port: ${PORT}`);
    });
  }

  async saveExchangeRates(
    request: express.Request,
    response: express.Response,
  ) {
    const exchangeRates = await this.exchangeService.exchangeRateProducer();

    console.log('request', request.body);
    response.send(exchangeRates);
  }
}

new App().bootstrap();
