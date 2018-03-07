     $(function(){

      function getGifs(){
        var person = $(this).attr("data-person");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            console.log(results [i].images)
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr({
              "src":results[i].images.fixed_height.url,
               "class": "gif",
              "data-animate": results[i].images.fixed_height.url,
              "data-still":results[i].images.fixed_height_still.url
             });
            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
      })
      }

     $("#gifs-appear-here").on("click","img.gif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


 $("#add-gif").on("click", function() {
    var userInput = $("#addInput").val()
    var newButton = $("<button class = 'athleteButton' data-person = "+ userInput +" type='addInput' value='Dynamic Button' id='add-gif' />").appendTo('#buttons');
    newButton.text(userInput)
    newButton.on("click", getGifs);
 })

 $(".athleteButton").on("click", getGifs);
});