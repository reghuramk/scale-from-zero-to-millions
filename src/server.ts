import express from 'express';

const app = express()

app.get('/', (req, res) => {
    res.send('heloo guyss, its an honor from scale from zero!');
})

app.listen(3004, () => console.log('Listening on 3004'));