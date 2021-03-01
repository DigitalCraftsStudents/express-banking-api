const HOST = '0.0.0.0';
const PORT = 9000;

const http = require('http');
const express = require('express')
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const logger = morgan('dev');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const db = {
    banking: 2,
    investment: 3,
    transactions: [{
        type: 'investment/deposit',
        amount: 3,
        date: (new Date()).toLocaleString()
    }]
};

const router = express.Router();
router
    .get('/banking', (req, res) => {
        res.json({
            banking: db.banking
        })
    })    // READ banking value
    .put('/banking', (req, res) => {})    // UPDATE banking value
    .get('/investment', (req, res) => {
        res.json({
            investment: db.investment
        })
    })    // READ banking value
    .put('/investment', (req, res) => {})    // UPDATE banking value
    .get('/transactions', (req, res) => {
        res.json({
            transactions: db.transactions
        })
    })

app.use('/api', router);

server.listen(PORT, HOST, () => {
   console.log(`Running on port ${PORT}`);
});