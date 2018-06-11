require('dotenv').config()

const moment = require('moment')
const fetchApiFixtures = require('./lib/data-api/fetchFixtures')
const fetchDbFixtures = require('./lib/db-api/fetchFixtures')
const sortFixtures = require('./lib/sortFixtures')
const Fixture = require('./Fixture')

/**
 * Pull in latest fixtures and update the database
 */
module.exports.update = async (event, context, callback) => {
    const apiKey = process.env.FOOTBALL_API_KEY
    const endpoint = 'https://api.football-data.org/v1/competitions'
    const competitionId = process.env.FOOTBALL_API_COMPETITION_ID

    try {
        const apiFixtures = await fetchApiFixtures(endpoint, competitionId, apiKey)
        const dbFixtures = await fetchDbFixtures()

        // update any fixtures whos date don't match, insert any fixtures that are missing
        const fixturesToPut = apiFixtures.map(apiFixture => {
                // TODO: optimize this
                const dbFixture = dbFixtures.find(dbFixture => Fixture.equal(apiFixture, dbFixture))

                if (dbFixture) {
                    // fixture exists in database, so check if the date needs to be updated
                    const apiFixtureDate = moment(apiFixture.date)
                    const dbFixtureDate = moment(dbFixture.date)

                    if (apiFixtureDate.isSame(dbFixtureDate)) {
                        // nothing to update
                        return null
                    }

                    // need to update the dbFixture with the apiFixture's date
                    return Object.assign({}, dbFixture, { date: apiFixtureDate.toDate() })
                }

                // fixture does not exist in database, need to insert fixture
                return apiFixture
            })
            // remove `null` items
            .filter(item => item !== null)

        // put fixtures
        await Fixture.updateFixtures(fixturesToPut)

        console.info(`Found ${apiFixtures.length} fixtures. Put ${fixturesToPut.length} fixtures.`)

        return callback(null, `Found ${apiFixtures.length} fixtures. Put ${fixturesToPut.length} fixtures.`)
    } catch (error) {
        console.error(error)
        return callback(error, null)
    }
}
