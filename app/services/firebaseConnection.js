const firebase = require('firebase');

const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.DATABASE_URL,
	storageBucket: process.env.STORAGE_BUCKET
};

function initializeFirebase() {
	firebase.initializeFirebase(config);
}

function getDatabase() {
	return firebase.database();
}

module.exports = {
	init: initializeFirebase(),
	getDatabase: getDatabase()
};


