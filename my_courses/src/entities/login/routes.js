const path = require('path');

module.exports = {
  register(express, userInstance) {

    express.get('/', function(request, response) {
      // Render login template
      response.sendFile(path.join(__dirname + '../../../view/login.html'));
    });
    
    // http://localhost:3000/auth
    express.post('/auth', function(request, response) {
      // Capture the input fields
      let username = request.body.username;
      let password = request.body.password;
      // Ensure the input fields exists and are not empty
      if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        //connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
          // If there is an issue with the query, output the error
          //if (error) throw error;
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
          response.end();
        //});
      } else {
        response.send('Please enter Username and Password!');
        response.end();
      }
    });
    
    express.get('/home', function(request, response) {
      // If the user is loggedin
      if (request.session.loggedin) {
        // Output username
        response.send('Welcome back, ' + request.session.username + '!');
      } else {
        // Not logged in
        response.send('Please login to view this page!');
      }
      response.end();
    });
  }
}
