const path = require('path');
var ExpressBrute = require('express-brute');
var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store);

var failCallback = function (req, res, next, nextValidRequestDate) {
  console.log(nextValidRequestDate)
  req.flash('error', "You've made too many failed attempts in a short period of time, please try again later");
  res.redirect('/'); // brute force protection triggered, send them back to the login page
};
var handleStoreError = function (error) {
  log.error(error); // log this error so we can figure out what went wrong
  // cause node to exit, hopefully restarting the process fixes the problem
  throw {
      message: error.message,
      parent: error.parent
  };
}

// Start slowing requests after 5 failed attempts to do something for the same user
var userBruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5*60*1000, // 5 minutes
  maxWait: 60*60*1000, // 1 hour,
  failCallback: failCallback,
  handleStoreError: handleStoreError
});

module.exports = {
  register(express, userInstance) {

    express.get('/', function(request, response) {
      response.sendFile(path.join(__dirname + '../../../view/login.html'));
    });
    
    express.post('/auth', 
    bruteforce.prevent,
    function(request, response) {
      // Capture the input fields
      let username = request.body.username;
      let password = request.body.password;
      // Ensure the input fields exists and are not empty
      if (username && password) {
          // If the account exists
          if (username == 'test' && password == 'test') {
            // Authenticate the user
            request.session.loggedin = true;
            request.session.username = username;
            // Redirect to home page
            response.redirect('/home');
          } else {
            response.send('Incorrect Username and/or Password!');
          }
      } else {
        response.send('Please enter Username and Password!');
        response.end();
      }
    });
    
    express.get('/home', function(request, response) {
      // If the user is loggedin
      console.log(request.session.loggedin)
      if (request.session.loggedin) {
        // Output username
        response.sendFile(path.join(__dirname + '../../../view/main.html'));
      } else {
        // Not logged in
        response.send('Please login to view this page!');
      }
    });

    express.get('/coursePage', function(request, response) {
      // If the user is loggedin
      console.log(request.session.loggedin)
      if (request.session.loggedin) {
        // Output username
        response.sendFile(path.join(__dirname + '../../../view/course.html'));
      } else {
        // Not logged in
        response.send('Please login to view this page!');
      }
    });
  }
}
