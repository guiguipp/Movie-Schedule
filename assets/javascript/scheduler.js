  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCd2mhH25hb1RePzFqIWCC87v7B1D4f3nY",
    authDomain: "scheduler-9c1dc.firebaseapp.com",
    databaseURL: "https://scheduler-9c1dc.firebaseio.com",
    projectId: "scheduler-9c1dc",
    storageBucket: "scheduler-9c1dc.appspot.com",
    messagingSenderId: "276460451943"
  };
  firebase.initializeApp(config);

  var midHour = 23;
  var midMin = 59;

  const database = firebase.database();
  
  $("#submit").on("click", function (e){
    e.preventDefault();    

    // capture the values
    title = $("#title").val();
    time = $("#time").val();
    theater = $("#theater").val();    
    
    // push values to firebase
    database.ref().push({
      title: title,
      time: time,
      theater: theater,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    
    // reset values of form
    $("#title").val("");
    $("#time").val("");
    $("#theater").val("");
  });

  database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    console.log(sv.title);
    console.log(sv.time);
    console.log(sv.theater);


    // calculate difference
    var now = moment()
    var then = moment(sv.time,"H:mm A");
    
    // always show difference to next showing (not previous)
    if (now.isAfter(then)) {
        then.add(1, 'days');
      }

    var diff = then.from(now)
    
    const tRow = $("<tr>");
    var nameTd = $("<td>").text(sv.title);
    var timeTd = $("<td>").text(sv.time);
    var nextTd = $("<td>").text(diff);
    var theaterTd = $("<td>").text(sv.theater);

    tRow.append(tRow, nameTd, timeTd,nextTd,theaterTd);
            // Append the table row to the table body
            $("#movies-info-body").append(tRow);
            // Handle the errors
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
$(document).ready(function(){
  $('.timepicker').timepicker();
});
        