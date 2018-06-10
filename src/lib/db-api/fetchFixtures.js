const Fixture = require('../../Fixture')

module.exports = async () => {
    try {
        const fixtures = await Fixture.getFixtures()
        return fixtures
    } catch (error) {
        throw new Error(error)
    }
}
