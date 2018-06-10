const sortFixtures = require('./lib/sortFixtures')
const Fixture = require('./Fixture')

module.exports.list = async (event, context, callback) => {
    try {
        // get fixtures and sort before returning
        const fixtures = sortFixtures(await Fixture.getFixtures())
        return callback(null, { statusCode: 200, body: JSON.stringify(fixtures) })
    } catch (error) {
        console.error(error)
        return callback(null, { statusCode: 400, body: JSON.stringify(error) })
    }
}
