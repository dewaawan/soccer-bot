/**
 * Build a message to post to the chat given a list of fixtures
 *
 * @param {Array} fixtures An array of fixtures
 * @returns {String}
 */
module.exports = (fixtures) => {
    if (fixtures.length === 0) {
        return ''
    }

    // clean common club prefixes and suffixes
    const pattern = /FC | FC|AFC | AFC| SC| CF|SL |AS | SV|SV |VfB |VfL /g;

    // get the fixtures in a single line
    const fixturesSimplified = fixtures.map(fixture =>
        `${fixture.homeTeamName.replace(pattern, '')} v ${fixture.awayTeamName.replace(pattern, '')}`
    )

    // reduce the fixtures to a string
    const result = fixturesSimplified.reduce((leftFixture, rightFixture) => `${leftFixture},\n${rightFixture}`)
    const matchday = fixtures[0].matchday

    return matchday === undefined ? `Kicking off soon:\n${result}` : `Matchday ${matchday} kicking off soon:\n${result}`
}
