const express = require('express');
const app = express();
const {Client} = require('pg');
const crypto = require('crypto');
// const ConsistentHash = require('consistent-hash');
const HashRing = require('hashring');
const hr = new HashRing();
hr.add('5434');
hr.add('5435');
hr.add('5436');



const clients = {
    '5434': new Client({
        host: 'localhost',
        port: 5434,
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    }),
    '5435': new Client({
        host: 'localhost',
        port: 5435,
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    }),
    '5436': new Client({
        host: 'localhost',
        port: 5436,
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    }),
}

connect();
async function connect() {
    await clients['5434'].connect();
    await clients['5435'].connect();
    await clients['5436'].connect();
}

app.get('/:urlId', async (req, res) => {
    //https://localhost:8081/abcd1
    const urlId = req.params.urlId; //abcd1
    const server = hr.get(urlId);
    const result = await clients[server].query(`SELECT * FROM URL_TABLE WHERE URL_ID = $1`, [urlId]);
    if (result.rowCount > 0) {
        res.send({
            "urlId": urlId,
            "url": result.rows[0],
            "server": server
        })
    }
    else {
        res.sendStatus(404);
    }
})

app.post('/', async (req, res) => {
    const url = req.query.url;
    // ex: http://localhost:8081/?url=https://wikipedia.com/sharding
    const hash = crypto.createHash("sha256").update(url).digest("hex");
    const urlId = hash.substring(0, 5);
    const server = hr.get(urlId);

    await clients[server].query(`INSERT INTO URL_TABLE (URL, URL_ID) VALUES ($1, $2)`, [url, urlId]);

    res.send({
        "urlId": urlId,
        "url": url,
        "server": server
    });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});