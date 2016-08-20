'use strict';

const importToDB = require('../lib/import');
const fetch      = require('../lib/fetch');

/**
 * The first time setup of the fixture list in the database using
 * data from https://api.football-data.org/
 *
 * @return {Promise}
 */
const setup = () => {
    return new Promise((resolve, reject) => {
        fetch().then(data => {
                importToDB(data).then(data => {
                        // return imported documents
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
};

module.exports = setup;
