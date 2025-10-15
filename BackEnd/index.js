import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectToMongo from './config/mongodb.js';

import authRouter from './routes/authRouter.js';
import notesRouter from './routes/notesRouter.js';

const app = express();
const port = 5000;

connectToMongo();

const allowedOrigins = ['http://localhost:3000', 'localhost:3000']
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

app.listen(port, () => {
    console.log(`iNoteBook BackEnd listening at http://localhost:${port}`);
});
