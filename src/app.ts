import express, { Express } from 'express';
import { bootstrap } from './boostrap';

const app: Express = express();
const port: number = 3000;
//const logger = morgan('tiny');

bootstrap(app);

//app.use();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
