import dotenv from 'dotenv';

dotenv.config();

const port: string | undefined = process.env.PORT;
const dbURL: string | undefined = process.env.MONGODB_URL;

if (typeof port === 'undefined' || typeof dbURL === 'undefined') {
  throw new Error(`Missing environment variable/s`);
}

export { port, dbURL };
