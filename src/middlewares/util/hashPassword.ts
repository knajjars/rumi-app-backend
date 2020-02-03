import bcrypt from 'bcrypt';

const bcryptSalt = 10;

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  return hashPass;
}
