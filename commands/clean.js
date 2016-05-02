'use strict';

const fs = require('fs');

/*
 * Clean
 * Remove the local database (for testing purposes really)
 */
function clean() {
    fs.unlinkSync('db.json');

    console.log('Removed the local database. Use `node bot.js setup` to import an up to date fixture list');
}

module.exports = clean;
