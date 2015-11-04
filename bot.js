require('dotenv').load();

var moment = require('moment');
var fixturesEpl = require('./fixtures/epl.json')['fixtures'];
var fixturesCl = require('./fixtures/cl.json')['fixtures'];
var postMessage = require('./lib/postMessage.js');

var matches_rn = [];
var now        = moment().utc();

fixturesEpl.forEach(function(entry) {
    // set the entry date to be the entry date in utc and a unix number
    entry.date = moment(entry.date).utc();

    // if the match is within 10 minutes of the current time,
    // and it has not been sent, then add the match to the lest of matches_rn
    if(    (0 <= entry.date - now)
        && (entry.date.diff(now, 'minutes') <= 10)
        && (!entry.hasOwnProperty('sent'))
      ) {
        matches_rn.push(entry.homeTeamName + ' vs ' + entry.awayTeamName);
    }
});

if(matches_rn.length > 0) {
    if(matches_rn.length == 1) {
        plural = 'match';
    }
    else {
        plural = 'matches';
    }

    // post a message using the BOT_ID and matches_rn
    postMessage(process.env.BOT_ID,
        matches_rn.length + ' ' + plural + ' kicking off soon:\n' +
        matches_rn.join(',\n')
    );
}
else {
    console.log('no matches found');
}
