const mongoose = require('mongoose');

const schema = mongoose.Schema;

const phonesSchema = new schema({
    name: { required: true, type: String },
    price: { required: true, type: Number },
    img: { required: true, type: String },
    quantity: { required: true, type: Number },
});

const phones = mongoose.model('phones', phonesSchema);

module.exports = phones;
