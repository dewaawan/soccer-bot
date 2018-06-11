const moment = require('moment')
const Fixture = require('./Fixture')
const messageBuilder = require('./lib/messageBuilder')
const post = require('./lib/post')

module.exports.run = async (event, context, callback) => {
    const timeframe = Number(process.env.TIMEFRAME)
    const now = moment()

    try {
        // get an array of fixtures that haven't been posted
        const fixtures = await Fixture.getFixtures()

        // for each fixture, find if it needs to be posted (match is within timeframe)
        const fixturesToPost = fixtures.filter(fixture => {
            // get the difference in time between the date of the match and now
            const difference = moment.duration(moment(fixture.date).diff(now))
            const differenceMinutes = difference.asMinutes()

            // check if the difference in minutes is 20 min or less
            if (0 <= differenceMinutes && differenceMinutes <= timeframe) {
                return true
            }

            return false
        })

        if (fixturesToPost.length === 0) {
            console.info('No fixtures posted')
            return callback(null, 'No fixtures posted')
        }

        // build out message and post to GroupMe
        const message = messageBuilder(fixturesToPost)
        await post(message)

        // mark each fixture in fixturesToPost as `posted=true`, update in the database
        const postedFixtures = fixturesToPost.map(fixture => Object.assign({}, fixture, { posted: true }))
        await Fixture.updateFixtures(postedFixtures)

        console.info(message)

        return callback(null, message)
    } catch (error) {
        console.error(error)
        return callback(error, null)
    }
}
