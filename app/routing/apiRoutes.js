var friends = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDiff: 1000
        };
        //this is to Parse the results of the users result to POST.
        var userData = req.body;
        var userScores = userData.scores;
        console.log(userData)
        console.log(userScores);
        //this variable is created to calculate the difference between the user's scores & the scores 
        //of each user saved in the database.
        var totalDifference = 0;

        //loop through the array of of friends 
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDifference = 0;


            //Then we loop through all  the scores of each friend
            for (var j = 0; i < friends[i].scores[j]; i++) {

                //here we calculate the difference between the scores and sum then into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
            }

            //If the sum of difference is less than the difference of the current "best match"
            if (totalDifference <= bestMatch.friendDiff) {

                //Reset the bestMatch to be the new friend.
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDiff = totalDifference;
            }
        }

        friends.push(userData);


        res.json(bestMatch);

    })

}