import express, { Router } from 'express'
import cors from 'cors';
import morgan from 'morgan'
import dotenv from 'dotenv';
import errorHandler from './utils/error.utils.js';
import  router from './router/auth.router.js';
import rateLimit from 'express-rate-limit';
import blogrouter from './router/blog.router.js';
import memberrouter from './router/acmmembers.router.js';
import { PrismaClient } from '@prisma/client';
const prisma = new  PrismaClient();
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
app.use('/api',limiter,blogrouter)
app.use('/api',limiter,memberrouter)

app.get('*', async (req, res) => {
    try {
      // Increment the visitor count
      await prisma.visitorCount.update({
        where: { id: 1 }, // Assuming the visitor count is stored with ID 1
        data: { count: { increment: 1 } }
      });
  
      // Retrieve the updated visitor count
      const updatedVisitorCount = await prisma.visitorCount.findUnique({ where: { id: 1 } });
  
      console.log(`Visitor Count: ${updatedVisitorCount.count}`);
  
      // Send the response
      res.status(404).send('404 Not Found');
    } catch (error) {
      console.error('Error updating visitor count:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.use(errorHandler);

export default app;