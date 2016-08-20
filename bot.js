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

const connectionClose = () => {
    mongoose.disconnect();
    logger.info('Disconnected from mongodb');
};

program
    .version('3.0.0')
    .option('-d, --dev', 'Development environment (set a custom date)');

program
    .command('run')
    .description('Run and post the fixtures happening in ' + process.env.TIMEFRAME + ' mins')
    .action(cmd => {
        if(cmd.parent.dev) {
            // set the date manually for dev purposes
            require('mockdate').set(moment.unix(process.env.CUSTOM_DATE));

            logger.info('Running in development mode with custom date');
        }

        // find and post the matches that are happening within the given timeframe (in minutes)
        run().then(values => {
                if (values.fixtures_send.length > 0) {
                    logger.info('Posted', values.fixtures_send.length, 'fixture(s) with status code of', values.response.statusCode);
                } else {
                    logger.info('No fixtures posted');
                }
            })
            .catch(error => {
                logger.error(error);
            })
            .then(() => {
                connectionClose();
            });
    });

program
    .command('update')
    .description('Fetch the latest fixture list and update the local fixture list')
    .action(() => {
        // fetch the latest fixture list and update the local fixture list
        update().then(fixtures => {
                if (fixtures.length === 0) {
                    logger.info('No fixtures to update');
                } else {
                    logger.info('Successfully updated', fixtures.length, 'fixture(s)');
                }
            })
            .catch(error => {
                logger.error(error);
            })
            .then(() => {
                connectionClose();
            });
    });

program
    .command('setup')
    .description('Fetch the latest fixture list and import into the local databse (first time setup)')
    .action(() => {
        // first time setup
        setup().then(fixtures => {
                logger.info('Successfully imported', fixtures.length, 'fixture(s)');
            })
            .catch(error => {
                logger.error(error);
            })
            .then(() => {
                connectionClose();
            });
    });

program
    .command('list')
    .description('List the fixtures in the local database')
    .option('-m, --matchday [number]', 'Specify the matchday to search for')
    .option('-h, --homeTeamName [name]', 'Specify the home team name to search for')
    .option('-a, --awayTeamName [name]', 'Specify the away team name to search for')
    .action(cmd => {
        // list the fixrures in the database with options
        list(cmd).then(fixtures => {
                if (fixtures.length === 0) {
                    console.info('No fixtures found');
                } else {
                    console.info(fixtures);
                }
            })
            .catch(error => {
                logger.error(error);
            })
            .then(() => {
                connectionClose();
            });
    });

program
    .command('clean')
    .description('Clean the local database')
    .action(() => {
        // clean the local database after confirmation from user
        promptly.confirm('This action will delete the local database, continue? (Y/n) ', (err, value) => {
            if(value) {
                clean().then(() => {
                        logger.info('Removed all fixtures from the local database. Use `node bot.js setup` to import an up to date fixture list');
                    })
                    .catch(error => {
                        logger.error(error);
                    })
                    .then(() => {
                        connectionClose();
                    });
            } else {
                logger.info('Clean aborted');
            }
        });
    });

program.parse(process.argv);
