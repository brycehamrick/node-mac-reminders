#!/usr/bin/env node
var fs = require('fs')
var exec = require('child_process').exec;
var moment = require('moment');

watsonJs = fs.readFileSync('./watson.js','utf8');
eval(watsonJs);
sherlockJs = fs.readFileSync('./sherlock.js','utf8');
eval(sherlockJs);

if (!process.argv[2]) process.exit(1);

var sherlocked = Sherlock.parse(process.argv[2]);

if (!sherlocked) process.exit(1);

var applescript = [
'tell application "Reminders"',
'set newremin to make new reminder',
'set name of newremin to "' + sherlocked.eventTitle + '"'
];

if (sherlocked.startDate) {
  setTime = sherlocked.isAllDay ? "[ at 09:00:00 AM]" : "";
  format = sherlocked.isAllDay ? "dddd, MMMM D, YYYY" + setTime : "dddd, MMMM D, YYYY [at] hh:mm:ss A";
  dateString = moment(sherlocked.startDate).format(format);
  applescript.push('set due date of newremin to date "' + dateString + '"');
}

applescript.push('end tell');

var scriptString = '';
for (var i in applescript) {
  scriptString += "-e '" + applescript[i] + "' ";
}

exec('osascript ' + scriptString);
