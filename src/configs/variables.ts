import dotenv from 'dotenv';

dotenv.config();

const port: string | undefined = process.env.PORT;
const dbURL: string | undefined = process.env.MONGODB_URL;
const sessionSecret: string | undefined = process.env.SESSION_SECRET;

if (typeof port === 'undefined' || typeof dbURL === 'undefined' || typeof sessionSecret === 'undefined') {
  throw new Error(`Missing environment variable/s`);
}

export { port, dbURL, sessionSecret };
