'use strict';

const low = require('lowdb');

const storage = require('lowdb/file-sync');
const db      = low('db.json', { storage });

/*
 * Posted
 * Update the posted key to true in the local database for specified matches
 * Arguements: input (an array of fixtures)
 */
function posted(input) {
    // run through all the given fixtures and update the posted key to true
    for(let i = 0; i < input.length; i++) {
        db('fixtures').chain().find({ id: input[i].id }).assign({ posted: true }).value();
    }
}

module.exports = posted;
