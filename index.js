'use strict';

var config = require('./config');

var RtmClient = require('@slack/client').RtmClient;

var token = config.get('token');

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();
