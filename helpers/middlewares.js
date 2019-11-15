// Check if the request content matches with bike Model
function checkBikeModel(req, res, next) {
    const {name, brand, year, type} = req.body;
    if (name && brand && year && type) {
        next()
    } else {
        res.status(400).json({message: 'Fields are not good !'})
    }
}

module.exports = {
    checkBikeModel
};
