'use strict';

/**
 * Put together the message to post to the chat
 *
 * @param  {Object} input An array of fixtures
 * @return {String}
 */
function message(input) {
    // write a message to post to the chat
    let message = 'Kicking off soon:\n';
    const pattern = /FC | FC|AFC | AFC| SC| CF|SL |AS | SV|SV |VfB |VfL /g;

    // get those fixtures in a more appropriate format for posting
    for (let i = 0; i < input.length; i++) {
        // remove ' FC', 'AFC ', ' SC', etc from team names (for shorter names in chat)
        // and put the two teams together in one string
        message += `${input[i].homeTeamName.replace(pattern, '')} v ${input[i].awayTeamName.replace(pattern, '')}`;

        // if the fixture is not the last fixture, then add a comma and new line
        if ((i + 1) !== input.length) {
            message += ',\n';
        }
    }

    return message;
};

module.exports = message;
