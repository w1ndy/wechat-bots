const yw = require('weather-yahoo');
const tc = require('temp-units-conv');
const { Wechaty, Contact, log, Room } = require('wechaty');

function getWindLevel(mph) {
    const kmh = 1.609344 * mph;
    const table = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 134, 149];
    for (let i = 0; i < table.length; i++) {
        if (kmh < table[i]) return i;
    }
    return table.length;
}

function getWeather() {
    return new Promise((resolve, reject) => {
        yw.getSimpleWeather('Beijing, China').then(res => {
            resolve(`现在气温${tc.f2c(parseInt(res.weather.temperature.value)).toFixed(0)}度（${tc.f2c(parseInt(res.forecast[0].low)).toFixed(0)}-${tc.f2c(parseInt(res.forecast[0].high)).toFixed(0)}），风力${getWindLevel(parseInt(res.weather.wind.value))}级。`);
        });
    });
}

exports.handleMessage = async (bot, msg) => {
    if (msg.room() === null && (/天/.test(msg.content()) && (/热/.test(msg.content()) || /冷/.test(msg.content()))) || (/风/.test(msg.content()) && /大/.test(msg.content()))) {
        try {
            if (msg.from().alias() == '栗子' || msg.to().alias() == '栗子') {
                const l = await Contact.find({ alias: '栗子' });
                if (l) {
                    l.say(await getWeather());
                } else {
                    throw "404!";
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    return false;
};

// async function main() {
//     console.log(await getWeather());
// }

// main();