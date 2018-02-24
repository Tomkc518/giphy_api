$(function() {   
    var animals = ["dogs", "cat", "rabbit", "hampster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "salamander", "frog"];
    var animalImage = "";

    function displayAnimalGif() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=w5yvZ3XmdJ1PSd4TJoxm6gkH5hIdbbKJ&limit=10";
        //clears the previous gifs so they don't just keep adding
        $(".gifs").detach();
        //pulls the information from giphy and does wonderful things!
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            results = response.data;
            for (var i = 0; i < results.length; i++) {
                // Creating and storing a div tag
                var animalDiv = $("<div class='gifs float-left m-2 mt-5'>");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                // Creating and storing an image tag
                animalImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item, also sets the attributes needed to turn them "on" and "off" on click and starts with the gif not started.
                animalImage.attr({
                    "src": results[i].images.fixed_height_still.url,
                    "data-state": "still",
                    "class": "gifImage",
                    "data-animate": results[i].images.fixed_height.url,
                    "data-still": results[i].images.fixed_height_still.url
                });
                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);
                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs").prepend(animalDiv);
              };
            renderButtons();
        });
    };

    function renderButtons() {
        // Deleting the buttons prior to adding new animals
        $("#newButtons").empty();
        // Dynamically generating buttons for each animal in the array
        for (var i = 0; i < animals.length; i++) {
            var a = $("<button class='btn btn-primary animal m-1'>");
            // Adding a data-attribute
            a.attr("data-name", animals[i]);
            // Providing the initial button text
            a.text(animals[i]);
            // Adding the button to the buttons-view div
            $("#newButtons").append(a);
        }
    }

    $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
        //check if the button was already added, and do nothing if its there
        if (animals.indexOf(animal) === -1){
            // Adds the animal from the textbox to the animals array
            animals.push(animal);
            // populates the button with the information entered into the text box
            renderButtons();
        };
    });

    $(document).on("click", ".gifImage", function() {
        // checks the gifs current state
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
        };
    });
    // after the button is rendered, clicking on it displays the animal gifs
    $(document).on("click", ".animal", displayAnimalGif);
    // Calling the renderButtons function to display the initial buttons
    renderButtons();
});