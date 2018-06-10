const request = require('request-promise')
const uuid = require('uuid/v1')
const moment = require('moment')
const Fixture = require('../../Fixture')

module.exports = async (apiEndpoint, competitionId, apiKey) => {
    const requestOptions = {
        uri: `${apiEndpoint}/${competitionId}/fixtures`,
        method: 'get',
        json: true,
        headers: { 'X-Auth-Token': apiKey }
    }

    const response = await request(requestOptions)
    const fixtures = response.fixtures

    // return fixture only if it is 'TIMED' not 'SCHEDULED', and only if homeTeamName and awayTeamName exist
    const timedFixtures = fixtures.filter(fixture => fixture.status && fixture.status === 'TIMED' &&
                                                     fixture.homeTeamName !== "" && fixture.awayTeamName !== "")

    // clean up fixtures
    const cleanedFixtures = timedFixtures.map(fixture => new Fixture({
        id: uuid(),
        homeTeamName: fixture.homeTeamName,
        awayTeamName: fixture.awayTeamName,
        matchday: fixture.matchday,
        posted: false,
        date: moment(fixture.date).toDate()
    }))

    return cleanedFixtures
}
