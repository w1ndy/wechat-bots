const math = require('mathjs');
const { Wechaty, log, Room } = require('wechaty');

exports.handleMessage = async (bot, msg) => {
    if (/=\?$/.test(msg.content())) {
        try {
            const value = math.eval(msg.content().slice(0, -2));
            if (msg.room()) {
                await msg.say(`${msg.content().slice(0, -2)}=${value}`);
                console.log(`Replied ${value}`);
            } else {
                await msg.from().say(`${msg.content().slice(0, -2)}=${value}`);
                console.log(`Replied ${value} to ${msg.from()}`);
            }
        } catch (e) {
            console.log('unable to evaluate ' + msg.content().slice(0, -2));
            console.log(e);
        }
        return true;
    }
    return false;
};
