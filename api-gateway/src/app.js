import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import { createServer } from 'http';

import TripRouter from 'routes/trip.js';
import IndexRouter from 'routes/index.js';

const app = express();
const server = createServer(app);

app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', IndexRouter);
app.use('/api/v1/trip', TripRouter);

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
