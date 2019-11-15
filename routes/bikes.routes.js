const express = require('express');
const router = express.Router();
const bike = require('../models/bike.model');
const m = require('../helpers/middlewares');

/* GET All bikes */
router.get('/', async (req, res) => {
    await bike.getBikes()
        .then(bikes => res.json(bikes))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({message: err.message})
            } else {
                res.status(500).json({message: err.message})
            }
        })
});

/* GET a single bike with id */
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    await bike.getSingleBike(id)
        .then(bike => res.json(bike))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({message: err.message})
            } else {
                res.status(500).json({message: err.message})
            }
        })
});

/* POST a new bike */
router.post('/new', m.checkBikeModel, async (req, res) => {
    await bike.insertBike(req.body)
        .then(bike => res.status(201).json({
            message: `The bike #${bike.id} has been created !`,
            content: bike
        }))
        .catch(err => res.status(500).json({message: err.message}))
});

/* Update (PUT) a bike */
router.put('/edit/:id', m.checkBikeModel, async (req, res) => {
    const id = req.params.id;

    await bike.updateBike(id, req.body)
        .then(bike => res.json({
            message: `The bike #${id} has been updated !`,
            content: bike
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({message: err.message})
            }
            res.status(500).json({message: err.message})
        })
});

/* DELETE a bike */
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    await bike.deleteBike(id)
        .then(() => res.json({
            message: `The bike #${id} has been deleted !`
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({message: err.message})
            }
            res.status(500).json({message: err.message})
        })
});

module.exports = router;
