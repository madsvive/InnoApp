angular.module('starter.signupCtrl', [])

//Firebase code to create a user
var ref = new Firebase("https://innoappxb02.firebaseio.com");
ref.createUser({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
});

//Firebase code to login a user
var ref = new Firebase("https://innoappxb02.firebaseio.com");
ref.authWithPassword({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});