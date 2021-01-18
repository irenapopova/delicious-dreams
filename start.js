const mongoose = require('mongoose');


// Make sure to run updated node version  7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log('🛑 🌮 🐶 🌵\nHey You! \n\t ya you! \n\t\tBum! \n\tYou\'re on an older version of node that doesn\'t support the latest 👌\n ');
  process.exit();
}

// import environmental variables from the variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// Import all of my modules 
// I have to import the modules only once, because as soon as i connect to MongoDB and as soon as I import my modules, MongoDB will know about them throughout my entire application. 🔔mongo uses the concept called singleton, which means that once I configure it, NO  need to keep doing it every single file 

// (simply require my models folder)
require('./models/Store'); // no need to put .js at the end it is assumed, 

// Start  app!
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
