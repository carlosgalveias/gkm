'use strict';

// TODO: Verify if we're getting loaded from multiples location and prevent creating new child processes?

var EventEmitter2 = require('eventemitter2').EventEmitter2;
var path = require('path');
var spawn = require('child_process').spawn;

var events = new EventEmitter2({ wildcard: true });
var gkm = spawn('java', ['-jar', path.join(__dirname, 'lib/gkm.jar')]);

gkm.stdout.on('data', function(data) {
  data = data.toString().split(/\r\n|\r|\n/).filter(function(item) { return item; });
  //console.log({ data });
  for (var i in data) {
    if (!data.hasOwnProperty(i)) { continue; }
    try {
      var parts = data[i].split(':');
      events.emit(parts[0], parts.slice(1));
    } catch (e) {
      //shhhh , dont emit stuff
    }
  }
});

module.exports = {
  events: events
};
