/*
 This script will use environment variables to initialize Parse and automatically register
 Hooks on Parse.
 */

if (!process.env.HOOKS_URL || !process.env.PARSE_APP_ID || !process.env.PARSE_MASTER_KEY) {
  console.log('*** ERROR *** Could not register hooks, environment variables are not set!');
  process.exit(1);
}

var Webhooks = require('parse-cloud-express');
var Parse = require('parse/node').Parse;

// Require the cloud code, to process all the triggers/functions
require('../cloud/main.js');

var baseURL = process.env.HOOKS_URL;

var serverHooks = {
  'beforeSave': [],
  'afterSave': [],
  'beforeDelete': [],
  'afterDelete': [],
  'function': []
};

Parse.initialize(process.env.PARSE_APP_ID, 'unused', process.env.PARSE_MASTER_KEY);

// The logic for this script is just these 8 functions chained in serial promises:
getServerTriggers()
    .then(getServerFunctions)
    .then(registerFunctions)
    .then(registerBeforeSaves)
    .then(registerAfterSaves)
    .then(registerBeforeDeletes)
    .then(registerAfterDeletes)
    .then(function() {
      console.log('Hooks registration completed.');
    });

// Returns the base data used in making a request to Parse
function getAuthenticatedRequestData() {
  return {
    '_ApplicationId': Parse.applicationId,
    '_MasterKey': Parse.masterKey,
    '_ClientVersion': Parse.VERSION
  };
}

// Call the Hooks API and learn what triggers are configured
function getServerTriggers() {
  var data = getAuthenticatedRequestData();
  data['_method'] = 'GET';
  return Parse._ajax('POST', 'https://api.parse.com/1/hooks/triggers', JSON.stringify(data)).then(
      function(res) {
        res.results.forEach(function(hook) {
          if (hook.url) {
            serverHooks[hook.triggerName].push(hook.className);
          }
        });
        return Parse.Promise.as();
      }
  );
}

// Call the Hooks API and learn what functions are configured
function getServerFunctions() {
  var data = getAuthenticatedRequestData();
  data['_method'] = 'GET';
  return Parse._ajax('POST', 'https://api.parse.com/1/hooks/functions', JSON.stringify(data)).then(
      function(res) {
        res.results.forEach(function(hook) {
          if (hook.url) {
            serverHooks['function'].push(hook.functionName);
          }
        });
        return Parse.Promise.as();
      }
  );
}

// Call the Hooks API and register/update triggers
function registerTriggers(triggerType) {
  var promise = Parse.Promise.as();
  Webhooks.Routes[triggerType].forEach(function(item) {
    var url = baseURL + 'webhooks/' + triggerType + '_' + item;
    var data = getAuthenticatedRequestData();
    data['className'] = item;
    data['triggerName'] = triggerType;
    data['url'] = url;
    var path = 'https://api.parse.com/1/hooks/triggers';
    if (serverHooks[triggerType].indexOf(item) >= 0) {
      data['_method'] = 'PUT';
      path += '/' + item + '/' + triggerType;
    }
    promise = promise.then(
        function() {
          return Parse._ajax('POST', path, JSON.stringify(data)).then(
              function (res) {
                console.log('Registered ' + triggerType + ' for: ' + item);
                return Parse.Promise.as();
              },
              function (err) {
                console.log(err.responseText);
                return Parse.Promise.as();
              }
          );
        }
    );
  });
  return promise
}

function registerBeforeSaves() {
  return registerTriggers('beforeSave');
}

function registerAfterSaves() {
  return registerTriggers('afterSave');
}

function registerBeforeDeletes() {
  return registerTriggers('beforeDelete');
}

function registerAfterDeletes() {
  return registerTriggers('afterDelete');
}


// Call the Hooks API and register cloud functions
function registerFunctions() {
  var promise = Parse.Promise.as();
  Webhooks.Routes['function'].forEach(function(item) {
    var url = baseURL + 'webhooks/function_' + item;
    var data = getAuthenticatedRequestData();
    data['functionName'] = item;
    data['url'] = url;
    var path = 'https://api.parse.com/1/hooks/functions';
    if (serverHooks['function'].indexOf(item) >= 0) {
      data['_method'] = 'PUT';
      path += '/' + item;
    }
    promise = promise.then(
        function() {
          return Parse._ajax('POST', path, JSON.stringify(data)).then(
              function (res) {
                console.log('Registered function for: ' + item);
                return Parse.Promise.as();
              },
              function (err) {
                console.log(err.responseText);
                return Parse.Promise.as();
              }
          )
        }
    );
  });
  return promise;
}
