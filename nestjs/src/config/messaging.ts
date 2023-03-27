import { Options } from 'amqplib';
import { env } from 'process';

const protocol = 'amqp' as const;
const {
  MESSAGING_SERVICE_HOSTNAME: hostname,
  MESSAGING_SERVICE_USER: username,
  MESSAGING_SERVICE_PASS: password,
} = env;
const port = Number(env.MESSAGING_SERVICE_PORT);

const messaging: Options.Connect = {
  protocol,
  port,
  hostname,
  username,
  password,
};

export default messaging;
