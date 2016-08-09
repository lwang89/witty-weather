const {Wit} = require('node-wit');
const {WIT_TOKEN, WEATHER_APPID} = require('./config');
const fetch = require('isomorphic-fetch');

// ------------------------------------------------------------
// Helpers

function mapObject(obj, f) {
  return Object
    .keys(obj)
    .map(k => [k, f(obj[k], k)])
    .reduce(
      (newObj, [k, v]) => {
        newObj[k] = v;
        return newObj;
      },
      {}
    )
  ;
}

function forecastFor(apiRes) {
  return `${fahrenheit(apiRes.main.temp)}, ${apiRes.weather[0].description}`
}

function locationFor(apiRes) {
  return apiRes.name;
}

function fahrenheit(kelvin) {
  return `${Math.round(kelvin * 9/5 - 459.67)} °F`
}

function getWeather(loc) {
  return fetch(
    'http://api.openweathermap.org/data/2.5/weather?' +
    `q=${loc}&appid=${WEATHER_APPID}`
  ).then(res => res.json())
}

const firstEntityValue = (entities, name) => {
  const val = entities && entities[name] &&
    Array.isArray(entities[name]) &&
    entities[name].length > 0 &&
    entities[name][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const noop = () => {};

// ------------------------------------------------------------
// Actions

const noLocation = (ctx) => {
  ctx.missingLocation = true;
  delete ctx.forecast;
  return ctx;
}

const withLocation = (ctx, loc) => {
  ctx.location = loc;
  delete ctx.missingLocation;
  return ctx;
}

const withForecast = (ctx, forecast) => {
  ctx.forecast = forecast;
  return ctx;
}

const withAPIError = (ctx, err) => {
  ctx.apiError = true
  return ctx;
}

function wrapActions(actions, cb) {
  return mapObject(
    actions,
    (f, k) => (...args) => {
      cb({name: k, args})
      return f(...args);
    }
  );
}

function fetchWeather({context, entities}) {
  const location = firstEntityValue(entities, 'location');
  if (!location) return Promise.resolve(noLocation(context));
  return getWeather(location).then(
    res => {
      return withLocation(
        withForecast(context, forecastFor(res)),
        locationFor(res)
      );
    },
    err => withAPIError(withLocation(context, location), err)
  );
}

const actions = {
  send(request, response) {
    console.log('sending...', JSON.stringify(response));
    return Promise.resolve();
  },
  fetchWeather
};

// ------------------------------------------------------------
// init

function createEngine(accessToken = WIT_TOKEN, cb = noop) {
  return new Wit({accessToken, actions: wrapActions(actions, cb)});
}

module.exports = createEngine;
