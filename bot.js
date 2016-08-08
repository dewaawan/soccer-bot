'use strict';

process.chdir(__dirname);

require('dotenv').config();

const mongoose = require('mongoose');
const moment   = require('moment');
const program  = require('commander');
const promptly = require('promptly');

const logger = require('./lib/logger');
const run    = require('./commands/run');
const update = require('./commands/update');
const list   = require('./commands/list');
const clean  = require('./commands/clean');
const setup  = require('./commands/setup');

// Set mongoose to use built-in js Promise and connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

function connectionClose() {
    mongoose.disconnect();
    logger.info('Disconnected from mongodb');
};

program
    .version('2.0.0')
    .option('-d, --dev', 'Development environment (set a custom date)');

program
    .command('run')
    .description('Run and post the fixtures happening in ' + process.env.TIMEFRAME + ' mins')
    .action(function(cmd) {
        if(cmd.parent.dev) {
            // set the date manually for dev purposes
            require('mockdate').set(moment.unix(process.env.CUSTOM_DATE));

            logger.info('Running in development mode with custom date');
        }

        // find and post the matches that are happening within the given timeframe (in minutes)
        run().then(function(values) {
                if (values.fixtures_send.length > 0) {
                    logger.info('Posted', values.fixtures_send.length, 'fixture(s) with status code of', values.response.statusCode);
                } else {
                    logger.info('No fixtures posted');
                }
            })
            .catch(function(error) {
                logger.error(error);
            })
            .then(function() {
                connectionClose();
            });
    });

program
    .command('update')
    .description('Fetch the latest fixture list and update the local fixture list')
    .action(function() {
        // fetch the latest fixture list and update the local fixture list
        update().then(function(fixtures) {
                if (fixtures.length === 0) {
                    logger.info('No fixtures to update');
                } else {
                    logger.info('Successfully updated', fixtures.length, 'fixture(s)');
                }
            })
            .catch(function(error) {
                logger.error(error);
            })
            .then(function() {
                connectionClose();
            });
    });

program
    .command('setup')
    .description('Fetch the latest fixture list and import into the local databse (first time setup)')
    .action(function() {
        // first time setup
        setup().then(function(fixtures) {
                logger.info('Successfully imported', fixtures.length, 'fixture(s)');
            })
            .catch(function(error) {
                logger.error(error);
            })
            .then(function() {
                connectionClose();
            });
    });

program
    .command('list')
    .description('List the fixtures in the local database')
    .option('-m, --matchday [number]', 'Specify the matchday to search for')
    .option('-h, --homeTeamName [name]', 'Specify the home team name to search for')
    .option('-a, --awayTeamName [name]', 'Specify the away team name to search for')
    .action(function(cmd) {
        // list the fixrures in the database with options
        list(cmd).then(function(fixtures) {
                if (fixtures.length === 0) {
                    logger.info('No fixtures found');
                } else {
                    logger.info(fixtures);
                }
            })
            .catch(function(error) {
                logger.error(error);
            })
            .then(function() {
                connectionClose();
            });
    });

program
    .command('clean')
    .description('Clean the local database')
    .action(function() {
        // clean the local database after confirmation from user
        promptly.confirm('This action will delete the local database, continue? (Y/n) ', function(err, value) {
            if(value) {
                clean().then(function() {
                        logger.info('Removed all fixtures from the local database. Use `node bot.js setup` to import an up to date fixture list');
                    })
                    .catch(function(error) {
                        logger.error(error);
                    })
                    .then(function() {
                        connectionClose();
                    });
            } else {
                logger.info('Clean aborted');
            }
        });
    });

program.parse(process.argv);
