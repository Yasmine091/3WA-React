import express from 'express';
import chocoRouter from './routes/chocolates.js';
import userRouter from './routes/users.js';
import { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const mongoDB = String(process.env.MongoURI);

mongoose .connect(mongoDB, {useNewUrlParser: true});
const db = mongoose.connection;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(json());
app.use(urlencoded({ extended: true }));

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    res.render('index');
});

app.use('/api', userRouter);
app.use('/api', chocoRouter);

app.listen(port, () => console.log(`app active on ${port}`));

db.on("error", console.error.bind(console, "MongoDB connection error:" ));