"use strict";

var app = angular.module('twitchStatus', ['ngAnimate']);

app.controller('twitchStatusCtrl', function ($scope, $http) {

  var streams = [];

  var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", "test_channel", "cretetion", "sheevergaming", "TR7K", "OgamingSC2", "ESL_SC2"];
  var base = "https://api.twitch.tv/kraken/streams/";
  var callback = "&callback=JSON_CALLBACK";

  var getStreamInfo = function (name) {
    var requestURL = base + name; // + callback;
    console.log("Requesting: " + requestURL);
    $http.get(requestURL)
      .then(function (response) {

          if (response.data.stream) { // stream is online
            streams.push({
              name: name,
              displayName: response.data.stream.channel.display_name || name,
              isOnline: true,
              status: response.data.stream.channel.status,
              url: "http://www.twitch.tv/" + name,
              logo: response.data.stream.channel.logo
            });

          } else { // stream is offline
            streams.push({
              name: name,
              displayName: name,
              isOnline: false,
              status: "Offline",
              url: "http://www.twitch.tv/" + name,
              logo: "http://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F"
            });
          }
        },
        function (response) {

          streams.push({
            name: name,
            displayName: name,
            isOnline: false,
            status: "Channel Unavailable",
            url: "#",
            logo: "http://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F"
          });

        });
  }

  angular.forEach(channels, getStreamInfo);

  $scope.streams = streams;

});