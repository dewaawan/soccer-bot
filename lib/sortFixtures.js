/**
 * Given an array of fixtures, sort the fixtures by home team name,
 * then by away team name, and then by matchday
 *
 * @param  {Array} fixtures An array of fixtures
 * @return {Array}
 */
module.exports = (fixtures) => {
    // sort by home team name, then by away team name, then by matchday
    const sortFixtures = (a, b) => {
        let check = a.homeTeamName.localeCompare(b.homeTeamName)

        if (check === 0) {
            check = a.awayTeamName.localeCompare(b.awayTeamName)
        }

        if (check === 0) {
            check = a.matchday > b.matchday
        }

        if (check === 0) {
            return a.date > b.date
        }

        return check
    }

    return fixtures.sort(sortFixtures)
}
