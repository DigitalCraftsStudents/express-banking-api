const HOST = '0.0.0.0';
const PORT = 9000;

const http = require('http');
const express = require('express')
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const logger = morgan('dev');

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const db = {
    banking: 200,
    investment: 5000,
    transactions: [{
        type: 'investment/deposit',
        amount: 5000,
        date: (new Date()).toLocaleString()
    },
    {
        type: 'banking/deposit',
        amount: 200,
        date: (new Date()).toLocaleString()
    }
    ]
};

const router = express.Router();
router.all('*', (req, res, next) => {
    if (req.body) {
        console.table(req.body);
    }
    next();
});
router
    .get('/', (req, res) => {
        res.json({
            ...db
        });
    })
    .get('/banking', (req, res) => {
        res.json({
            banking: db.banking
        });
    })    // READ banking value
    .put('/banking', (req, res) => {
        const { amount } = req.body;
        db.banking = parseFloat(amount);
        res.json({
            banking: db.banking
        });
    })    // UPDATE banking value
    .get('/investment', (req, res) => {
        res.json({
            investment: db.investment
        });
    })    // READ investment value
    .put('/investment', (req, res) => {
        const { amount } = req.body;
        db.investment = parseFloat(amount);
        res.json({
            investment: db.investment
        });
    })    // UPDATE investment value
    .get('/transactions', (req, res) => {
        res.json({
            transactions: db.transactions
        });
    })
    .post('/transactions', (req, res) => {
        const tr = {
            ...req.body,
            amount: parseFloat(req.body.amount)
        };
        db.transactions.push(tr);
        res.json({
            transactions: db.transactions
        });
    })

app.use('/api', router);

server.listen(PORT, HOST, () => {
   console.log(`Running on port ${PORT}`);
});