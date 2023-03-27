import IProducer from './producer.interface';

export default abstract class AbstractMessaging implements IProducer {
  abstract sendTo(queueName: string, message: string): Promise<void>;
}
