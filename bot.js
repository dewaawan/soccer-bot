'use strict';

require('dotenv').load();

const moment   = require('moment');
let   program  = require('commander');
const MockDate = require('mockdate');

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
            MockDate.set(moment.unix(1461419900));

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
        // clean the local database
        clean();
    });

program.parse(process.argv);
