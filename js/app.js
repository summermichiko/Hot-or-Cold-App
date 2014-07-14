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

/*--- Generate a random number ---*/
var generateNewNumber = function(){
	randomNumber = Math.floor((Math.random()*100)+1);
	console.log("randomNumber is " +randomNumber);
};

/*--- Clear guess text section ---*/
var clearGuess = function() {
	$("#userGuess").val("").focus();
};

/*--- Remove past Guesses ---*/
var removePastGuesses = function() {
	$("ul.guessBox li").remove();
};

/*--- Display the number of guesses ---*/
var guessCountDisplay = function() {
	$("#count").text(guessCount);
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

/* ---Page Load, generate random number */
generateNewNumber();

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
			$(".guessBox").append("<li>" +newGuess+ "</li>");
			clearGuess();
			guessCount++;
			guessCountDisplay();
			checkTemperature();
		}
	} else {
		AddFeedback("You already won! Start a new game.");
	}

	});

/* --- "Get a Hint Button" --- */
	$("#hintButton").click(function() {
		$("#answerSection").append("The answer is " + randomNumber + ".");
	}) 



/*-- "+ New Game" click to reset --*/
	$(".new").click(function(){
		generateNewNumber(); 
		clearGuess();
		guessCount = 0;
		wonGame = false;
		removePastGuesses();
		guessCountDisplay();
		AddFeedback("Make your guess!");
	});
});


