'use strict';

/**
 * Given an array of fixtures, sort the fixtures by home team name,
 * then by away team name, and then by matchday
 *
 * @param  {Object} input An array of fixtures
 * @return {Object}
 */
function sort(input) {
    // sort by home team name, then by away team name, then by matchday
    function sortFixtures(a, b) {
        let check = a.homeTeamName.localeCompare(b.homeTeamName);

        if (check === 0) {
            check = a.awayTeamName.localeCompare(b.awayTeamName);
        }

        if(check === 0) {
            return a.matchday > b.matchday;
        }

        return check;
    }

    return input.sort(sortFixtures);
};

module.exports = sort;
