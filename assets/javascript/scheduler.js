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

  const database = firebase.database();
  const movies = [];
  
  $("#submit").on("click", function (e){
    e.preventDefault();    

    // capture the values
    title = $("#title").val();
    time = $("#time").val();
    theater = $("#theater").val();    
    
    movies.push(title);
    console.log(movies);
    
    // getMovieInfo(title);

    // push values to firebase
    database.ref().push({
      title: title,
      time: time,
      theater: theater,
      // thumbnail: response.Poster,
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
    // console.log(sv.title);
    // console.log(sv.time);
    // console.log(sv.theater);

    // calculate difference
    var now = moment()
    var then = moment(sv.time,"H:mm A");
    
    // always show difference to next showing (not previous)
    if (now.isAfter(then)) {
        then.add(1, 'days');
      }

    var diff = then.from(now)
    /* This automatically converts the time difference in the most relevant format.
    I guess it would be easy to create "if rules" to customize it if I wanted to be more precise
    (to always show: OOmin if it's less than one hour, 00h and 00min if it's less than a day 
    (instead of just the number of hours), and 1 day OOh and 00min instead of just "1 day") 
    ...but I kinda like it like that: only the relevant unit is shown
     (no min if more than one hour away, for instance) */ 
    
    const tRow = $("<tr>");
    var nameTd = $("<td class='movie-name'>").text(sv.title);
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

/* End of the working code. I would like to add 3 features: deleting the movies entered, 
but also calls to OMDN API for an image thumbnail of the movie + rating on Rotten Tomato 
(if possible) time spent on the group project has prevented me to complete this ...but I 
will work on it as soon as I have a minute to spare because ...I kinda think this would 
be a sweet app to have).   */



function getMovieInfo(movie) {

  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var movieDiv = $("<div class='movie'>");
    var imgURL = response.Poster;

    var image = $("<img>").attr("src", imgURL);
    return movieDiv;

    // // Appending the image
    // movieDiv.append(image);

    // // Putting the entire movie above the previous movies
    // $(".movie-name").append(movieDiv);
  });
}

    // <form action="#">
    //   <label>
    //     <input class="with-gap" name="group1" type="radio"  />
    //     <span>Remove</span>
    //   </label>
    // </form>