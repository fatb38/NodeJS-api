const express = require('express')
const router = express.Router()
const { getBikes, getSingleBike, insertBike, updateBike, deleteBike } = require('../models/bike.model')
const { checkBikeModel } = require('../helpers/middlewares')


router.route('/')
  /* GET All bikes */
  .get(async (req, res) => {
    try {
      const bikes = await getBikes()
      res.json(bikes)
    } catch (err) {
      res.status(err.status || 500).json(err.message)
    }
  })
  /* POST a new bike */
  .post(checkBikeModel, async (req, res) => {
    try {
      const newBike = await insertBike(req.body)
      res.status(201).json({
        message: `The bike #${ newBike.id } has been created !`,
        content: newBike
      })
    } catch (err) {
      res.status(err.status || 500).json(err.message)
    }
  })

router.route('/:id')
  /* GET a single bike with id */
  .get(async (req, res) => {
    try {
      const bike = await getSingleBike(req.params.id)
      res.json(bike)
    } catch (err) {
      res.status(err.status || 500).json(err.message)
    }
  })
  /* Update (PUT) a bike */
  .put(checkBikeModel, async (req, res) => {
    try {
      const bike = await updateBike(req.params.id, req.body)
      res.json({
        message: `bike has been updated !`,
        content: bike
      })
    } catch (err) {
      res.status(err.status || 500).json(err.message)
    }
  })
  /* DELETE a bike */
  .delete(async (req, res) => {
    try {
      await deleteBike(req.params.id)
      res.status(204)
    } catch (err) {
      res.status(err.status || 500).json(err.message)
    }
  })

module.exports = router
