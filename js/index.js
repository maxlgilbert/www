/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var gpsFunctions = {
  onSuccess: function(position) {
      console.log(position.coords.latitude);
     /*alert('Latitude: '          + position.coords.latitude          + '\n' +
             'Longitude: '         + position.coords.longitude         + '\n' +
             'Altitude: '          + position.coords.altitude          + '\n' +
             'Accuracy: '          + position.coords.accuracy          + '\n' +
             'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
             'Heading: '           + position.coords.heading           + '\n' +
             'Speed: '             + position.coords.speed             + '\n' +
             'Timestamp: '         + position.timestamp                + '\n');*/
  },
      
  // onError Callback receives a PositionError object
  onError: function(error) {
      console.log("gps Fail");
      /*alert('code: '    + error.code    + '\n' +
       'message: ' + error.message + '\n');*/
  }
}
client.readFile("hello_world.txt", function(error, data) {
  if (error) {
    return showError(error);  // Something went wrong.
  }

  alert(data);  // data has the file's contents
});
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('touchstart', this.touchstart, true );
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var Dropbox = require("dropbox");
        var client = new Dropbox.Client({
          key: "sw0vbtsn4svk086", secret: "zgwynjp4f7h1qku", sandbox:true
        });

        client.authDriver(new Dropbox.Drivers.Redirect());
        /*client.authDriver(new Dropbox.Drivers.NodeServer(8191));*/
        client.authenticate(function(error, client) {
        if (error) {
        // Replace with a call to your own error-handling code.
        //
        // Don't forget to return from the callback, so you don't execute the code
        // that assumes everything went well.
          return showError(error);
        }
        client.onError.addListener(function(error) {
          if (window.console) {  // Skip the "if" in node.js code.
            console.error(error);
          }
        });

        // Replace with a call to your own application code.
        //
        // The user authorized your app, and everything went well.
        // client is a Dropbox.Client instance that you can use to make API calls.
        dclient.readFile("msgbottle.txt", function(error, data) {
          if (error) {
            return showError(error);  // Something went wrong.
          }

          alert(data);  // data has the file's contents
        });
      });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    touchstart: function(event) {
        console.log("touch");
        navigator.geolocation.getCurrentPosition(gpsFunctions.onSuccess, gpsFunctions.onError);
    }
    
};

var showError = function(error) {
  switch (error.status) {
    case 401:
    // If you're using dropbox.js, the only cause behind this error is that
    // the user token expired.
    // Get the user through the authentication flow again.
    break;

    case 404:
    // The file or folder you tried to access is not in the user's Dropbox.
    // Handling this error is specific to your application.
    break;

    case 507:
    // The user is over their Dropbox quota.
    // Tell them their Dropbox is full. Refreshing the page won't help.
    break;

    case 503:
    // Too many API requests. Tell the user to try again later.
    // Long-term, optimize your code to use fewer API calls.
    break;

    case 400:  // Bad input parameter
    case 403:  // Bad OAuth request.
    case 405:  // Request method not expected
    default:
      // Caused by a bug in dropbox.js, in your application, or in Dropbox.
      // Tell the user an error occurred, ask them to refresh the page.
  }
};