const fs = require('fs')

// Save data to a JSON file
function saveToJsonFile (filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content, null, 2), 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = { saveToJsonFile }
