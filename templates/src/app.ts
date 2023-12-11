import { globalCatch } from '@middlewares/global-catch';
import cors from 'cors';
import express from 'express';
import router from 'routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.use(globalCatch);

export default app;
