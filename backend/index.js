import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import { connectDB } from './config/db.js'
import userRouter from './routers/userRoute.js'
import productRouter from './routers/productRouter.js'
import orderRouter from './routers/orderRouter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

connectDB()

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.listen(PORT, () => {
    console.log('[+] Server started on port : ', PORT)
})