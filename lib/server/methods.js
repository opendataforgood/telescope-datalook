/*******************
 * Twitter Methods *
 *******************/

var Twit = Npm.require('twit');
var Fiber = Npm.require('fibers');

Meteor.startup(function() {
  if (Meteor.settings.twitter) {
    twit = new Twit({
      consumer_key: Meteor.settings.twitter.consumer_key,
      consumer_secret: Meteor.settings.twitter.consumer_secret,
      access_token: Meteor.settings.twitter.access_token,
      access_token_secret: Meteor.settings.twitter.access_token_secret
    })
  } else {
    console.log("Please add your Twitter API keys to your settings.json!");
  }
});

Meteor.methods({
  getTwitterDetails: function(id, twitter) {
    var praise = Praises.findOne(id);

    twit.get('users/show', { screen_name: twitter || praise.twitter }, function (err, data, response) {
      Fiber(function(){
        if(err)
          return "Oh no!  Something went wrong with the Twitter API call... \n" + err;

        if(data)
          // console.log(data);
          Praises.update({_id: id}, { $set: {
            name: data.name,
            twitter: data.screen_name,
            bio: data.description,
            location: data.location,
            followers: data.followers_count,
            image: data.profile_image_url
          }});

      }).run();
    });

    return 'Successfully updated details for ' + praise.twitter + '!';
  },

  createPoiInContextBroker: function (id, lat, lng) {

    this.unblock();
    var contextElements = {
      "contextElements": [
        {
          "type": "Cities",
          "isPattern": "false",
          "id": id,
          "attributes": [
            {
              "name": "position",
              "type": "coords",
              "value": lat + "," + lng,
              "metadatas": [
                {
                  "name": "location",
                  "type": "string",
                  "value": "WGS84"
                }
              ]
            }
          ]
        }
      ],
      "updateAction": "APPEND"
    };

    var data = Meteor.http.call("POST", ORION_URL + "/v1/updateContext",
        {
          "headers": {
            "Content-Length": JSON.stringify(contextElements).length,
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
          , "data": contextElements
        }
    );

    console.log(data);
    return data;
  },

  deletePostByIdFromContextBroker: function (id) {

    var contextElements = {
      "contextElements": [
        {
          "type": "Cities",
          "isPattern": "false",
          "id": id
        }
      ],
      "updateAction": "DELETE"
    }

    var data = Meteor.http.call("POST", ORION_URL + "/v1/updateContext",
        {
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "data": contextElements
        }
    );

  }
});
