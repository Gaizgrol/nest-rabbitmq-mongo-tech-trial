import { Channel, connect } from 'amqplib';
import AbstractMessaging from './messaging.abstract';

import messaging from 'src/config/messaging';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class MessagingService extends AbstractMessaging {
  private channel: Channel;

  async init(): Promise<void> {
    const connection = await connect(messaging);
    this.channel = await connection.createChannel();
  }

  async sendTo(queueName: string, message: string): Promise<void> {
    await this.channel.assertQueue(queueName, { durable: false });
    this.channel.sendToQueue(queueName, Buffer.from(message));
  }
}
