# Soccer Bot

[![Build Status](https://travis-ci.org/noahbass/soccer-bot.svg?branch=master)](https://travis-ci.org/noahbass/soccer-bot) [![dependencies Status](https://david-dm.org/noahbass/soccer-bot/status.svg)](https://david-dm.org/noahbass/soccer-bot) [![devDependencies Status](https://david-dm.org/noahbass/soccer-bot/dev-status.svg)](https://david-dm.org/noahbass/soccer-bot?type=dev)

A groupme bot for auto posting upcoming soccer matches in a groupme chat built in Node.js.

Made to work with [api.football-data.org](https://api.football-data.org/) for data on the english premier league, but can be expanded to other competitions covered by the api.

## Quick Start

- Make sure all dependencies are installed with `npm install`
- Create a `.env` in the root of the project and include variables from `.env.example`. A bot id can be generated from [the groupme dev site](https://dev.groupme.com/bots). A key for the football api can be found at [api.football-data.org](http://api.football-data.org/)
- Start [mongodb](https://www.mongodb.com/download-center) and specify a `MONGODB_URI` key in `.env`  
- Do a first time setup with `node bot.js setup`
- Run the bot with `node bot.js run`

## Commands

- `node bot.js run` looks for upcoming matches and posts them to the group chat
- `node bot.js setup` is a first time command to get a most up to date fixture list for the local database
- `node bot.js update` updates the dates in the local database to that of the dates in the football api (for fixtures that have a date/time change since `node bot.js setup` was called)
- `node bot.js clean` removes everything in the local database
- `node bot.js list -h [name] -a [name]` finds and lists out those fixtures from the local database. Each option is optional. Given no options, every fixture will be listed

## On Production

Make sure `NODE_ENV="production"` in the `.env`.

### Logging

Logging on production logs to `logger.log`. In addition, all errors on production will be emailed. See `.env.example` for example setup with a smtp host (ex: [mailgun](http://www.mailgun.com/)) and copy these to `.env` for usage.

### Cron Jobs

To automatically update the fixture list every day and look for matches to be posted in groupme all the time, a cron job can be used. A sample cron job to update every night and check for matches every five minutes:

```
0 0 * * * node bot.js update >/dev/null 2>&1
*/5 * * * * node bot.js run >/dev/null 2>&1
```

## Tests

Make sure dev packages are installed with `npm install --dev`. Run tests with `npm test`.

To test the app with a specific date, simply set a date for `CUSTOM_DATE` in your `.env` equal to some unix timestamp. An example of this `CUSTOM_DATE` environment variable can be found in `.env.example`. To run with a specific date, use `node bot.js run --dev`.

## License

[MIT License](LICENSE.md)
