var admin = require("firebase-admin");
var getToday = require("./getToday.js");
var getUpdatedStats = require("./getUpdatedStats.js");

var serviceAccount = require("./aquascraper-data-firebase-adminsdk.json");

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aquascraper-data.firebaseio.com"
});

var today = getToday();
var db = admin.database();
var usersRef = db.ref("users");
var salesStatsRef = db.ref("stats/"+today);

var users;
var promises = [];

var statsPromise = salesStatsRef.once("value").then(function(snapshot) { // Look at the "then" here, Promise based! 
  //console.log(snapshot.val())
  return snapshot.val();
}).then(function(todaysSalesStats){
    usersRef.once("value", function(snapshot) { // callback based...
      users = snapshot.val();

      for(user in users){
        let player = users[user];

        // make a stats object / Get stats object
        if (player.stats == undefined || player.stats == null) {
          player.stats = {};
        }

        // Reconsile todays sales with players portfolio
        player.stats[today] = getUpdatedStats(player.portfolio, todaysSalesStats);


        // Add timestamp
        var timestamp = Date.now();
        player.stats[today].timestamp = timestamp;
        console.log(player.stats[today])

        // Save in a set method
        var promise = db.ref(`users/${user}/stats/${today}`).set(player.stats[today])
                      .then(function(){console.log(`Finished setting ${player.username}`)});
        // Push the promise
        promises.push(promise);
      }

      // When all promises have resolved, exit node
      Promise.all(promises)
      .then(function(p){
        console.log(`All promises: \n ${p}`)
        console.log("Exiting");
        process.exit(0)
      }).catch(function (error) {
        console.error("Error after promises: "+error)
        process.exit(1)
      });
  });
})





// usersRef.once("value", function(snapshot) {
//   var users = snapshot.val();

//   for(user in users){
//     let player = users[user];
//     // make a stats object / Get stats object
//     if (player.stats == undefined || player.stats == null) {
//       player.stats = {};
//     }

//     var today = getToday();
//     // Record the day's agg stats
//     player.stats[today] = player.portfolio.aggStats;

//     // Add timestamp
//     var timestamp = Date.now();
//     player.stats[today].timestamp = timestamp;
//     console.log(player.stats[today])

//     // Save in a set method
//     //console.log(db.ref(`users/${user}/stats`));
//     db.ref(`users/${user}/stats/${today}`).set(player.stats[today]);

//   }
// })
// .then(function(){
// 	process.exit(0)
// })


// This exits before the set method finishes. Need to restructure to allow set to finish

// .then(function(){
// 	process.exit(0)
// }).catch(function (error) {
//   console.error(error)
//   process.exit(1)
// });