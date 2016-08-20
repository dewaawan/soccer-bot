'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Fixture schema
 */
const fixtureSchema = new Schema({
    matchday: { type: Number, required: true },
    date: { type: Date, required: true },
    homeTeamName: { type: String, required: true },
    awayTeamName: { type: String, required: true },
    posted: { type: Boolean, default: false },
    createdAt: { type: Date, required: true, default: new Date() },
    updatedAt: { type: Date, required: true, default: new Date() }
});

fixtureSchema.pre('save', next => {
    const currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

const Fixture = mongoose.model('Fixture', fixtureSchema);

/**
 * Fixture model
 *
 * @type {Fixture}
 */
module.exports = Fixture;

/**
 * Gets all fixtures from the database
 *
 * @return {Object} An array of fixtures
 */
module.exports.getFixtures = () => {
    return new Promise((resolve, reject) => {
        Fixture.find({}, (error, fixtures) => {
            if (error) {
                reject(error);
            }

            // return found fixtures
            resolve(fixtures);
        });
    });
};
