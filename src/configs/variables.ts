import dotenv from 'dotenv';

dotenv.config();

const port: string | undefined = process.env.PORT;

if (typeof port === 'undefined') {
  throw new Error(`Missing variable ${port}`);
}

export default port;
