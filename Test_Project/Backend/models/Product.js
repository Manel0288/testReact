const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SchemaTypes = mongoose.Schema.Types;

const ProductSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: SchemaTypes.Decimal128,
        required: true
    },
    rating: {
        type: SchemaTypes.Decimal,
        required: true
    },
    warranty_years: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
});

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;