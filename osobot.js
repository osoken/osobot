'use strict';

var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var config = require('./config');

var bot = {

};

var token = config.get('token');

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {

});

module.export = bot;
