import { MailOptions } from './mailer.types';

export default abstract class AbstractMailer {
  abstract send(options: MailOptions): Promise<void>;
}
