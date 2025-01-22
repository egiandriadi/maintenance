import mqtt, { MqttClient } from 'mqtt';

class MqttService {
  private client: MqttClient;
  private readonly brokerUrl: string;
  private readonly topic: string;

  constructor(brokerUrl: string, topic: string) {
    this.brokerUrl = brokerUrl;
    this.topic = topic;
    this.client = mqtt.connect(this.brokerUrl);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.client.subscribe(this.topic, (err) => {
        if (err) {
          console.error('Failed to subscribe to topic:', err);
        } else {
          console.log(`Subscribed to topic: ${this.topic}`);
        }
      });
    });

    this.client.on('error', (error) => {
      console.error('MQTT connection error:', error);
    });
  }

  onMessage(callback: (topic: string, message: Buffer) => void) {
    this.client.on('message', (topic, message) => {
      callback(topic, message);
    });
  }

  publishMessage(message: string) {
    this.client.publish(this.topic, message, (err) => {
      if (err) {
        console.error('Failed to publish MQTT message:', err);
      } else {
        console.log('MQTT message published:', message);
      }
    });
  }
}

// Export an instance of the service
const mtqq_host = process.env.NEXT_PUBLIC_MTQQ_HOST_URL?.toString() || 'mqtt://localhost:1883';
const mqttService = new MqttService(mtqq_host, 'maintenance/updates');
export default mqttService;