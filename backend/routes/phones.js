const router = require('express').Router();
let Phone = require('../models/phones.model');

router.route('/').get((req, res) => {
    Phone.find()
        .then((phone) => res.json(phone))
        .catch((err) => req.statusCode(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Phone.findById(req.params.id)
        .then((phone) => res.json(phone))
        .catch((err) => req.statusCode(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Phone.findByIdAndDelete(req.params.id)
        .then(() => res.json('Phone deleted!'))
        .catch((err) => req.statusCode(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const img = req.body.img;
    const quantity = req.body.quantity;

    const newPhone = new Phone({ name, price, img, quantity });

    newPhone
        .save()
        .then(() => res.json('Phone added!'))
        .catch((err) => req.statusCode(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Phone.findById(req.params.id)
        .then((phone) => {
            phone.name = req.body.name || phone.name;
            phone.price = req.body.price || phone.price;
            phone.img = req.body.img || phone.img;
            phone.quantity = req.body.quantity || phone.quantity;

            phone
                .save()
                .then(() => res.json('Phone updated!'))
                .catch((err) => req.statusCode(400).json('Error: ' + err));
        })
        .catch((err) => req.statusCode(400).json('Error: ' + err));
});

module.exports = router;
