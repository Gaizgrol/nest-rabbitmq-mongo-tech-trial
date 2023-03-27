import AbstractMessaging from './messaging.abstract';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FakeMessagingService extends AbstractMessaging {
  public readonly queues: Record<string, Buffer[]> = {};

  async sendTo(queueName: string, message: string): Promise<void> {
    this.queues[queueName] ??= [];
    this.queues[queueName].push(Buffer.from(message));
  }
}
