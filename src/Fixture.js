require('dotenv').config()

const dynamoose = require('dynamoose')
const moment = require('moment')

const Schema = dynamoose.Schema
const tableName = 'soccer-bot-world-cup' // process.env.DYNAMODB_TABLE

const schema = new Schema(
    {
        id: { type: String, hashKey: true },
        homeTeamName: String,
        awayTeamName: String,
        matchday: Number,
        posted: Boolean,
        date: Date
    },
    {
        timestamps: true
    }
)

const Fixture = dynamoose.model(tableName, schema)

/**
 * Batch insert multiple fixtures
 *
 * @param   {Array<Fixture>} fixtures
 * @returns {Promise}
 */
const batchInsert = (fixtures) => {
    return new Promise((resolve, reject) => {
        Fixture.batchPut(fixtures, (error, _) => {
            if (error) {
                return reject(error)
            }

            return resolve(fixtures.length)
        })
    })
}

/**
 * Retrieve an array of fixtures that have not been posted
 *
 * @param   {Boolean} posted default=false return posted fixtures
 * @returns {Promise<Array<Fixture>>}
 */
const getFixtures = (posted = false) => {
    return new Promise((resolve, reject) => {
        const query = posted === true ? Fixture.scan() : Fixture.scan('posted').eq(false)

        query.exec((error, fixtures) => {
            if (error) {
                return reject(error)
            }

            return resolve(fixtures)
        })
    })
}

/**
 * Update fixtures with given objects
 *
 * @param   {Array<Fixture>} fixtures
 * @returns {Promise<Array<Fixture>>}
 */
const updateFixtures = (fixtures) => {
    return new Promise((resolve, reject) => {
        Fixture.batchPut(fixtures, (error, _) => {
            if (error) {
                return reject(error)
            }

            return resolve(true)
        })
    })
}

/**
 * Remove all fixtures
 *
 * @returns {Promise<Boolean>}
 */
const removeFixtures = (fixtures) => {
    return new Promise((resolve, reject) => {
        Fixture.batchDelete(fixtures, (error) => {
            if (error) {
                return reject(error)
            }

            return resolve(true)
        })
    })
}

/**
 * Checks if one fixture is equal to another fixture
 *
 * @param   {Fixture} leftFixture
 * @param   {Fixture} rightFixture
 * @returns {Boolean}
 */
const equal = (leftFixture, rightFixture) => {
    if (leftFixture.homeTeamName === rightFixture.homeTeamName &&
        leftFixture.awayTeamName === rightFixture.awayTeamName &&
        leftFixture.matchday === rightFixture.matchday) {
            return true
    }

    return false
}

Fixture.batchInsert = batchInsert
Fixture.getFixtures = getFixtures
Fixture.updateFixtures = updateFixtures
Fixture.removeFixtures = removeFixtures
Fixture.equal = equal

module.exports = Fixture
