require('dotenv').config()

const request = require('request-promise')

/**
 * Sends a request to groupme to post a message
 *
 * @param   {String} message A message to send to groupme
 * @returns {Promise<Boolean>}
 */
module.exports = async (message) => {
    // get the bot id for the groupme bot
    const body = { bot_id: process.env.BOT_ID, text: message }

    const requestOptions = {
        uri: 'https://api.groupme.com/v3/bots/post',
        method: 'post',
        body: JSON.stringify(body)
    }

    const response = await request(requestOptions)

    return response
}
