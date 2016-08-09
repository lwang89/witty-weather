# witty-weather

This is a simple example of a weather Bot built using Wit.ai.

![overview](overview.png)

## how to use:

```bash
  npm install
  npm start
```

## how it works

The architecture can be split in 3 separate pieces:
* the chat Front-end, which receives User Messages and pushes Bot responses
* the node server, which receives/sends user Messages, asks Wit what to do next, and also executes Middle-man actions (like fetching weather on http://openweathermap.org/)
* the Wit App, which tells the node server what to do next based on Stories. For your convenience, we have pre-configured the Wit App with weather dialogs.

## how to tweak

You can tweak the 3 pieces:
* you can plug the chat front-end on your server, or replace it with any Messenger app
* you can host the node code on your own server, add more actions
* you can create your own Wit.ai app, either from sratch or bootstrap it with [this file](wit-app/wittyweather.zip) and add more turns
