'use strict';

var test    = require('./test.js');
var options = test.options;
var assert  = test.assert;

const message = require('../lib/message.js');

describe('message', function() {
    it('should return a formatted message given no fixtures', function() {
        const input = [];
        const expected = 'Kicking off soon:\n';

        assert.equal(message(input), expected);
    });

    it('should return a formatted message given just one fixture', function() {
        const input = [{ homeTeamName: 'AFC Bournemouth', awayTeamName: 'Arsenal FC' }];
        const expected = 'Kicking off soon:\nBournemouth v Arsenal';

        assert.equal(message(input), expected);
    });

    it('should return a formatted message given multiple fixtures', function() {
        const input = [
            { homeTeamName: 'AFC Bournemouth', awayTeamName: 'Arsenal FC' },
            { homeTeamName: 'West Ham United FC', awayTeamName: 'Chelsea FC' },
            { homeTeamName: 'Crystal Palace FC', awayTeamName: 'Sunderland AFC' }
        ];
        const expected = 'Kicking off soon:\nBournemouth v Arsenal,\nWest Ham United v Chelsea,\nCrystal Palace v Sunderland';

        assert.equal(message(input), expected);
    });
});
