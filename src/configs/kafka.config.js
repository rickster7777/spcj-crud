import { Kafka, Partitioners } from "kafkajs";

export class KafkaProducerClient {
    constructor(clientId, brokers) {
        this.kafka = new Kafka({
            clientId,
            brokers
        });

        this.producer = this.kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner,
            maxRequestSize: 120000000,
        });
    }

    async connect() {
        console.log("Connecting to Kafka Producer...");
        await this.producer.connect();
        console.log("Kafka Producer Connected.");
    }

    async send(topic, messages) {
        try {
            await this.producer.send({
                topic,
                messages,
            });
            console.log(`Message sent to topic: ${topic}`);
        } catch (error) {
            console.error(`Failed to send message to topic: ${topic}`, error);
        }
    }

    async disconnect() {
        console.log("Disconnecting from Kafka Producer...");
        await this.producer.disconnect();
        console.log("Kafka Producer Disconnected.");
    }
}
