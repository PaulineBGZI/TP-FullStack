import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello from User Public!'));
app.use('/auth', authRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));