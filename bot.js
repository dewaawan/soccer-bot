'use strict';

process.chdir(__dirname);

require('dotenv').config();

const moment   = require('moment');
let   program  = require('commander');
const promptly = require('promptly');

const run    = require('./commands/run.js');
const update = require('./commands/update.js');
const setup  = require('./commands/setup.js');
const clean  = require('./commands/clean.js');

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

            console.log('Running in development mode with custom date')
        }

        // find and post the matches that are happening within the given timeframe (in minutes)
        run();
    });

program
    .command('update')
    .description('Fetch the latest fixture list and update the local fixture list')
    .action(function() {
        // fetch the latest fixture list and update the local fixture list
        update();
    });

program
    .command('setup')
    .description('Fetch the latest fixture list and import into the local databse (first time setup)')
    .action(function() {
        // first time setup
        setup();
    });

program
    .command('clean')
    .description('Clean the local database')
    .action(function() {
        // clean the local database after confirmation from user
        promptly.confirm('This action will delete the local database, continue?', function(err, value) {
            if(value) {
                console.log('Cleaning...');
                clean();
            } else {
                console.log('Clean aborted');
            }
        });
    });

program.parse(process.argv);
