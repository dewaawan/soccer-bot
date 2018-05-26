const test = require('./test')
const options = test.options
const assert = test.assert

const sort = require('../lib/sortFixtures')

describe('sort', () => {
    it('should return a sorted array of objects', () => {
        const input = {
            args: [
                { homeTeamName: 'Manchester United FC', awayTeamName: 'Tottenham Hotspur FC' },
                { homeTeamName: 'Everton FC', awayTeamName: 'Watford FC' },
                { homeTeamName: 'Aston Villa FC', awayTeamName: 'Chelsea FC' },
                { homeTeamName: 'Aston Villa FC', awayTeamName: 'Manchester United FC' }
            ],
            expected: [
                { homeTeamName: 'Aston Villa FC', awayTeamName: 'Chelsea FC' },
                { homeTeamName: 'Aston Villa FC', awayTeamName: 'Manchester United FC' },
                { homeTeamName: 'Everton FC', awayTeamName: 'Watford FC' },
                { homeTeamName: 'Manchester United FC', awayTeamName: 'Tottenham Hotspur FC' },
            ]
        }

        assert.deepEqual(sort(input.args), input.expected)
    })

    it('should return a sorted array of objects given same fixtures on different matchdays', () => {
        const input = {
            args: [
                { homeTeamName: 'FC Cincinnati', awayTeamName: 'Columbus Crew SC', matchday: 2 },
                { homeTeamName: 'FC Cincinnati', awayTeamName: 'Columbus Crew SC', matchday: 1 },
                { homeTeamName: 'Columbus Crew SC', awayTeamName: 'Sporting Kansas City', matchday: 3 }
            ],
            expected: [
                { homeTeamName: 'Columbus Crew SC', awayTeamName: 'Sporting Kansas City', matchday: 3 },
                { homeTeamName: 'FC Cincinnati', awayTeamName: 'Columbus Crew SC', matchday: 1 },
                { homeTeamName: 'FC Cincinnati', awayTeamName: 'Columbus Crew SC', matchday: 2 }
            ]
        }

        assert.deepEqual(sort(input.args), input.expected)
    })
})
