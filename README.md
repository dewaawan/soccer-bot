# Soccer Bot

A groupme bot for auto posting upcoming soccer matches (or anything really) in a group chat built in node.js.

Made to work with [api.football-data.org](http://api.football-data.org/) for data on the premier league.

## Running the Bot

- Make sure all dependencies are installed with `npm install`
- Create a `.env` in the root of the project and include variables from `.env.example`. A bot id can be generated from [the groupme dev site](https://dev.groupme.com/bots). A key for the football api can be found at [api.football-data.org](http://api.football-data.org/)
- Run the bot with `node bot.js`

## TODO

- Update json fixtures for what matches have already been posted in the group chat
- Run the bot automatically every x minutes
- Check multiple datasets at once
