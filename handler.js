require('dotenv').config();

const mongoose = require('mongoose');
const moment = require('moment');
const logger = console;
const clean = require('./commands/clean');
const run = require('./commands/run');
const update = require('./commands/update');
const setup = require('./commands/setup');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

const connectionClose = () => {
    mongoose.disconnect();
    logger.info('Disconnected from mongodb');
};

// ---
// entry points for Lambda
// ---
module.exports.clean = (event, context, callback) => {
    // remove all fixtures
    clean().then(() => {
            const response = 'Removed all fixtures from the local database. Use `node bot.js setup` to import an up to date fixture list';
            logger.info(response);
            connectionClose();
            callback(null, { message: response, event });
            return null;
        })
        .catch(error => {
            logger.error(error);
            connectionClose();
            callback({ message: error }, null);
            return null;
        });
};

module.exports.setup = (event, context, callback) => {
    // first time setup
    setup().then(fixtures => {
            const response = `Successfully imported ${fixtures.length} fixture(s)`;
            connectionClose();
            callback(null, { message: response, event });
            return null;
        })
        .catch(error => {
            logger.error(error);
            connectionClose();
            callback({ message: error }, null);
            return null;
        });
};

module.exports.run = (event, context, callback) => {
    // find and post the matches that are happening within the given timeframe (in minutes)
    run().then(values => {
            let response = null;
            if (values.fixtures_send.length > 0) {
                response = `Posted ${values.fixtures_send.length} fixture(s) with status code of ${values.response.statusCode}`;
            } else {
                response = 'No fixtures posted';
            }

            logger.info(response);
            connectionClose();
            callback(null, { message: response, event });
            return null;
        })
        .catch(error => {
            logger.error(error);
            connectionClose();
            callback({ message: error }, null);
            return null;
        });
};

module.exports.update = (event, context, callback) => {
    // fetch the latest fixture list and update the local fixture list
    update().then(fixtures => {
            let response = null;
            if (fixtures.length === 0) {
                response = 'No fixtures to update';
            } else {
                response = `Successfully updated ${fixtures.length} fixtures(s)`;
            }

            connectionClose();
            callback(null, { message: response, event });
            return null;
        })
        .catch(error => {
            logger.error(error);
            connectionClose();
            callback({ message: error }, null);
            return null;
        });
};
