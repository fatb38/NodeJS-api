/**
 * simulate a database
 * @type {array}
 */
let bikes = require('../data/bikesdatabase')

const { v4: uuidv4 } = require('uuid')
const { saveToJsonFile } = require('../helpers/helper')
const filename = './data/bikesdatabase.json'

function getBikes () {
  if (bikes.length === 0) {
    return Promise.reject({
      message: 'No bikes available',
      status: 202
    })
  }
  return Promise.resolve(bikes)
}

function getBike (id) {
  const bike = findBike(id)
  if (bike) {
    return Promise.resolve(bike)
  }
  return Promise.reject({ status: 404, message: 'Unknown ID' })
}

function insertBike (newBike) {
  newBike.id = uuidv4()
  bikes.push(newBike)
  saveToJsonFile(filename, bikes)
  return Promise.resolve(newBike)
}

function updateBike (id, updatedBike) {
  const bike = findBike(id)
  if (bike) {
    const index = bikes.findIndex(b => b.id === bike.id)
    bikes[index] = { ...updatedBike, id: bike.id }
    saveToJsonFile(filename, bikes)
    return Promise.resolve(bikes[index])
  }
  return Promise.reject({ status: 404, message: 'Unknown ID' })
}

function deleteBike (id) {
  const bike = findBike(id)
  if (bike) {
    bikes = bikes.filter(b => b.id !== id)
    saveToJsonFile(filename, bikes)
    return Promise.resolve()
  }
  return Promise.reject({ status: 404, message: 'Unknown ID' })
}

function findBike (id) {
  return bikes.find(bike => bike.id === id)
}

module.exports = {
  insertBike,
  getBikes,
  getBike,
  updateBike,
  deleteBike
}
