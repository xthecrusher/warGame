
var firstPlayer = [];
var secondPlayer  = [];
var playedCards = [];
var cards = [];
var $draw = $("#draw");
var $firstPlayer = $("#firstPlayer");
var $secondPlayer = $("#secondPlayer");
var $FirstPlayerNumber = $("#firstPlayerNumber");
var $secondPlayerNumber = $("#secondPlayerNumber");
var $firstPlayerSuit = $("#firstPlayerSuit");
var $secondPlayerSuit = $("#secondPlayerSuit");
var $winner = $("#winner");
var $player1Count = $("#player1count");
var $player2Count = $("#player2count");
var number1;
var number2;
var suit1;
var suit2;
var numberImg1;
var numberImg2;

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
  firstPlayer.push(cards[i]);
}

cards.splice(0, half);

secondPlayer = cards;

$player1Count.html(firstPlayer.length);
$player2Count.html(secondPlayer.length);

function endGame() {

if(firstPlayer.length == 0) {
  $winner.html("GAME OVER </br> Player Two Wins </br> Player One has no more cards to play.");
}
if(secondPlayer.length == 0) {
  $winner.html("GAME OVER </br> Player One Wins </br> Player Two has no more cards to play.");
}
  $winner.css("color", "red");
  $winner.css("font-weight", "bold");
  $("#end").ss("display", "none");
  $FirstPlayerNumber.html("");
  $secondPlayerNumber.html("");
  $draw.off();
}


function assign(){

  $firstPlayer.css("border-color", "black");
  $secondPlayer.css("border-color", "black");

if(firstPlayer.length == 0 || secondPlayer.length == 0) {
  endGame();
}

  $draw.on('click', function() {
    assign();
    })

  console.log("assign")
  $firstPlayerSuit.empty();
  $secondPlayerSuit.empty();

  $firstPlayerSuit.css("display", "block");
  $secondPlayerSuit.css("display", "block");

  number1=firstPlayer[0][0];
  number2=secondPlayer[0][0];

  $FirstPlayerNumber.html(number1);
  $secondPlayerNumber.html(number2);

  suit1 = firstPlayer[0][1];
  suit2 = secondPlayer[0][1];

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
    for (i=0; i<number1; i++) {
      $firstPlayerSuit.append(suit1);
    };
  } else {
    if (number1 == 11) {
      numberImg1 = "<img src='./images/jack.png'/>";
      $firstPlayerSuit.append(suit1);
      $firstPlayerNumber.html(numberImg1);
    }
    if (number1 == 12) {
      numberImg1 = "<img src='./images/queen.png'/>";
      $firstPlayerSuit.append(suit1);
      $firstPlayerNumber.html(numberImg1);
    }
    if (number1 == 13) {
      numberImg1 = "<img src='./images/king.png'/>";
      $firstPlayerSuit.append(suit1);
      $firstPlayerNumber.html(numberImg1);
    }
  }

  if (number2<11) {
    for (i=0; i<number2; i++) {
      $secondPlayerSuit.append(suit2);
    };
  } else {
    if (number2 == 11) {
      numberImg2 = "<img src='./images/jack.png'/>";
      $secondPlayerSuit.append(suit2);
      $secondPlayerNumber.html(numberImg2);
    }
    if (number2 == 12) {
      numberImg2 = "<img src='./images/queen.png'/>";
      $secondPlayerSuit.append(suit2);
      $secondPlayerNumber.html(numberImg2);
    }
    if (number2 == 13) {
      numberImg2 = "<img src='./images/king.png'/>";
      $secondPlayerSuit.append(suit2);
      $secondPlayerNumber.html(numberImg2);
    }
  }

  playedCards.push(firstPlayer[0]);
  playedCards.push(secondPlayer[0]);
  console.log(playedCards.length, "how many played");

  firstPlayer.splice(0,1);
  secondPlayer.splice(0,1);
  $player1Count.html(firstPlayer.length);
  $player2Count.html(secondPlayer.length);

  console.log("call greater");
  greater();
}

function war() {
  $winner.html("This means war!");
  console.log("war");
  for (i=0; i<3; i++) {
    playedCards.push(firstPlayer[0]);
    playedCards.push(secondPlayer[0]);
    console.log(playedCards.length);
    firstPlayer.splice(0,1);
    secondPlayer.splice(0,1);
    $player1Count.html(firstPlayer.length);
    $player2Count.html(secondPlayer.length);
  }

      $firstPlayerSuit.css("display", "none");
      $secondPlayerSuit.css("display", "none");

      numberImg1 = "<img stlye='height:14rem;' src='./images/card.png'/>";
      $FirstPlayerNumber.html(numberImg1);
      numberImg2 = "<img stlye='height:14rem;' src='./images/card.png'/>";
      $secondPlayerNumber.html(numberImg2);

      var audio = new Audio('card.mp3');
        audio.play();

      setTimeout(function() {
        audio.play();
      }, 1000);
      setTimeout(function() {
        audio.play();
      }, 1800);
      setTimeout(function() {
        console.log("call assign");
        assign();
        audio.play();
      }, 2600);
}

function greater() {
  console.log("greater");
  console.log("in greater how many played", playedCards.length);
  if (number1 > number2)  {
    $winner.html("Player One Wins");
    $firstPlayer.css("border-color", "red");
    for (i=0; i<playedCards.length; i++) {
      firstPlayer.push(playedCards[i]);
  }
    $player1Count.html(firstPlayer.length);
      playedCards=[];
  } else if (number2 > number1){
        $winner.html("Player Two Wins");
    for (i=0; i<playedCards.length; i++) {
      secondPlayer.push(playedCards[i]);
  }
    $player2Count.html(secondPlayer.length);
    playedCards=[];
} else if (number1 == number2) {
  war();
}
}

$draw.on('click', function() {

    assign();

})

  playedCards = [];
  $player1Count.html(firstPlayer.length);
  $player2Count.html(secondPlayer.length);







/*
var list = ["apple", "banana", "orange"];

var L = list.length;

var fakeCards = [];

for(i=0; i<52; i++){
  fakeCards.push(i);
}

var passengers = [
  ["lee", "red", "grapes"],
  ["Dave", "blue", "oranges"]
];

list.join(", ");
$("#practice").append(list.join(", "));
*/