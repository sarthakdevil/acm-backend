import express, { Router } from 'express'
import cors from 'cors';
import morgan from 'morgan'
import dotenv from 'dotenv';
import errorHandler from './error/error.utils.js';
import  router from './router/auth.router.js';
import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

const corsOptions = {
    origin: `http://localhost:${process.env.PORT}`, // Allow requests from example.com
    methods: 'GET,POST', // Allow only GET and POST requests
  };

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later"
});

app.use(limiter);
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/ping',
(req, res) => {
    console.log('Ping received');
    const pong = new Date().toISOString();
    res.send(`pong ${pong}`);
});
app.use('/api',limiter,router)

app.get('*',(req,res)=>{
    res.status(404).send('404 not fond')
})

app.use(errorHandler);

export default app;