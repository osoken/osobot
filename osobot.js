'use strict';

var d3 = require('d3');
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var config = require('./config');

var bot = {
  is_authenticated: false,
  is_initialized: false
};

var token = config.get('token');

//var rtm = new RtmClient(token, {logLevel: 'debug'});
var rtm = new RtmClient(token);
rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  bot.start_data = rtmStartData;
  bot.channelname_data_map = {};
  rtmStartData.channels.forEach(function(d)
  {
    bot.channelname_data_map[d.name] = d;
  });
  bot.is_authenticated = true;
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  bot.is_initialized = true;
});

bot.say = function(message, channel, cb) {
  if (!bot.is_initialized)
  {
    setTimeout(bot.say, 200, message, channel, cb);
  }
  else {
    if (bot.channelname_data_map[channel] === void 0)
    {
      throw new Error('unknown channel: ' + channel);
    }
    rtm.sendMessage(message,
                    bot.channelname_data_map[channel].id,
                    cb||function(){});
  }
};

var dispatcher = d3.dispatch('tick');

d3.rebind(bot, dispatcher, 'on');

bot.heart_beat = setInterval(function()
{
  dispatcher.tick();
}, 1000);

module.exports = bot;
