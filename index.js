const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');

const client = redis.createClient({
    socket: {
        host: 'db',
        port: '6379'
    }
});
const app = express();

app.use(bodyParser.json());

client.on('error', err => console.error('Redis error:', err));

async function main() {
    await client.connect();

    app.get('/', (req, res) => res.send('Hello there!\n'));

    app.get('/cache', (req, res) => {
        client
            .get('value')
            .then(rep => res.send(rep));
    });

    app.post('/cache', (req, res) => {
        let data = req.body.cache;
        client
            .set('value', data)
            .then(res.send('OK'));
    });

    app.listen(3000, () => console.log('Server is UP & RUNNING!'));
}

main();
