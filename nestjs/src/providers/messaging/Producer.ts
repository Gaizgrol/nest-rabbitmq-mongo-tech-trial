import { Channel, connect } from 'amqplib';
import IProducer from './Producer.interface';

export default class Producer extends IProducer {
  private channel: Channel;

  constructor() {
    super();
    this.init();
  }

  private async init(): Promise<void> {
    const {
      MESSAGING_SERVICE_HOSTNAME: hostname,
      MESSAGING_SERVICE_PORT: port,
      MESSAGING_SERVICE_USER: username,
      MESSAGING_SERVICE_PASS: password,
    } = process.env;

    const connection = await connect({
      protocol: 'amqp',
      port: Number(port),
      hostname,
      username,
      password,
    });
    this.channel = await connection.createChannel();
  }

  async sendTo(queueName: string, message: string): Promise<void> {
    console.log('sending', message, 'to', queueName);
    await this.channel.assertQueue(queueName, { durable: false });
    this.channel.sendToQueue(queueName, Buffer.from(message));
  }
}
