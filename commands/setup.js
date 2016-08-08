'use strict';

const importToDB = require('../lib/import');
const fetch      = require('../lib/fetch');

/**
 * The first time setup of the fixture list in the database using
 * data from https://api.football-data.org/
 *
 * @return {Promise}
 */
function setup() {
    return new Promise(function(resolve, reject) {
        fetch().then(function(data) {
                importToDB(data).then(function(data) {
                        // return imported documents
                        resolve(data);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            })
            .catch(function(error) {
                reject(error);
            });
    });
};

module.exports = setup;
