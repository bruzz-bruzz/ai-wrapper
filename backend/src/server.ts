import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import {body, validationResult} from 'express-validator'
import {GoogleGenAI} from '@google/genai'

const app = express()
app.use(express.json())

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

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY as string,
})

app.post('/',[body('prompt').trim().isString().notEmpty()],async(req:express.Request,res:express.Response)=>{
    const errs = validationResult(req)
    if(!errs.isEmpty()){
        return res.status(400).json({errors:errs.array()})
    }
    try {
        const resultStream = await ai.models.generateContentStream({
            model: "gemini-3.5-flash",
            contents: [ { role: "user", parts: [{ text: req.body.prompt }] } ],
        });
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');
        for await (const chunk of resultStream) {
            const text = chunk.text;
            console.log(text)
            if (text) {
                res.write(text);
            }
        }
        res.end();
    } catch(e){
        console.log(e)
        return res.status(500).json({msg:"An error occurred."})
    }
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})
