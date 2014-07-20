$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

	/*--- Declare Variables ---*/
	var guessCount = 0;
	var newGuess;
	var randomNumber;
	var distanceFromNumber;
	var wonGame = false;
	var pastGuesses =[];
	var guessesLeft = 5;

	/*--- Generate a random number ---*/
	var generateNewNumber = function(){
		randomNumber = Math.floor((Math.random()*100)+1);
		console.log("randomNumber is " +randomNumber);
	};

	/* --- On Page Load, generate random number */
	generateNewNumber();

	/*--- Clear guess text section ---*/
	var clearGuess = function() {
		$("#userGuess").val("").focus();
	};

	/*--- Remove past Guesses ---*/
	var removePastGuesses = function() {
		$("ul.guessBox li").remove();
	};

	/*--- Display the number of guesses taken ---*/
	var guessCountDisplay = function() {
		$("#count").text(guessCount);
	};

	/*--- Display the number of guesses left ---*/
	var guessCountDown = function() {
		$("#countDown").text(guessesLeft);
	};
	 
	 /*--- Display the Feedback ---*/
	var AddFeedback = function(feedback) {
		$("#feedback").text(feedback);
	};

	 /*--- Check how far the guess is and provide feedback---*/
	var checkTemperature = function() {
		distanceFromNumber = (Math.abs(randomNumber - newGuess));
		if (distanceFromNumber === 0) {
			AddFeedback("You Got It!!!");
			$("#userGuess").val(randomNumber + " is correct!");
			wonGame = true;
		} else if (distanceFromNumber < 2 && randomNumber > newGuess) {
			AddFeedback ("Scalding! Guess Higher!");
		} else if (distanceFromNumber < 2 && randomNumber < newGuess) {
			AddFeedback ("Scalding! Guess Lower!");
		} else if (distanceFromNumber < 4 && randomNumber > newGuess) {
			AddFeedback ("Very Hot! Guess Higher!");
		} else if (distanceFromNumber < 4 && randomNumber < newGuess) {
			AddFeedback ("Very Hot! Guess Lower!");
		} else if (distanceFromNumber < 8 && randomNumber > newGuess) {
			AddFeedback ("Hot! Guess Higher!");
		} else if (distanceFromNumber < 8 && randomNumber < newGuess) {
			AddFeedback ("Hot! Guess Lower!");
		} else if (distanceFromNumber < 13 && randomNumber > newGuess) {
			AddFeedback ("Warm! Guess Higher!");
		} else if (distanceFromNumber < 13 && randomNumber < newGuess) {
			AddFeedback ("Warm! Guess Lower!");
		} else if (distanceFromNumber < 23 && randomNumber > newGuess) {
			AddFeedback ("Luke Warm! Guess Higher!");
		} else if (distanceFromNumber < 23 && randomNumber < newGuess) {
			AddFeedback ("Luke Warm! Guess Lower!");
		} else if (distanceFromNumber < 38 && randomNumber > newGuess) {
			AddFeedback ("Cool! Guess Higher!");
		} else if (distanceFromNumber < 38 && randomNumber < newGuess) {
			AddFeedback ("Cool! Guess Lower!");
		} else if (distanceFromNumber < 54 && randomNumber > newGuess) {
			AddFeedback ("Cold! Guess Higher!");
		} else if (distanceFromNumber < 54 && randomNumber < newGuess) {
			AddFeedback ("Cold! Guess Lower!");
		} else {
			AddFeedback("Brr! Ice Cold!");
		}
	};

	var checkForRepeats = function(newGuess) {  //check for repeated numbers
		console.log("the new guess is " + newGuess);
		if (pastGuesses.length > 1) {
			for(x=0; x<pastGuesses.length; x++) { 
				if(pastGuesses[x] == newGuess) {
					AddFeedback("You've already tried that number! Guess again!");
				} 
			}
		}
	};

	/* --- User inputs guess --*/
	$("form").submit(function(event){
	event.preventDefault();
	if (wonGame === false) {
		newGuess = +$("#userGuess").val();
		/*--- Check if valid number --*/
		if (newGuess % 1 !== 0 || newGuess > 100 || newGuess < 1) {
			alert("You have entered an invalid number");
			clearGuess();
			return(false);
		} else {
			event.preventDefault();
			pastGuesses.push(newGuess);
			console.log("past guesses include " + pastGuesses);
			checkForRepeats(newGuess); //calling function to check for repeats
			$(".guessBox").append("<li>" + newGuess + "</li>");
			clearGuess();
			guessCount++;
			guessesLeft--;
			guessCountDisplay();
			guessCountDown();
			checkTemperature();
			if(newGuess !== randomNumber && guessesLeft < 1) { //countDown
				AddFeedback("Sorry, try again!")
			}
		}
	} else {
		AddFeedback("You've already won! Start a new game.");
	}
	});

	/* --- "Get a Hint Button" --- */
	$("#hintButton").click(function() {
		$("#answerSection").append("The answer is " + randomNumber + ".");
	});	

	/*-- "+ New Game" click to reset --*/
	$(".new").click(function(){
		generateNewNumber(); 
		clearGuess();
		guessCount = 0;
		wonGame = false;
		guessesLeft = 5;
		guessCountDown();
		removePastGuesses();
		guessCountDisplay();
		AddFeedback("Make your guess!");
		$("#answerSection").html("");
	});
});


