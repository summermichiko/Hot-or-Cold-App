$(document).ready(function(){

	/*--- Declare Variables ---*/
	var guessCount = 0,
		newGuess,
		randomNumber,
		distanceFromNumber,
		wonGame = false,
		pastGuesses =[],
		guessesLeft = 5;

	/*--- initial focus into input ---*/
	$("#userGuess").focus()

	/*--- Generate a random number ---*/
	var generateNewNumber = function(){
		randomNumber = Math.floor((Math.random()*100)+1);
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

	/*--- Display the number of guesses remaining ---*/
	var guessCountDisplay = function() {
		$("#count").text(guessCount).fadeIn();
	};

	/*--- Display the number of guesses left ---*/
	var guessCountDown = function() {
		$("#countDown").text(guessesLeft);
	};

	 /*--- Display the Feedback ---*/
	var AddFeedback = function(feedback) {
		$("#feedback").text(feedback).hide().fadeIn();
	};

	 /*--- Check how far the guess is and provide feedback---*/
	var checkTemperature = function() {
		console.log(randomNumber)
		distanceFromNumber = (Math.abs(randomNumber - newGuess));
		if (distanceFromNumber === 0) {
			AddFeedback("You Got It!");
			$("#userGuess").val(randomNumber + " is correct!");
			wonGame = true;
			return;
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

	// check for repeated numbers
	var checkForRepeats = function(newGuess) {
		if (pastGuesses.length >= 1) {
			for (var x=0; x<pastGuesses.length; x++) {
				if(newGuess == pastGuesses[x]) {
					AddFeedback("You've already tried that number!");
				}
			}
		}
	};

	/* --- User inputs guess --*/
	$("form").submit(function(e){
		e.preventDefault();
		if (wonGame === false) {
			newGuess = +$("#userGuess").val();
			// check if valid number
			if (newGuess % 1 !== 0 || newGuess > 100 || newGuess < 1) {
				alert("You have entered an invalid number");
				clearGuess();
				return(false);
			} else {
				$(".bottomSection").fadeIn();
				if (guessesLeft == 0) {
					return;
				} else {
					e.preventDefault();
					$(".guessBox").append("<li>" + newGuess + "</li>").hide().fadeIn();
					clearGuess();
					checkTemperature();
					checkForRepeats(newGuess);
					pastGuesses.push(newGuess);
					guessCount++;
					guessesLeft--;
					guessCountDisplay();
					guessCountDown();
					if(newGuess !== randomNumber && guessesLeft < 1) {
						AddFeedback("Bummer, the answer was " + randomNumber + ".");
						$(".topSection").hide();
						$(".bottomSection").css({
							"padding-top": "30px",
							"margin-top": "15px"
						});
					}
				}
			}
		} else {
			AddFeedback("You've already won! Start a new game.");
		}
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
		$("#answerSection").html("");
		$(".topSection").show();
		$(".bottomSection").css({
			"padding-top": "0",
			"margin-top": "-10px"
		}).hide();
	});
});


