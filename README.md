# Soccer Bot [![Build Status](https://travis-ci.org/noahbass/soccer-bot.svg?branch=master)](https://travis-ci.org/noahbass/soccer-bot)

A groupme bot for auto posting upcoming soccer matches in a groupme chat built in node.js.

Made to work with [api.football-data.org](http://api.football-data.org/) for data on the premier league, but can be expanded to other competitions covered by the api.

## Running the Bot

- Make sure all dependencies are installed with `npm install`
- Create a `.env` in the root of the project and include variables from `.env.example`. A bot id can be generated from [the groupme dev site](https://dev.groupme.com/bots). A key for the football api can be found at [api.football-data.org](http://api.football-data.org/)
- Run the bot with `node bot.js run`

## Commands

- `node bot.js run` looks for upcoming matches and posts them to the group chat
- `node bot.js setup` is a first time command to get a most up to date fixture list for the local database
- `node bot.js update` updates the dates in the local database to that of the dates in the football api
- `node bot.js clean` removes everything in the local database (used for testing). Data is stored in db.json
- `node bot.js list -h [name] -a [name]` finds and lists out those fixtures from the local database. Each option is optional. Given no options, every fixture will be listed

## Cron Jobs

To automatically update the fixture list every day and look for matches to be posted in groupme all the time, a cron job can be used. A sample cron job to update every night and check for matches every five minutes:

```
0 0 * * * node bot.js update >/dev/null 2>&1
*/5 * * * * node bot.js run >/dev/null 2>&1
```

## Tests

Make sure dev packages are installed with `npm install --dev` to include mocha. Run tests with `npm test`.

To test the app with a specific date, simply set a date for `CUSTOM_DATE` in your `.env` equal to some unix timestamp. An example of this `CUSTOM_DATE` environment variable can be found in `.env.example`. To run with a specific date, use `node bot.js run --dev`.
