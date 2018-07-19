// this app.js when linked in the html renders smaller giphy gifs to the page - it is not as complete as app2.js
$(document).ready(function () {

    // topic array
    var topic = ["Rick and Morty", "I Love Lucy", "Bob's Burgers", "SpongeBob", "The Office", "Archer", "The Simpsons",
        "Silicon Valley", "Family Guy", "Game of Thrones", "Curb Your Enthusiasm", "Futurama", "Walking Dead",
        "South Park", "Seinfeld", "Westworld", "The Sopranos",]

    // Function for displaying show buttons - activity week06 - day02 - 10 working-movie-app  
    function renderButtons() {

        // Deleting the buttons prior to adding buttons
        $("#buttons-view").empty();

        // Looping through the array of shows
        for (var i = 0; i < topic.length; i++) {

            // Then dynamicaly generating buttons for each show in the array
            var showButton = $("<button>");
            // Adding a class of movie-btn to our button
            showButton.addClass("tvShows");
            showButton.addClass("btn btn-primary")
            // Adding a data-attribute
            showButton.attr("data-name", topic[i]);
            // Providing the initial button text
            showButton.text(topic[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(showButton);
        }
    }

    //function to add new button   - - activity week06 - day02 - 10 working-movie-app  
    function addShowButton() {
        // This function handles events where a show button is clicked
        $("#addShow").on("click", function () {
            // This line grabs the input from the textbox
            var tvShows = $("#topicInput").val().trim();
            //no blank buttons
            if (tvShows == "") {
                return false;//no blank buttons
            }
            // Adding show from the textbox to our array
            topic.push(tvShows);
            // Calling renderButtons which handles the processing of our array    
            renderButtons();
            return false;
        });
    }

    //function to remove last button
    function removeShowButton() {
        $("#removeShows").on("click", function () {
            topic.pop(tvShows);
            renderButtons();
            return false;
        });

    }

    // function that displays the gifs - AJAX call - activity week06 - day03 - 14 dynamic-elements  

    function displayGifs() {
        var tvShows = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShows + "&api_key=NvC7yVFuPNZp1NUpNsBetCDhN9CVla6c&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .then(function (response) {

                console.log(queryURL);

                console.log(response);

                $("#shows-view").empty();

                // storing the data from the AJAX request in the results variable 
                var results = response.data;

                if (results == "") {
                    alert("Unable to return a Giphy for this Show!");
                }
                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    //put gifs in a div
                    var showDiv = $("<div1>");

                    //pull rating of gif
                    var showRating = $("<p>").text("Rating " + results[i].rating);
                    showDiv.append(showRating);

                    //pull gif
                    var showImage = $("<img>");
                    showImage.attr("src", results[i].images.fixed_height_small_still.url);
                    //paused images
                    showImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    //animated images
                    showImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    //in coming images , already paused
                    showImage.attr("data-state", "still");
                    showImage.addClass("image");
                    showDiv.append(showImage);

                    //prepend showDiv to "#shows-view"
                    $("#shows-view").prepend(showDiv);
                }
            });
    }


    // Calling renderButtons which handles the processing of our topic array
    renderButtons();
    // Calling addShowButton which handles the processing of the new show button
    addShowButton();
    // Calling removeShowButton which handles the processing of removing of new show button
    removeShowButton();



    // Adding a click event listener to all elements with a class of ".tvShows"
    $(document).on("click", ".tvShows", displayGifs);

    // onClick to Play and Pause gifs - - activity week06 - day03 - 15 pausing gifs 
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }

    });

});