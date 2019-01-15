const router = require('express').Router();
const User = require('../models/user');

router.post("/login", (request, response) => {
    //check for email and password in request
    if(request.body.email && request.body.password) {
        //is there a user that matches the given email and password?
        let user = users.find((user) => {
            return user.login.email == request.body.email && user.login.hash == request.body.hash;
        });

        if(user) {
            response.writeHead(200, {"Content-Type": "application/JSON"});
            //checks for access token after successful login
            let currentAccessToken = accessToken.find((tokenObject) => {
                return tokenObject.email == user.login.email;
              });
        
              //update the last updated value so we get another time period
              if (currentAccessToken) {
                currentAccessToken.lastUpdated = new Date();
                response.end(JSON.stringify(currentAccessToken.token));
              } else {
                //create a new token with the user value and a "random" token
                let newAccessToken = {
                  email: user.login.email,
                  lastUpdated: new Date(),
                  token: uid(16)
                }
                accessToken.push(newAccessToken);
                response.end(JSON.stringify(newAccessToken.token));
              } 
            } else {
              //When a login fails, inform the client that either the username or password was wrong
              response.writeHead(401, "Invalid username or password");
              response.end();
            }
          } else {
            // If they are missing a parameter, inform the client that the response formatting is wrong
            response.writeHead(400, "Incorrectly formatted response");
            response.end();
          }
        });

        module.exports = router;




