'use strict';

require('dotenv').config();

const request = require('sync-request');

/*
 * Fetch
 * Get the latest premier league fixture list
 * Return an array of fixtures
 */
function fetch() {
    // api key from api.football-data.org
    const api_key = process.env.FOOTBALL_API;

    // api url for fixtures list
    const url = process.env.FOOTBALL_API_URL;

    // make the request for the most updated fixtures list
    let api_fixtures = request('get', url, { 'headers': { 'X-Auth-Token': api_key } });
    api_fixtures     = JSON.parse(api_fixtures.getBody().toString());
    api_fixtures     = api_fixtures.fixtures;

    return api_fixtures;
}

module.exports = fetch;
