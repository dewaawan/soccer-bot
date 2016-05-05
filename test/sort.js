'use strict';

var test    = require('./test.js');
var options = test.options;
var assert  = test.assert;

const sort = require('../lib/sort.js');

describe('sort', function() {
    it('should return a sorted array of objects', function() {
        const input = {
            args: [
                {
                    homeTeamName: 'Manchester United FC',
                    awayTeamName: 'Tottenham Hotspur FC'
                },
                {
                    homeTeamName: 'Everton FC',
                    awayTeamName: 'Watford FC'
                },
                {
                    homeTeamName: 'Aston Villa FC',
                    awayTeamName: 'Chelsea FC',
                },
                {
                    homeTeamName: 'Aston Villa FC',
                    awayTeamName: 'Manchester United FC'
                }
            ],
            expected: [
                {
                    homeTeamName: 'Aston Villa FC',
                    awayTeamName: 'Chelsea FC',
                },
                {
                    homeTeamName: 'Aston Villa FC',
                    awayTeamName: 'Manchester United FC'
                },
                {
                    homeTeamName: 'Everton FC',
                    awayTeamName: 'Watford FC'
                },
                {
                    homeTeamName: 'Manchester United FC',
                    awayTeamName: 'Tottenham Hotspur FC'
                },
            ]
        };

        assert.deepEqual(sort(input.args), input.expected);
    });
});
