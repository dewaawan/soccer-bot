const Fixture = require('./Fixture')

module.exports.clean = async (event, context, callback) => {
    try {
        // get all fixtures to delete, including already posted fixtures
        const fixtures = await Fixture.getFixtures(true)

        // remove fixtures
        await Fixture.removeFixtures(fixtures)

        console.info(`Removed ${fixtures.length} fixtures`)

        return callback(null, `Removed ${fixtures.length} fixtures`)
    } catch (error) {
        console.error(error)
        return callback(error, null)
    }
}
