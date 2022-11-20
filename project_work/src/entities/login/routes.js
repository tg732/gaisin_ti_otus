import path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const loginRoutes = (express, userInstance) => {

    express.get('/', function(request, response) {
      response.sendFile(path.join(__dirname + '../../../view/login.html'));
    });
    
    express.post('/auth', function(request, response) {
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
      if (request.session.loggedin) {
        // Output username
        response.sendFile(path.join(__dirname + '../../../view/main.html'));
      } else {
        // Not logged in
        response.send('Please login to view this page!');
      }
    });

    express.get('/taskPage', function(request, response) {
      // If the user is loggedin
      if (request.session.loggedin) {
        // Output username
        response.sendFile(path.join(__dirname + '../../../view/task.html'));
      } else {
        // Not logged in
        response.send('Please login to view this page!');
      }
    });
  }
