var turnCounter = 1;
var symbols = ['DOG', 'CAT'];
var playersStates = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
var wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var isEnd = false;

document.getElementsByClassName('reset')[0].addEventListener("click", function(){
    reset();
});

function tdclick(num, e) {
	if (isEnd) {
		return;
	}
	console.log(num);
	var currentPlayer = playersStates[turnCounter % 2];
	if (clickCell(currentPlayer, num, e)) {
		if(checkWin(currentPlayer)) {
			winMessage();
			isEnd = true;
			winPicture();
		} else {
			turnCounter++;
			showMessage();
		}
	}
	if (turnCounter > 9) {
		draw();
		isEnd = true;
	}
}

function clickCell(player, num, e) {
	if (playersStates[0][num] || playersStates[1][num]) {
		document.getElementsByClassName('message')[0].innerText = "Already Clicked! Choose Another!";
		return false;
	}
	player[num] = 1;
	//e.target.innerText = symbols[turnCounter % 2];
	showPicture(num, e.target);
	return true;
}

function showMessage() {
	var message = document.getElementsByClassName('message');
	message[0].innerText = "Player " + symbols[turnCounter % 2] + "'s Turn Now!";
}

function checkWin(arr) {
  for (var i = 0; i < wins.length; i++) {
    if (arr[wins[i][0]] && arr[wins[i][1]] && arr[wins[i][2]]) {
      return true;
    }
  }
  return false;
}

function winMessage () {
	var winMessage = document.getElementsByClassName('message');
	winMessage[0].innerText = "Congratulations! Player " + symbols[turnCounter % 2] + " Wins! Click Reset to Play Again!";
}

function reset() {
	playersStates[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	playersStates[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	turnCounter = 1;
	document.getElementsByClassName('message')[0].innerText = "Welcome!";
	document.getElementsByClassName('win')[0].innerText = "";
	var allTds = document.getElementsByTagName("td");
	for (var i = 0; i < 9; i++) {
		allTds[i].innerHTML = "*";
	}
	if (isEnd) {
		document.getElementsByClassName('victory')[0].removeChild(document.getElementsByClassName('vicpic')[0]);
		isEnd = false;
	}
	
}

function draw() {
	var winMessage = document.getElementsByClassName('win');
	winMessage[0].innerText = "Draw! Please Click Reset to Play Again!";
}

function showPicture(num, target) {
	var image = document.createElement("img");
	image.alt = turnCounter.toString();
	image.src = "src/" + turnCounter + '.jpg';
	image.width = 250;
	image.height = 250;
	target.appendChild(image);
}

function winPicture() {
	var image = document.createElement("img");
	image.alt = turnCounter.toString();
	image.src = "src/w" + (turnCounter % 2) + '.jpg';
	image.width = 750;
	image.height = 500;
	image.className = 'vicpic';
	document.getElementsByClassName('victory')[0].appendChild(image);
}
