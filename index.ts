import express from 'express';

const app = express()

app.get('/', (req, res) => {
    res.send('heloo world')
})

app.get('/home', (req, res) => {
    res.send('heloo home')
})


app.listen(3000, () => console.log('Listening on 3000'));

