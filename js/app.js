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
	$("#userGuess").focus();

	/*--- initial text setting ---*/
	$("#countDown").text("You've got " + guessesLeft + " guesses left");

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
		if (guessesLeft == 1) {
			$("#countDown").text("You've got " + guessesLeft + " guess left");
		} else {
			$("#countDown").text("You've got " + guessesLeft + " guesses left");
		}
	};

	 /*--- Display the Feedback ---*/
	var AddFeedback = function(feedback) {
		$("#feedback").text(feedback).hide().fadeIn();
	};

	 /*--- Check how far the guess is and provide feedback---*/
	var checkTemperature = function() {
		distanceFromNumber = (Math.abs(randomNumber - newGuess));
		if (distanceFromNumber === 0) {
			var feedbackString = "You got it! " + randomNumber + " is correct!";
			AddFeedback(feedbackString);
			wonGame = true;
			$(".topSection").hide();
			$(".bottomSection").css({
				"padding-top": "25px",
				"margin-top": "15px"
			});
			$("#feedback").append(
				'<button class="playAgainButton">Play Again</button>'
			);
			return;
		} else if (distanceFromNumber < 2 && randomNumber > newGuess) {
			AddFeedback ("Scalding hot! Guess higher!");
		} else if (distanceFromNumber < 2 && randomNumber < newGuess) {
			AddFeedback ("Scalding hot! Guess lower!");
		} else if (distanceFromNumber < 4 && randomNumber > newGuess) {
			AddFeedback ("Very hot! Guess higher!");
		} else if (distanceFromNumber < 4 && randomNumber < newGuess) {
			AddFeedback ("Very hot! Guess lower!");
		} else if (distanceFromNumber < 8 && randomNumber > newGuess) {
			AddFeedback ("Hot! Guess higher!");
		} else if (distanceFromNumber < 8 && randomNumber < newGuess) {
			AddFeedback ("Hot! Guess lower!");
		} else if (distanceFromNumber < 13 && randomNumber > newGuess) {
			AddFeedback ("Warm! Guess higher!");
		} else if (distanceFromNumber < 13 && randomNumber < newGuess) {
			AddFeedback ("Warm! Guess lower!");
		} else if (distanceFromNumber < 23 && randomNumber > newGuess) {
			AddFeedback ("Luke warm! Guess higher!");
		} else if (distanceFromNumber < 23 && randomNumber < newGuess) {
			AddFeedback ("Luke warm! Guess lower!");
		} else if (distanceFromNumber < 38 && randomNumber > newGuess) {
			AddFeedback ("Cool! Guess higher!");
		} else if (distanceFromNumber < 38 && randomNumber < newGuess) {
			AddFeedback ("Cool! Guess lower!");
		} else if (distanceFromNumber < 54 && randomNumber > newGuess) {
			AddFeedback ("Cold! Guess higher!");
		} else if (distanceFromNumber < 54 && randomNumber < newGuess) {
			AddFeedback ("Cold! Guess lower!");
		} else {
			AddFeedback("Brr! Ice cold!");
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
				if (guessesLeft === 0) {
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
							"padding-top": "25px",
							"margin-top": "15px"
						});
						$("#feedback").append(
							'<button class="playAgainButton">Try Again</button>'
						);
					}
				}
			}
		} else {
			AddFeedback("You've already won! Start a new game.");
		}
	});

	/*-- play again button click to reset --*/
	$(".bottomSection").on("click", ".playAgainButton", function(){
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
