export type MailOptions = {
  from: string;
  to: string;
  content: string;
};

export default abstract class IMailer {
  abstract send(options: MailOptions): Promise<void>;
}
