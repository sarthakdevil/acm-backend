import express, { Router } from 'express'
import cors from 'cors';
import morgan from 'morgan'
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/ping',
(req, res) => {
    console.log('Ping received');
    const pong = new Date().toISOString();
    res.send(`pong ${pong}`);
});
app.get('/api/user',Router)

app.get('*',(req,res)=>{
    res.status(404).send('404 not fond')
})

export default app;