$(document).ready(function(){
  
 /*
  - initialize firebase
    - create database var
  - create on submit event for the form area
    - take in form input save as variables
    - validate data, so users can't input empty text fields
    - push the data to the database

  - create database.ref child_added event listener
    - set variables to see what's being added to the database
    - convert the time
      - calculate time until the next train (using frequency)
    
 */
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyADvzxWSIqBji0gPzvMiAUIDI-WiitNJHk",
    authDomain: "class-activities-8f94f.firebaseapp.com",
    databaseURL: "https://class-activities-8f94f.firebaseio.com",
    projectId: "class-activities-8f94f",
    storageBucket: "class-activities-8f94f.appspot.com",
    messagingSenderId: "447759855710"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  // on.submit for the form
  $("#formArea").on("submit", function(){
    // stop default
    event.preventDefault();
    // variables holding form field values

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();    var timeFirstTrain = $("#first-train-time").val().trim();
    var frequency = $("#frequency").val().trim();
    console.log(trainName, destination, timeFirstTrain, frequency);
    // validating input

    if (!trainName  || !destination || !timeFirstTrain || !frequency){
      return false;
    }

    // push to database

    database.ref().push({trainName, destination, timeFirstTrain, frequency});

    // clear input fields

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

  });

  database.ref().on("child_added", function(childAddedSnap){

    // save the added information in the database as variables

    var trainName = childAddedSnap.val().trainName;
    var destination = childAddedSnap.val().destination;
    var timeFirstTrain = childAddedSnap.val().timeFirstTrain;
    var frequency = childAddedSnap.val().frequency;

    console.log(trainName, destination, timeFirstTrain, frequency);

    // calculate the next train by taking timeFirstTrain and then adding the frequency

    var trainNext = moment(timeFirstTrain, "hh:mm").add(frequency, "minute").format("H:mm");

    // write to table

    var $tr = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(timeFirstTrain),
      $("<td>").text(frequency),
      $("<td>").text(trainNext)
    )

    $("tbody").append($tr);

    console.log(trainNext);
  })
  
})