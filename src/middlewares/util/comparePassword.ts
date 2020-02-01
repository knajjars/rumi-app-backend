import bcrypt from 'bcrypt';

export function comparePassword(passwordProvided: string, userPassword: string): boolean {
  return bcrypt.compareSync(passwordProvided, userPassword);
}
