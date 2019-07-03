'use strict'
require('./chat_app/chat_app')

Parse.Cloud.define("helloanas", (request, response) => {

    console.log('Ran cloud function.');
    // As with Parse-hosted Cloud Code, the user is available at: request.user
    // You can get the users session token with: request.user.getSessionToken()
    // Use the session token to run other Parse Query methods as that user, because
    //   the concept of a 'current' user does not fit in a Node environment.
    //   i.e.  query.find({ sessionToken: request.user.getSessionToken() })...
    let tempstr = "Hello world, I'm Anas Cloud Code! ";
    response.success(tempstr + (request.params.a + request.params.b));
});

Parse.Cloud.define("deploy", (request, response) => {

    console.log('Push WebHook:', request);
    console.log('Params:', request.params);
    // As with Parse-hosted Cloud Code, the user is available at: request.user
    // You can get the users session token with: request.user.getSessionToken()
    // Use the session token to run other Parse Query methods as that user, because
    //   the concept of a 'current' user does not fit in a Node environment.
    //   i.e.  query.find({ sessionToken: request.user.getSessionToken() })...
    let tempstr = "Compeleted Deploying!";
    response.success(tempstr + (request.params.a + request.params.b));
});