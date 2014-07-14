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

/* ---Page Load, generate random number */
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
		$("#userGuess").val(randomNumber + "!");
		wonGame = true;
	} else if (distanceFromNumber < 2 ) {
		AddFeedback("Scalding!");
	} else if (distanceFromNumber < 4 ) {
		AddFeedback("Very Hot!");
	} else if (distanceFromNumber < 8 ) {
		AddFeedback("Hot!");
	} else if (distanceFromNumber < 13 ) {
		AddFeedback("Warm");
	} else if (distanceFromNumber < 23 ) {
		AddFeedback("Luke Warm");
	} else if (distanceFromNumber < 38 ) {
		AddFeedback("Cool");
	} else if (distanceFromNumber < 54 ) {
		AddFeedback("Cold");
	} else {
		AddFeedback("Ice Cold!");
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
			return(false);
		} else {
			event.preventDefault();
			pastGuesses.push(newGuess);
			console.log(pastGuesses);
			$(".guessBox").append("<li>" +newGuess+ "</li>");
			clearGuess();
			guessCount++;
			guessesLeft--;
			guessCountDisplay();
			guessCountDown();
			checkTemperature();
		}
	} else {
		AddFeedback("You've already won! Start a new game.");
	}
	});

	if(guessCount < 1) {
		AddFeedback("Sorry, try again!")
	}

/* --- "Get a Hint Button" --- */
	$("#hintButton").click(function() {
		$("#answerSection").append("The answer is " + randomNumber + ".");
	});

/* --- "Check for repeated answers" --*/
	for(x=0; x<pastGuesses.length; x++) {
		if(newGuess == pastGuesses[x]) {
			AddFeedback("You've already tried that number! Guess again!");
		}
	}

/*-- "+ New Game" click to reset --*/
	$(".new").click(function(){
		generateNewNumber(); 
		clearGuess();
		guessCount = 0;
		wonGame = false;
		removePastGuesses();
		guessCountDisplay();
		AddFeedback("Make your guess!");
		$("#answerSection").html("");
	});
});


