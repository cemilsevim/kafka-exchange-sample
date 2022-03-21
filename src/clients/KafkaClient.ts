import KafkaConfig from '../config/KafkaConfig';
import { Kafka } from 'kafkajs';

export function getClient() {
  const client = new Kafka({
    clientId: 'kafka-exchange-sample',
    brokers: [KafkaConfig.KAFKA_HOST],
  });
  return client;
}

export default getClient();
