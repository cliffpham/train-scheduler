// Intialize firebase
var config = {
  apiKey: "AIzaSyBwhgtmCWM6qSdThy6ARB52wN04Nk5Kw7Q",
  authDomain: "schedule-f61c6.firebaseapp.com",
  databaseURL: "https://schedule-f61c6.firebaseio.com",
  projectId: "schedule-f61c6",
};

firebase.initializeApp(config);


var database = firebase.database();


// on submit button click

$("#submit-button").on("click", function(event){
event.preventDefault();

var tname = $("#tname").val().trim();
var destination = $("#destination").val().trim();
var ft = $("#ft").val().trim();
var fq = $("#fq").val().trim();

var newTrain = {
  tname: tname,
  destination: destination,
  ft: ft,
  fq: fq
};

database.ref().push(newTrain);

// console.log(newTrain.name);
// console.log(newTrain.destination);
// console.log(newTrain.ft);
// console.log(newTrain.fq);

$("#tname").val('');
$("#destination").val('');
$("#ft").val('');
$("#fq").val('');

});

// Display
database.ref().on("child_added", function(childSnap, prevChildKey){

console.log(childSnap.val());

// Store object data into individual variables

var tname = childSnap.val().tname;
var destination = childSnap.val().destination;
var ft = childSnap.val().ft;
var fq = childSnap.val().fq;

console.log(tname);
console.log(destination);
console.log(ft);
console.log(fq);

//time conversions

var ftConverted = moment(ft, "HH:mm").subtract(1, "years");
console.log(ftConverted);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(ftConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemainder = diffTime % fq;
console.log(tRemainder);

var tMinutesTillTrain = fq - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

nextTrain = moment(nextTrain).format("hh:mm A");

$("#trainDisplay").append("<tr><td>" + tname + "</td><td>" + destination + "</td><td>" + fq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

})

