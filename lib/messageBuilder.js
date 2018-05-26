/**
 * Build a message to post to the chat given a list of fixtures
 *
 * @param {Array} fixtures An array of fixtures
 * @returns {String}
 */
module.exports = (fixtures) => {
    const fixtureCount = fixtures.length

    if (fixtureCount === 0) {
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

    return `Kicking off soon:\n${result}`
}
