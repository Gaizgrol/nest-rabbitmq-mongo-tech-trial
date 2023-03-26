import IMailer, { MailOptions } from './Mailer.interface';

export default class Mailer extends IMailer {
  async send(options: MailOptions) {
    // Dummy email
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
    console.log({ ...options });
  }
}
