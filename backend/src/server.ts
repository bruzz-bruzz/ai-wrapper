import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import axios from 'axios'
import {body, validationResult} from 'express-validator'
const app = express()
const limiter = rateLimit({
    max:100,
    windowMs:60*60*1000,
})
dotenv.config()
app.use(cors({
    origin:process.env.ORIGIN
}))
app.use(helmet())
app.use(limiter)
app.post('/',[body('prompt').trim().isString().notEmpty()],async(req:express.Request,res:express.Response)=>{
    const errs = validationResult(req)
    if(!errs.isEmpty()){
        return res.status(400).json({errors:errs.array()})
    }
    const aiResponse = await axios
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})