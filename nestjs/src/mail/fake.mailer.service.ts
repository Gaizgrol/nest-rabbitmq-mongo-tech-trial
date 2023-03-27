import { Injectable } from '@nestjs/common';
import AbstractMailer from './mailer.abstract';
import { MailOptions } from './mailer.types';

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

@Injectable()
export default class FakeMailerService extends AbstractMailer {
  public mails: MailOptions[] = [];

  async send(options: MailOptions) {
    this.mails.push({ ...options });
    await sleep(1000);
    console.log('Mail sent!', options);
  }
}
