const fs = require('fs');

// This function creates a unique ID when adding a new bike
module.exports.createUUID = () => {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};


// check if the ID exists in the bikes list
module.exports.checkIfExists = (array, id) => {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id === id);
        if (!row) {
            reject({
                message: 'This ID does not exist',
                status: 404
            })
        }
        resolve(row)
    })
};

// Save data to a JSON file
module.exports.writeJSONFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content, null, 2), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
};
