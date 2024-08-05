import { KafkaProducerClient } from "../../configs/kafka.config";
import { KAFKA_CLIENT_ID, KAFKA_BROKERS } from "../../configs/constants.config";

export const connectProducer = async () => {
    const kafkaProducer = new KafkaProducerClient(KAFKA_CLIENT_ID, KAFKA_BROKERS, {});
    await kafkaProducer.connect();
    return kafkaProducer;
};