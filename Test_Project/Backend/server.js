const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');

const users = require('./routes/user');
const products = require('./routes/products');
const authCheck =  require('./middlewares/authCheck');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/users', authCheck, products);

app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Le serveur est exécuté sur le PORT ${PORT}`);
});