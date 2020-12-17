import dotenv from 'dotenv';

dotenv.config();

export const port: string | undefined = process.env.PORT;
export const dbURL: string | undefined = process.env.MONGODB_URL;
export const sessionSecret: string | undefined = process.env.SESSION_SECRET;
export const sibKey: string | undefined = process.env.SIB_KEY;
export const spacesAccessKey: string | undefined = process.env.DO_SPACES_ACCESS_KEY;
export const spacesSecretKey: string | undefined = process.env.DO_SPACES_SECRET_ACCESS_KEY;

const requiredVariables: any[] = [
  port,
  dbURL,
  sessionSecret,
  sibKey,
  spacesAccessKey,
  spacesSecretKey
];

requiredVariables.forEach(envVar => {
  if (typeof envVar === 'undefined') {
    throw new Error(`Missing environment variable ${{ envVar }}`);
  }
});
