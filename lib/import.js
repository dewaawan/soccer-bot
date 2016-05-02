'use strict';

const moment = require('moment');
const low    = require('lowdb');

const storage = require('lowdb/file-sync');
const db      = low('db.json', { storage });

/*
 * Import to DB
 * Given an array of matches, insert them into the local database
 */
function importToDB(input) {
    // push data into fixtures database
    for(let i = 0; i < input.length; i++) {
        db('fixtures').push({
            id: i+1,
            matchday: input[i]['matchday'],
            date: moment(input[i]['date']).unix(),
            homeTeamName: input[i]['homeTeamName'],
            awayTeamName: input[i]['awayTeamName'],
            posted: false
        });
    }
}

module.exports = importToDB;
