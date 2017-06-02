const { Wechaty, log, Room } = require('wechaty');
const qrcode = require('qrcode-terminal');

const MathPlugin = require('./bots/math');
const WeatherPlugin = require('./bots/weather');

const bot = Wechaty.instance();

bot.on('scan', (url, code) => {
    if (!/201|200/.test(String(code))) {
        qrcode.generate(url.replace('qrcode', 'l'));
    }
});

bot.on('login', user => console.log(`User ${user} logined`));

bot.on('message', async msg => {
    if (await MathPlugin.handleMessage(bot, msg)) {
        log.info('BotControl', 'Message has been handled by MathPlugin.');
    } else if (await WeatherPlugin.handleMessage(bot, msg)) {
        log.info('BotControl', 'Message has been handled by WeatherPlugin.');
    }
});

bot.init();
