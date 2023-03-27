export default interface IProducer {
  sendTo(channel: string, message: string): Promise<void>;
}
