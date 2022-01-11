
var player = [];
var computer  = [];
var playedCards = [];
var cards = [];
var $draw = $("#draw");
var $player = $("#player");
var $computer = $("#computer");
var $playerNumber = $("#playerNumber");
var $computerNumber = $("#computerNumber");
var $playerSuit = $("#playerSuit");
var $computerSuit = $("#computerSuit");
var $winner = $("#winner");
var $player1Count = $("#player1count");
var $player2Count = $("#player2count");
var $playerAnswer = $("#playerAnswer");
var $submit = $("#submit");
var number1;
var number2;
var suit1;
var suit2;
var numberImg1;
var numberImg2;
var compare = 0;
var chosen = 0;
var winner = 0;
var integerChoice = 0;
var addition  = 0;
var multiplication = 0;
var subtraction = 0;
var arithmetic = 0;

var cards = [];

for (i=1; i<14; i++){
  for (k=1; k<5; k++) {
    var j = [i,k];
    cards.push(j);
  }
}


cards.shuffle = function() {
  console.log("shuffle");
  var input = this;
  for (var i = cards.length-1; i >=0; i--) {
    var randomIndex = Math.floor(Math.random()*(i+1));
    var itemAtIndex = cards[randomIndex][0];
    var itemAtSecond = cards[randomIndex][1];
    input[randomIndex][0] = input[i][0];
    input[randomIndex][0] = input[i][1];
    input[i][0] = itemAtIndex;
    input[i][1] = itemAtSecond;
  }
  return input;
}
//end of shuffle function

cards.shuffle();


var half = cards.length/2;
for (i=0; i<half; i++) {
  player.push(cards[i]);
}

cards.splice(0, half);

computer = cards;

//turn off the ability to click the winner untill math options is chosen
$computer.unbind("click");
$player.unbind("click");

$player1Count.html(player.length);
$player2Count.html(computer.length);

function endGame() {

  if(player.length == 0) {
    $winner.html("GAME OVER </br> Computer Wins </br> Player One has no more cards to play.");
  }
  if(computer.length == 0) {
    $winner.html("GAME OVER </br> Player Wins </br> Player Two has no more cards to play.");
  }
  $winner.css("color", "red");
  $winner.css("font-weight", "bold");
  $("#end").ss("display", "none");
  $playerNumber.html("");
  $computerNumber.html("");
  $draw.off();
}

$draw.on('click', function() {
  if (arithmetic == 1) {
    $("#submit").css("display", "block");
    $("#playerAnswer").css("display", "block");
  }

  $('input').val('');

  assign();
});

$submit.on('click', function(){
  playerAnswer = $playerAnswer.val().trim();
  submit();
});

function assign(){

  $player.css("border-color", "black");
  $computer.css("border-color", "black");

  if(player.length == 0 || computer.length == 0) {
    endGame();
  }

  $playerSuit.empty();
  $computerSuit.empty();

  $playerSuit.css("display", "block");
  $computerSuit.css("display", "block");

  number1=player[0][0];
  number2=computer[0][0];

  $playerNumber.html(number1);
  $computerNumber.html(number2);

  suit1 = player[0][1];
  suit2 = computer[0][1];

  if (integerChoice == 1) {
    if (suit1 == 1) {
      number1 = number1 - 2*(number1);
    }
    if (suit1 == 2) {
      number1 = number1 - 2*(number1);
    }
    if (suit2 == 1) {
      number2 = number2 - 2*(number2);
    }
    if (suit2 == 2) {
      number2 = number2 - 2*(number2);
    }
  }

  if (suit1 == 1) {
    suit1 = "<img src='./images/heart.png'/>";
  }
  if (suit1 == 2) {
    suit1 = "<img src='./images/diamond.png'/>";
  }
  if (suit1 == 3) {
    suit1 = "<img src='./images/club.png'/>";
  }
  if (suit1 == 4) {
    suit1 = "<img src='./images/spade.png'/>";
  }
  if (suit2 == 1) {
    suit2 = "<img src='./images/heart.png'/>";
  }
  if (suit2 == 2) {
    suit2 = "<img src='./images/diamond.png'/>";
  }
  if (suit2 == 3) {
    suit2 = "<img src='./images/club.png'/>";
  }
  if (suit2 == 4) {
    suit2 = "<img src='./images/spade.png'/>";
  }

  if (number1<11) {
    for (i=0; i<(Math.abs(number1)); i++) {
      $playerSuit.append(suit1);
    };
  } else {
    if (number1 == 11 || number1 == -11) {
      numberImg1 = "<img src='./images/jack.png'/>";
      $playerSuit.append(suit1);
      $playerNumber.html(numberImg1);
    }
    if (number1 == 12 || number1 == -12) {
      numberImg1 = "<img src='./images/queen.png'/>";
      $playerSuit.append(suit1);
      $playerNumber.html(numberImg1);
    }
    if (number1 == 13 || number1 == -13) {
      numberImg1 = "<img src='./images/king.png'/>";
      $playerSuit.append(suit1);
      $playerNumber.html(numberImg1);
    }
  }

  if (number2<11) {
    for (i=0; i<(Math.abs(number2)); i++) {
      $computerSuit.append(suit2);
    };
  } else {
    if (number2 == 11 || number2 == -11) {
      numberImg2 = "<img src='./images/jack.png'/>";
      $computerSuit.append(suit2);
      $computerNumber.html(numberImg2);
    }
    if (number2 == 12 || number2 == -12) {
      numberImg2 = "<img src='./images/queen.png'/>";
      $computerSuit.append(suit2);
      $computerNumber.html(numberImg2);
    }
    if (number2 == 13 || number2 == -13) {
      numberImg2 = "<img src='./images/king.png'/>";
      $computerSuit.append(suit2);
      $computerNumber.html(numberImg2);
    }
  }

  playedCards.push(player[0]);
  playedCards.push(computer[0]);
  console.log(playedCards.length, "how many played");

  player.splice(0,1);
  computer.splice(0,1);
  $player1Count.html(player.length);
  $player2Count.html(computer.length);

  greater();
}

function war() { //once war happens it breaks and it keeps doing war. Also need to figure out why it is giving and taking moer cards than it should.

  $draw.prop('disabled', true);

  $winner.html("This means war!");
  for (i=0; i<3; i++) {
    playedCards.push(player[0]);
    playedCards.push(computer[0]);
    player.splice(0,1);
    computer.splice(0,1);
    $player1Count.html(player.length);
    $player2Count.html(computer.length);
  }

  $playerSuit.css("display", "none");
  $computerSuit.css("display", "none");

  numberImg1 = "<img stlye='height:14rem;' src='./images/card.png'/>";
  $playerNumber.html(numberImg1);
  numberImg2 = "<img stlye='height:14rem;' src='./images/card.png'/>";
  $computerNumber.html(numberImg2);

  var audio = new Audio('card.mp3');
    audio.play();

    window.setTimeout(function() {
      audio.play();
      $playerSuit.css("display", "none");
      $computerSuit.css("display", "none");
      $playerNumber.html(numberImg1);
      $computerNumber.html(numberImg2);
    }, 1800);
  window.setTimeout(function() {
    audio.play();
  }, 2600);
  window.setTimeout(function() {
    audio.play();
  }, 3400);
  window.setTimeout(function() {
    console.log("call assign");
    assign();
    audio.play();
  }, 4200);

  $draw.prop('disabled', false);
}

//Alternative Choices

function submit() {
  console.log("run submit");
  if (addition == 1 ) {
    addMath();
  }

  if (subtraction == 1 ) {
    subtractMath();
  }

  if (multiplication == 1 ) {
    multiplyMath();
  }

  if (playerAnswer == answer) {
    chosen = winner;
  } else {
    chosen = winner - 1;
  }

  mathCheck();
}

function compareMath(){
  if (number1 > number2) {
    winner = 1;
  } else {
    winner = 2;
  }
}

function addMath() {
  answer = number1 + number2;
}

function subtractMath() {
  answer = number1 - number2;
  if (playerAnswer == answer) {
    chosen = winner;
  } else {
    chosen = winner - 1;
  }
}

function multiplyMath() {
  answer = number1 * number2;
  if (playerAnswer == answer) {
    chosen = winner;
  } else {
    chosen = winner - 1;
  }
}

function mathCheck() {
  if (chosen == winner){
    for (i=0; i<playedCards.length; i++) {
      player.push(playedCards.length);
    }
    $winner.html("Player One Wins");
    $player.css("border-color", "red");
    $player1Count.html(player.length);
    playedCards==[];
  } else if (chosen != winner) {
    for (i=0; i<playedCards.length; i++) {
      computer.push(playedCards[i]);
    }
    $winner.html("Player Two Wins");
    $player.css("border-color", "red");
    $player2Count.html(computer.length);
    playedCards=[];
  }
}

function greater() {
  if  (number1 === number2) {
    war();
  }

  if (compare == 1) {
    compareMath();
    return;
  }

  if (arithmetic == 1) {
    return;
  }

  if (number1 > number2)  {
    $winner.html("Player One Wins");
    $player.css("border-color", "red");
    for (i=0; i<playedCards.length; i++) {
      player.push(playedCards[i]);
  }
    $player1Count.html(player.length);
      playedCards=[];
  } else if (number2 > number1) {
        $winner.html("Player Two Wins");
    for (i=0; i<playedCards.length; i++) {
      computer.push(playedCards[i]);
  }
    $player2Count.html(computer.length);
    playedCards=[];
  } else if (number1 == number2) {
    war();
  }
}

//closes greater

$("#mathOptions").on('click', function() {
    $(".hidden").css("display", "none");
    $("#options").css("display", "block");
});

$("#compare").on('click', function() {
  $("#options").css("display", "none");
  $("#integers").css("display", "block");
  $("#compareDirections").css("display", "block");
  $("#one").css("display", "block");
  $("#two").css("display", "block");
  compare = 1;

  $player.on('click', function() {
    chosen = 1;
    mathCheck();
  });

  computer.on('click', function() {
    chosen = 2;
    mathCheck();
  });
});

$("#arithmetic").on('click', function() {
  $("#options").css("display", "none");
  $("#math").css("display", "block");
  $("#submit").css("display", "block");
  $("#playerAnswer").css("display", "block");
  arithmetic = 1;
});

$("#math").on('click', function() {
  $("#math").css("display", "none");
  $("#integers").css("display", "block");
});

$("#no").on('click', function() {
  $("#integers").css("display", "none");
});

$("#yes").on('click', function() {
  $("#integers").css("display", "none");
  $("#integerDirections").css("display", "block");
  integerChoice = 1;
});

$("#add").on('click', function() {
  $("#addDirections").css("display", "block");
  addition = 1;
});

$("#multiply").on('click', function() {
  $("#multiplyDirections").css("display", "block");
  multiplication = 1;
});

$("#subtract").on('click', function() {
  $("#subtractDirections").css("display", "block");
  subtraction = 1;
});

$("#one").on('click', function(){
  chosen = 1;
  compareMath();
});

$("#two").on('click', function(){
  chosen = 2;
  compareMath();
});

 //closes document ready
