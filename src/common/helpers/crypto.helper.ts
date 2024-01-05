import { Logger } from '@nestjs/common';
import { hash } from 'bcrypt';
import { authenticator } from 'otplib';

const logger = new Logger('CryptoHelper');

export const CryptoHelper = {
  bcryptHash: (password: string): Promise<string> => {
    return hash(password, 10);
  },

  generateOtp: (): { secret: string; otp: string } => {
    const secret = authenticator.generateSecret();
    const otp = authenticator.generate(secret);

    return { secret, otp };
  },

  verifyOtp: (secret, otp): boolean => {
    try {
      return authenticator.check(otp, secret);
    } catch (error) {
      logger.error(error);
    }
  },
};
