const test    = require('./test')
const options = test.options
const assert  = test.assert

const message = require('../lib/messageBuilder')

describe('message', () => {
    it('should return a formatted message given no fixtures', () => {
        const input = []
        const expected = ''

        assert.equal(message(input), expected)
    })

    it('should return a formatted message given just one fixture', () => {
        const input = [{ homeTeamName: 'AFC Bournemouth', awayTeamName: 'Arsenal FC' }]
        const expected = 'Kicking off soon:\nBournemouth v Arsenal'

        assert.equal(message(input), expected)
    })

    it('should return a formatted message given multiple fixtures', () => {
        const input = [
            { homeTeamName: 'AFC Bournemouth', awayTeamName: 'Arsenal FC' },
            { homeTeamName: 'West Ham United FC', awayTeamName: 'Chelsea FC' },
            { homeTeamName: 'Crystal Palace FC', awayTeamName: 'Sunderland AFC' }
        ]
        const expected = 'Kicking off soon:\nBournemouth v Arsenal,\nWest Ham United v Chelsea,\nCrystal Palace v Sunderland'

        assert.equal(message(input), expected)
    })
})
