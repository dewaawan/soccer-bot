'use strict';

require('dotenv').config();

const request = require('request');

/**
 * Get the latest premier league fixture list
 *
 * @return {Promise | Object}  An array of Fixtures
 */
function fetch() {
    // api key from api.football-data.org
    const api_key = process.env.FOOTBALL_API;
    // api url for fixtures list
    const url = process.env.FOOTBALL_API_URL.toString();

    // make the request for the most updated fixtures list
    return new Promise(function(resolve, reject) {
        request({
            headers: { 'X-Auth-Token': api_key },
            uri: url,
            method: 'get'
        }, function(error, response, body) {
            if (error) {
                reject(error);
            }

            // Extract the fixtures as an array from the body
            let api_fixtures = JSON.parse(body);
            api_fixtures     = api_fixtures.fixtures;

            resolve(api_fixtures);
        });
    });
};

module.exports = fetch;
