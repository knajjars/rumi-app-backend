import express from 'express';

import port from './configs';
import router from './routes';

const app = express();

app.use('/', router);
app.use((_req, res, next) => {
  res.status(404).json('Route not found');
  next();
});

app.listen(port, () => console.log(`Aprta is live on port ${port}!`));
