import express from 'express';

import { port } from './configs/variables';

const app = express();

app.get('/', (_req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Aprta is live on port ${port}!`));
