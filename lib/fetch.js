'use strict';

require('dotenv').config();

const request = require('request');

/**
 * Get the latest premier league fixture list
 *
 * @return {Promise}  An array of Fixtures
 */
function fetch() {
    // api url for fixtures list
    let urls = String(process.env.FOOTBALL_API_URL);

    // see if it is given multiple urls (seperated by commas) or just one url
    if(urls.includes(',')) {
        // multiple urls given, split up
        urls = urls.split(',').map(function(url) {
            return String(url);
        });
    } else {
        // make the single url into a single array
        urls = [urls];
    }

    // make the request for the most updated fixtures lists
    return new Promise(function(resolve, reject) {
        Promise.all(
            urls.map(function(url) {
                return getFixtureList(url);
            })
        ).then(function(api_fixtures) {
                let api_fixtures_single = [];

                api_fixtures.forEach(function(entry) {
                    api_fixtures_single = api_fixtures_single.concat(entry);
                });

                return api_fixtures_single;
            })
            .then(function(api_fixtures_single) {
                resolve(api_fixtures_single);
            })
            .catch(function(error) {
                reject(error);
            });
    });
};

/**
 * Get a single fixture list with a GET request
 *
 * @param  {String} url The url to get
 * @return {Promise}
 */
function getFixtureList(url) {
    // api key from api.football-data.org
    const api_key = process.env.FOOTBALL_API;

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
