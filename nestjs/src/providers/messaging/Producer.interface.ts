export default abstract class IProducer {
  abstract sendTo(queueName: string, message: string): Promise<void>;
}
