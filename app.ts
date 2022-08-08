import express, { Express, Request, Response } from 'express';

const app: Express = express()
const port: Number = 8080

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World you suck!')
})
app.get('/hello', (req: Request, res: Response) => {
    res.send('this is new!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
