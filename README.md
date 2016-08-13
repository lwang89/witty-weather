# witty-weather

This is a simple example of a weather Bot built using Wit.ai.

![overview](overview.png)

## How to use:

```bash
  npm install
  npm start
```

## How it works

The architecture can be split into 3 separate pieces:
* The Chat Front-end, which receives user messages and displays bot responses
* The Node Server, which receives/sends user Messages, asks Wit what to do next, and also executes Middle-man actions (like fetching weather on http://openweathermap.org/)
* The Wit App, which tells the node server what to do next based on Stories. For your convenience, we have pre-configured the Wit App with weather dialogs.

## Build your own bot

Use witty weather as a template to build your own bot. It has 3 main parts you can adapt:
* [WebApp.js](src/WebApp.js) you can plug the chat front-end on your server, or replace it with any Messenger app
* [createEngine.js](src/createEngine.js) you can host the node code on your own server, and update the actions
* you can create your own Wit.ai app, either from sratch or bootstrap it with [this file](wit-app/wittyweather.zip) and add more turns
