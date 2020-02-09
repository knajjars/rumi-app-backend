import mongoose from 'mongoose';

import { dbURL, logger } from '.';

mongoose
  .connect(dbURL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((x: any) => {
    logger.info(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err: Error) => {
    logger.info('Error connecting to mongo', err);
  });
