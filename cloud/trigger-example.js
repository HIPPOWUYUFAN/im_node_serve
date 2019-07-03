'use strict'

Parse.Cloud.beforeSave('TestObject', function(request, response) {
    console.log('Ran beforeSave on objectId: ' + request.object.id);
    // if update the request object, we need to send it back with the response
    response.success(request.object);
});

Parse.Cloud.afterSave('TestObject', function(request, response) {
    console.log('Ran afterSave on objectId: ' + request.object.id);
});

Parse.Cloud.beforeDelete('TestObject', function(request, response) {
    console.log('Ran beforeDelete on objectId: ' + request.object.id);
    response.success();
});

Parse.Cloud.afterDelete('TestObject', function(request, response) {
    console.log('Ran afterDelete on objectId: ' + request.object.id);
});
