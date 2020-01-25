import express from 'express';

import { port } from './configs';

const app = express();

app.get('/', (_req, res) => res.send('Hello World! I am Aprta.'));

app.listen(port, () => console.log(`Aprta is live on port ${port}!`));
