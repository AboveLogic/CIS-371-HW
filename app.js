/**
 * Simple Note-Taking App.
 * Travis Post and Tyler West
 * 
 * VERY basic code to illustrate creating basic routes
 * and handlers.
 *
 */

// Set constants
const VERSION = "1.0.0";

// Import the libraries we need
const express = require('express');
const mongoose = require('mongoose');
const note = require('./note');
const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;
const pbkdf2 = require('pbkdf2');

// Connect to the database
const uri = "mongodb+srv://user:user@cluster0.pnwwl.mongodb.net/notesapi?retryWrites=true&w=majority"

try {
	mongoose.connect(uri);
} catch (err){
	console.log(err);
}

const userSchema = new Schema({
	username: String,
	password: String,
	salt: String,
	date: {
		type: Date,
		default: Date.now
	}
});

//user model
const User = mongoose.model('User', userSchema);

const validPassword = function(password, salt, hash){
	let key = pbkdf2.pbkdf2Sync(password, salt, 1, 32, 'sha512');

	if(key.toString('hex') != hash){
		return false;
	}
	return true;
}

passport.use(new Strategy(
	function(username, password, done) {
		User.findOne({username: username}, function (err, user){

			if (err){
				return done(err);
			}
			if (!user){
				console.log("No user found.");
				return done(null, false);
			}
			if(!validPassword(password, user.salt, user.password)){
				console.log('Wrong password')
				return done(null, false);
			}

			return done(null, user)
		});
	}
));
		

// Create the app instance
const app = express();
const port = 8080;

module.exports = { app, mongoose };

// Export any data we will need in other files
module.exports = { app, mongoose };

// Tell express to use the json body parser middleware
app.use(express.json());

// Set routes
app.get('/', function(req, res){
	res.send(`Simple note-taking app. Version ${VERSION}.`);
});

const checkAuth = passport.authenticate('basic', {session: false});

app.get('/notes', checkAuth, note.getAll);
app.get('/notes/:searchTerm', checkAuth, note.getOne);
app.post('/notes', checkAuth, note.postOne);
app.delete('/notes/:objectId', checkAuth, note.deleteOne);
app.put('/notes/:objectId', checkAuth, note.putOne);
app.patch('/notes/:objectId', checkAuth, note.updateOne)


// Start it up!
app.listen(port, () => {
	console.log(`Up and running on port ${port}.`);
});