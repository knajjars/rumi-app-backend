import mongoose from 'mongoose';

import { dbURL } from '.';

mongoose
  .connect(dbURL!, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x: any) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err: Error) => {
    console.error('Error connecting to mongo', err);
  });
