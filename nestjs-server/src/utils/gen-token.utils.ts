import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export const genHexToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const genJwt = async (
  userId: string,
  secret: string,
  notifications: boolean,
  expiry?: string
): Promise<string> => {
  return jwt.sign({ id: userId, notifications }, secret, {
    expiresIn: expiry ?? '30d'
  });
};
