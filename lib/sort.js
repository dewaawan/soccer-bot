'use strict';

/*
 * Sort
 * Given a list of fixtures as objects, sort the fixtures by home team
 * and then by away team
 *
 * Return an array of sorted fixtures
 */
function sort(input) {

    // sort by home team name then by awayteam name
    function sortstring(a, b) {
        const check = a.homeTeamName.localeCompare(b.homeTeamName);

        if(check == 0) {
            return a.awayTeamName.localeCompare(b.awayTeamName);
        }

        return check;
    }

    return input.sort(sortstring);
}

module.exports = sort;
