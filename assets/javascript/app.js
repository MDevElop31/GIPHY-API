
  var topics = ["French Horn", "Saxophone", "Flute", "Drums", "Guitar", "Piano", "Tuba", "Oboe", "Trumpet", "Maracas"];

  var static = [];

  var animated = [];

      function renderButtons() {

        $("#instrumentButtons").empty();

        for (var i = 0; i < topics.length; i++) {

          var a = $("<button>");
          
          a.addClass("instrument");
          
          a.attr("data-name", topics[i]);
          
          a.text(topics[i]);
          
          $("#instrumentButtons").append(a);
        }
      }

      
      $(document).on("click", ".instrument", function(event) {
        
        event.preventDefault();

        static = [];
        
        animated = [];

        $("#instruments").empty();

        var search = $(this).attr("data-name");
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10&rating='g'";
       
        $.ajax({
        url: queryURL, 
        method: "GET"
      })
        .done(function(response) {

      console.log(response);
      console.log(queryURL);

      // Creates the divs and images and appends them to the page..
      for (var i = 0; i < 10; i++) {

        animated.push(response.data[i].images.fixed_height.url);
        
        static.push(response.data[i].images.fixed_height_still.url);

        var newDiv = $("<div>");
        newDiv.addClass("gif")

        var p = $("<p>");
        p.text("Rating: " + response.data[i].rating);

        if (response.data[i].rating === "") {
          p.text("Rating: n/a")
        };

        var newGif = $("<img>");

        newGif.attr("data-number", i)
        newGif.attr("src", gif.data[i].images.fixed_height_still.url);

        newDiv.append(p);
        newDiv.append(newGif);

        $("#instruments").append(newDiv);

        // This function creates the play/pause action
        newGif.click(function() {
          if ($(this).attr("src") === static[$(this).attr("data-number")]) {
            $(this).attr("src", animated[$(this).attr("data-number")])
          } else {
            $(this).attr("src", static[$(this).attr("data-number")]);
          };
        });

      };

    });

  });

renderButtons();

$(document).ready(function() {
    $(document).on("click", "#addInstrument", function() {
      
      var renderedButton = $("#instrument-input").val();
      
      $("#instruments").val();
      
      topics.push(renderedButton);
      
      renderButtons();
    });
});
        















