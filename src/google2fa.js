import authenticator from 'otplib/authenticator';
import crypto from 'crypto';
import config from '../../similarweb.json';

authenticator.options = {crypto};

while (true) {
  const token = authenticator.generate(config.secret);
  process.stdout.write(token);
  process.stdout.write('\b\b\b\b\b\b');
}
