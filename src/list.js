const Fixture = require('./Fixture')
const moment = require('moment')

/**
 * Given a list of fixtures, sort by date
 *
 * @param   {Array<Fixture>} fixtures
 * @returns {Array<Fixture>}
 */
const sortByDate = (fixtures) => {
    const sortFixtures = (a, b) => {
        return moment(a.date).toDate() - moment(b.date).toDate()
    }

    return fixtures.sort(sortFixtures)
}

module.exports.list = async (event, context, callback) => {
    try {
        // get fixtures and sort before returning
        const fixtures = sortByDate(await Fixture.getFixtures())
        return callback(null, { statusCode: 200, body: JSON.stringify(fixtures) })
    } catch (error) {
        console.error(error)
        return callback(null, { statusCode: 400, body: JSON.stringify(error) })
    }
}
