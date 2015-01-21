# Node Mac Reminders
This simple script allows you to create events in the Apple Reminders app via command line. I created this because I could find no Alfred 2 workflow that actually worked on my Yosemite machine.

The language processing is handled by the [Sherlock](https://github.com/Tabule/Sherlock) library. I used [moment.js](https://github.com/moment/moment/) to format the date string in a way AppleScript seems to consistently recognize.

My Alfred 2 workflow is based on the example Keyword to Script to Notification workflow. Since /bin/node isn't one of the supported languages I chose /bin/bash and used the following as the script to execute:

`/bin/node /Users/brycehamrick/src/node-mac-reminders/remind.js "{query}"`

Make sure you don't over-escape characters, I'm only escapting double-quotes.
