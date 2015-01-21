#!/usr/bin/env node
var exec = require('child_process').exec;
var moment = require('moment');

/**
* Watson - Collects data for Sherlock to analyze.
* Copyright (c) 2014 Tabule, Inc.
*/
var Watson=function(){var e={};return{preprocess:function(e){var t={};return[e,t]},postprocess:function(e){return e},config:{disableRanges:false}}}()

/*!
* Sherlock
* Copyright (c) 2014 Tabule, Inc.
* Version 1.3.2
*/
var Sherlock=function(){var e={rangeSplitters:/(\bto\b|\-|\b(?:un)?till?\b|\bthrough\b|\bthru\b|\band\b|\bends?\b)/g,months:"\\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\\b",days:"\\b(?:(?:(?:on )?the )(?=\\d\\d?(?:st|nd|rd|th)))?([1-2]\\d|3[0-1]|0?[1-9])(?:st|nd|rd|th)?(?:,|\\b)",years:"\\b(20\\d{2}|\\d{2}[6-9]\\d)\\b",shortForm:/\b(0?[1-9]|1[0-2])\/([1-2]\d|3[0-1]|0?[1-9])\/?(\d{2,4})?\b/,weekdays:/(?:(next|last) (?:week (?:on )?)?)?\b(sun|mon|tue(?:s)?|wed(?:nes)?|thurs|fri|sat(?:ur)?)(?:day)?\b/,relativeDateStr:"((?:next|last|this) (?:week|month|year)|tom(?:orrow)?|tod(?:ay)?|now|day after tom(?:orrow)?|yesterday|day before yesterday)",inRelativeDateStr:"(\\d{1,4}|a) (day|week|month|year)s? ?(ago|old)?",inRelativeTime:/\b(\d{1,2} ?|a |an )(h(?:our)?|m(?:in(?:ute)?)?)s? ?(ago|old)?\b/,inMilliTime:/\b(\d+) ?(s(?:ec(?:ond)?)?|ms|millisecond)s? ?(ago|old)?\b/,midtime:/(?:@ ?)?\b(?:at )?(noon|midnight)\b/,internationalTime:/\b(?:(0[0-9]|1[3-9]|2[0-3]):?([0-5]\d))\b/,explicitTime:/(?:@ ?)?\b(?:at |from )?(1[0-2]|[1-9])(?::?([0-5]\d))? ?([ap]\.?m?\.?)?(?:o'clock)?\b/,more_than_comparator:/((?:more|greater|newer) than|after)/i,less_than_comparator:/((?:less|fewer|older) than|before)/i,fillerWords:/ (from|is|was|at|on|for|in|due(?! date)|(?:un)?till?)\b/,fillerWords2:/ (was|is|due(?! date))\b/},t=null,n=function(){if(t)return new Date(t.getTime());else return new Date},r=function(e){return typeof Watson!=="undefined"&&Watson.config?Watson.config[e]:null},i=function(e,t,n){var r={},i=false,u=false,f=a.strToNum(e);if(i=o(f,t,n)){f=f.replace(new RegExp(i),"");e=e.replace(new RegExp(a.numToStr(i)),"")}if(u=s(f,t,n))e=e.replace(new RegExp(a.numToStr(u)),"");r.eventTitle=e;r.isAllDay=!!(i&&!u&&i!=="now");r.isValidDate=!!(i||u);return r},s=function(t,n,r){var i,s=0,o=false,u,a,f;if(i=t.match(new RegExp(e.explicitTime.source,"g"))){i=i.sort(function(e,t){var n=e.trim().length,r=t.trim().length;if(e.match(/(?:a|p).?m.?/))n+=20;if(t.match(/(?:a|p).?m.?/))r+=20;return r-n})[0].trim();if(i.length<=2&&t.trim().length>2)s=0;else{s=i.length;i=i.match(e.explicitTime);var l=parseInt(i[1]),c=i[2]||0,h=i[3];if(h){if(h.indexOf("p")===0&&l!=12)l+=12;else if(h.indexOf("a")===0&&l==12)l=0;s+=20}else if(l<12&&(l<7||l<n.getHours()))l+=12;u=l;a=c;f=!!h;o=i[0]}}var p=function(){if(o){n.setHours(u,a,0);n.hasMeridian=f}return o};if(s<4){if(i=t.match(e.inRelativeTime)){if(isNaN(i[1]))i[1]=1;if(i[3])i[1]=parseInt(i[1])*-1;switch(i[2].substring(0,1)){case"h":n.setHours(n.getHours()+parseInt(i[1]));return i[0];case"m":n.setMinutes(n.getMinutes()+parseInt(i[1]));return i[0];default:return p()}}else if(i=t.match(e.inMilliTime)){if(i[3])i[1]=parseInt(i[1])*-1;switch(i[2].substring(0,1)){case"s":n.setSeconds(n.getSeconds()+parseInt(i[1]));return i[0];case"m":n.setMilliseconds(n.getMilliseconds()+parseInt(i[1]));return i[0];default:return p()}}else if(i=t.match(e.midtime)){switch(i[1]){case"noon":n.setHours(12,0,0);n.hasMeridian=true;return i[0];case"midnight":n.setHours(0,0,0);n.hasMeridian=true;return i[0];default:return p()}}else if(i=t.match(e.internationalTime)){n.setHours(i[1],i[2],0);n.hasMeridian=true;return i[0]}else return p()}else return p()},o=function(t,n,r){var i;if(i=t.match(e.monthDay)){if(i[3]){n.setFullYear(i[3],a.changeMonth(i[1]),i[2]);n.hasYear=true}else n.setMonth(a.changeMonth(i[1]),i[2]);return i[0]}else if(i=t.match(e.dayMonth)){if(i[3]){n.setFullYear(i[3],a.changeMonth(i[2]),i[1]);n.hasYear=true}else n.setMonth(a.changeMonth(i[2]),i[1]);return i[0]}else if(i=t.match(e.shortForm)){var s=i[3],o=null;if(s)o=parseInt(s);if(o&&s.length<4)o+=o>50?1900:2e3;if(o){n.setFullYear(o,i[1]-1,i[2]);n.hasYear=true}else n.setMonth(i[1]-1,i[2]);return i[0]}else if(i=t.match(e.weekdays)){switch(i[2].substr(0,3)){case"sun":a.changeDay(n,0,i[1]);return i[0];case"mon":a.changeDay(n,1,i[1]);return i[0];case"tue":a.changeDay(n,2,i[1]);return i[0];case"wed":a.changeDay(n,3,i[1]);return i[0];case"thu":a.changeDay(n,4,i[1]);return i[0];case"fri":a.changeDay(n,5,i[1]);return i[0];case"sat":a.changeDay(n,6,i[1]);return i[0];default:return false}}else if(i=t.match(e.inRelativeDateFromRelativeDate)){if(a.relativeDateMatcher(i[4],n)&&a.inRelativeDateMatcher(i[1],i[2],i[3],n))return i[0];else return false}else if(i=t.match(e.relativeDate)){if(a.relativeDateMatcher(i[1],n))return i[0];else return false}else if(i=t.match(e.inRelativeDate)){if(a.inRelativeDateMatcher(i[1],i[2],i[3],n))return i[0];else return false}else if(i=t.match(new RegExp(e.days,"g"))){i=i.sort(function(e,t){return t.trim().length-e.trim().length})[0].trim();if(i.indexOf("on")!==0&&!(i.indexOf("the")===0&&i.indexOf(",",i.length-1)!==-1)&&t.indexOf(i,t.length-i.length-1)===-1||!(r&&r.isAllDay)&&i.length<=2)return false;i=i.match(e.daysOnly);var u=n.getMonth(),f=i[1];if(f<n.getDate())u++;n.setMonth(u,f);return i[0]}else return false},u=function(t,r,i,s,o){var u=n();if(r){if(t>r&&r>u&&a.isSameDay(t,r)&&a.isSameDay(t,u)){if(t.hasMeridian)t.setDate(t.getDate()-1);else{t.setHours(t.getHours()-12);if(t>r)t.setHours(t.getHours()-12)}}else if(t>r){r.setDate(t.getDate()+1)}else if(r<u&&s.indexOf(" was ")===-1&&a.monthDiff(r,u)>=3&&!r.hasYear&&!t.hasYear){r.setFullYear(r.getFullYear()+1);t.setFullYear(t.getFullYear()+1)}}else if(t){if(t<u&&a.monthDiff(t,u)>=3&&!t.hasYear&&s.indexOf(" was ")===-1){t.setFullYear(t.getFullYear()+1)}else if(o.eventTitle.match(e.more_than_comparator)){if(s.match(/(ago|old)/i)&&o.eventTitle.match(/(ago|old)/i)===null){o.endDate=new Date(t.getTime());o.startDate=new Date(1900,0,1,0,0,0,0)}else{o.endDate=new Date(3e3,0,1,0,0,0,0)}o.eventTitle=o.eventTitle.replace(e.more_than_comparator,"")}else if(o.eventTitle.match(e.less_than_comparator)){if(s.match(/(ago|old)/i)&&o.eventTitle.match(/(ago|old)/i)===null){o.endDate=new Date(3e3,0,1,0,0,0,0)}else{o.endDate=new Date(t.getTime());o.startDate=new Date(1900,0,1,0,0,0,0)}o.eventTitle=o.eventTitle.replace(e.less_than_comparator,"")}}},a={relativeDateMatcher:function(e,t){var r=n();switch(e){case"next week":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate()+7);t.hasYear=true;return true;case"next month":t.setFullYear(r.getFullYear(),r.getMonth()+1,r.getDate());t.hasYear=true;return true;case"next year":t.setFullYear(r.getFullYear()+1,r.getMonth(),r.getDate());t.hasYear=true;return true;case"last week":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate()-7);t.hasYear=true;return true;case"last month":t.setFullYear(r.getFullYear(),r.getMonth()-1,r.getDate());t.hasYear=true;return true;case"last year":t.setFullYear(r.getFullYear()-1,r.getMonth(),r.getDate());t.hasYear=true;return true;case"this week":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate());t.hasYear=true;return true;case"this month":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate());t.hasYear=true;return true;case"this year":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate());t.hasYear=true;return true;case"tom":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate()+1);t.hasYear=true;return true;case"tomorrow":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate()+1);t.hasYear=true;return true;case"day after tomorrow":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate()+2);t.hasYear=true;return true;case"day after tom":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate()+2);t.hasYear=true;return true;case"today":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate());t.hasYear=true;return true;case"tod":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate());t.hasYear=true;return true;case"now":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate());t.setHours(r.getHours(),r.getMinutes(),r.getSeconds(),0);t.hasMeridian=true;t.hasYear=true;return true;case"yesterday":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate()-1);t.hasYear=true;return true;case"day before yesterday":t.setFullYear(r.getFullYear(),r.getMonth(),r.getDate()-2);t.hasYear=true;return true;default:return false}},inRelativeDateMatcher:function(e,t,n,r){if(isNaN(e))e=1;else e=parseInt(e);if(n)e=e*-1;switch(t){case"day":r.setDate(r.getDate()+e);r.hasYear=true;return true;case"week":r.setDate(r.getDate()+e*7);r.hasYear=true;return true;case"month":r.setMonth(r.getMonth()+e);r.hasYear=true;return true;case"year":r.setFullYear(r.getFullYear()+e);r.hasYear=true;return true;default:return false}},changeMonth:function(e){return this.monthToInt[e.substr(0,3)]},changeDay:function(e,t,n){var r=7-e.getDay()+t;if(r>7&&n===undefined)r-=7;if(n==="last")r=r*-1;e.setDate(e.getDate()+r)},monthDiff:function(e,t){var n;n=(t.getFullYear()-e.getFullYear())*12;n-=e.getMonth()+1;n+=t.getMonth()+1;return n<=0?0:n},escapeRegExp:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isSameDay:function(e,t){return e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()&&e.getFullYear()===t.getFullYear()},monthToInt:{jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11},wordsToInt:{one:1,first:1,two:2,second:2,three:3,third:3,four:4,fourth:4,five:5,fifth:5,six:6,sixth:6,seven:7,seventh:7,eight:8,eighth:8,nine:9,ninth:9,ten:10,tenth:10},intToWords:["one|first","two|second","three|third","four|fourth","five|fifth","six|sixth","seven|seventh","eight|eighth","nine|ninth","ten|tenth"],strToNum:function(t){return t.replace(e.digit,function(e){var t=a.wordsToInt[e];if(e.indexOf("th",e.length-2)!==-1)t+="th";else if(e.indexOf("st",e.length-2)!==-1)t+="st";else if(e.indexOf("nd",e.length-2)!==-1)t+="nd";else if(e.indexOf("rd",e.length-2)!==-1)t+="rd";return t})},numToStr:function(e){return e.replace(/((?:[1-9]|10)(?:st|nd|rd|th)?)/g,function(e){return"(?:"+e+"|"+a.intToWords[parseInt(e)-1]+")"})}};e.monthDay=new RegExp(e.months+" "+e.days+"(?: "+e.years+")?");e.dayMonth=new RegExp(e.days+"(?: (?:day )?of)? "+e.months+"(?: "+e.years+")?");e.daysOnly=new RegExp(e.days);e.digit=new RegExp("\\b("+a.intToWords.join("|")+")\\b","g");e.relativeDate=new RegExp("\\b"+e.relativeDateStr+"\\b");e.inRelativeDate=new RegExp("\\b"+e.inRelativeDateStr+"\\b");e.inRelativeDateFromRelativeDate=new RegExp("\\b"+e.inRelativeDateStr+" from "+e.relativeDateStr+"\\b");if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}return{parse:function(t){if(t===null)t="";var s=n(),o=typeof Watson!=="undefined"?Watson.preprocess(t):[t,{}],t=o[0],f=o[1],l=r("disableRanges")?[t.toLowerCase()]:t.toLowerCase().split(e.rangeSplitters);e.rangeSplitters.lastIndex=0;s.setMilliseconds(0);while(!f.startDate){if((o=i(l[0],s,null))!==null){if(o.isAllDay)s.setHours(0,0,0);f.isAllDay=o.isAllDay;f.eventTitle=o.eventTitle;f.startDate=o.isValidDate?s:null}if(!f.startDate&&l.length>=3){var c=[l[0]+l[1]+l[2]];for(var h=3;h<l.length;h++){c.push(l[h])}l=c}else break}while(!f.endDate){if(l.length>1){s=new Date(s.getTime());if((o=i(l[2],s,f))!==null){if(f.isAllDay)s.setHours(0,0,0);if(o.eventTitle.length>f.eventTitle.length)f.eventTitle=o.eventTitle;f.endDate=o.isValidDate?s:null}}if(!f.endDate){if(l.length>=4){var c=[l[0],l[1],l[2]+l[3]+l[4]];for(var h=5;h<l.length;h++){c.push(l[h])}l=c}else{f.endDate=null;break}}}u(f.startDate,f.endDate,f.isAllDay,t,f);if(f.eventTitle){var p=r("disableRanges")?e.fillerWords2:e.fillerWords;f.eventTitle=f.eventTitle.split(p)[0].trim();f.eventTitle=f.eventTitle.replace(/(?:^| )(?:\.|-$|by$|in$|at$|from$|on$|starts?$|for$|(?:un)?till?$|!|,|;)+/g,"").replace(/ +/g," ").trim();var d=t.match(new RegExp(a.escapeRegExp(f.eventTitle),"i"));if(d){f.eventTitle=d[0].replace(/ +/g," ").trim();if(f.eventTitle=="")f.eventTitle=null}}else f.eventTitle=null;if(typeof Watson!=="undefined")Watson.postprocess(f);return f},_setNow:function(e){t=e}}}();if(typeof define==="function"&&define.amd){define(Sherlock)}else if(typeof module!=="undefined"&&module.exports){module.exports=Sherlock}

if (!process.argv[2]) {
  console.log("Create Reminder Failed: No arguments");
  process.exit(1);
}

var sherlocked = Sherlock.parse(process.argv[2]);

if (!sherlocked) {
  console.log("Create Reminder Failed: Couldn't parse arguments");
  process.exit(1);
}

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

exec('osascript ' + scriptString, function(error) {
  if (!error) {
    console.log("Created Reminder: " + sherlocked.eventTitle);
  } else {
    console.log("Create Reminder Failed: " + error.message);
  }
});
