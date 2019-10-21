const express = require('express');
const router = express.Router();
//const jwt = require('jsonwebtoken');
//const validateRegisterInput = require('../validation/register');
//const validateLoginInput = require('../validation/login');

const Product = require('../models/Product');


router.get('/products', (req, res) =>{
    Product.find({}).then((resp) =>{
        if (resp) {
            console.log(resp)
            return res.json(resp);
        }

        //return res.status(400).json({produits: 'Impossible de charger les produits'});
    })

});


module.exports = router;