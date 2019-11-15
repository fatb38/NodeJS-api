/**
 * @type {array}
 */
let bikes = require('../data/bikesdatabase');

const helper = require('../helpers/helper');
const filename = './data/bikesdatabase.json';

function getBikes() {
    return new Promise((resolve, reject) => {
        if (bikes.length === 0) {
            reject({
                message: 'No bikes available',
                status: 202
            })
        }
        resolve(bikes)
    })
}

function getSingleBike(id) {
    return new Promise((resolve, reject) => {
        helper.checkIfExists(bikes, id)
            .then(bike => resolve(bike))
            .catch(err => reject(err))
    })
}

function insertBike(newBike) {
    return new Promise((resolve) => {
        const id = {id: helper.createUUID()};
        newBike = {...id, ...newBike};
        bikes.push(newBike);
        helper.writeJSONFile(filename, bikes);
        resolve(newBike)
    })
}

function updateBike(id, newBike) {
    return new Promise((resolve, reject) => {
        helper.checkIfExists(bikes, id)
            .then(bike => {
                const index = bikes.findIndex(b => b.id === bike.id);
                id = {id: bike.id};
                bikes[index] = {...id, ...newBike};
                helper.writeJSONFile(filename, bikes);
                resolve(bikes[index])
            })
            .catch(err => reject(err))
    })
}

function deleteBike(id) {
    return new Promise((resolve, reject) => {
        helper.checkIfExists(bikes, id)
            .then(() => {
                bikes = bikes.filter(b => b.id !== id);
                helper.writeJSONFile(filename, bikes);
                resolve()
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    insertBike,
    getBikes,
    getSingleBike,
    updateBike,
    deleteBike
};
