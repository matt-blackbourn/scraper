import express, { Express, Request, Response } from 'express';
require('dotenv').config()

const app: Express = express()
const port = process.env.PORT || 8080

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World you suck!')
})

app.get('/hello', (req: Request, res: Response) => {
    res.send('hello!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
