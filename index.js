import express from 'express'
import cors from 'cors'
import http from 'http'
import chatRoute from './routes/chatRoute.js'

const app = express();
const port = 7000;

app.use(cors());
app.use(express.json());

app.use('/api/chat',chatRoute)

app.listen(port,()=>{
    console.log(`Express Server is started at PORT: ${port}`);
});