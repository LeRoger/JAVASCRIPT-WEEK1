


let randNumber;
let userInput;
let userPreviousInput;
let pastGuess =[];
let continueGame = true;
let winner = [];


// Constructor function for Player objects
function Player(rank, score, name) {
    this.name = name;
    this.score = score;
    this.rank = rank;
}


function saveWinner(rank, score, name){
  let myPlayer = new Player(rank, score, name);
  winner[winner.length] = myPlayer;
}


function rankWinner(){
  let rank = 0;
    let prevScore = -1;
    
    //sort array by score first
     winner.sort(function(a, b){
     return a.score-b.score;
     })
     
     // imcomplete code
     for(i=0; i<winner.length; i++){
      winner[i].rank = i+1;     
     }
}


function generateRandomNumber(){
  let randNum;
  // returns a random integer from 1 to 10
  randNum = Math.floor(Math.random() * 10) + 1;  
  return randNum;
}

function userPrompt(){

  let userInputRaw;
  let userInput;
  let loopExit = false;
  
  while (!loopExit) {
    userInputRaw = prompt('Please enter a number between 1 and 10.').trim();
    userInput = Number(userInputRaw);
    // validate user input
    if (isNaN(userInput) || (userInputRaw === '') || (userInput < 1 || userInput > 10)) {
      alert('The value you entered ' + userInputRaw + ' is not a number from 1 to 10.');  
    } else if (pastGuess.indexOf(userInput) != -1) {
      alert('The value you entered ' + userInput + ' was previously used. Please enter another number.');
    } else {
        pastGuess.push(userInput);
        loopExit = true;
    }
  }
  return userInput;
}

function checkAnswer(pUserInput,pRandomNumber,pPastGuess){

  let userInputRaw;
  let str = '************ High Scores*******************\n'+
        'Rank          Score          Name\n';
            
  let guessRemaining = (10 - pPastGuess.length);
  let userhint =  userHint(pUserInput,pRandomNumber,pPastGuess);
  
  if (pUserInput == pRandomNumber){
    alert('You got it right in ' + pPastGuess.length + ' tries.');
    
    userInputRaw = prompt('Please enter your name - up to 3 characters.').toUpperCase().trim();
    userInputRaw = userInputRaw.substr(0,3);
    
    saveWinner(1, pPastGuess.length, userInputRaw);
    rankWinner();   

    for(i=0; i<winner.length; i++){
      str = str + winner[i].rank + '                 ' +  winner[i].score + '                ' +  winner[i].name + '\n';
        if (i==10){
          break;
        } 
    }
    
    alert(str);
    return 1;
  } else {
      alert(userhint + 'Your previous guesses were ' + pPastGuess.join(', ') + '. You have ' + guessRemaining + ' guesses left.');
      if(guessRemaining == 0){
        alert('The random number was: ' + pRandomNumber);
      }
      return 0;
  }
}

function userHint(pUserInput,pRandomNumber,pPastGuess){
  
  let previousGuess;
    
  if(pPastGuess.length == 1){
    if(pUserInput > pRandomNumber){
      return 'You guessed too high. ';
    } else {
        return 'You guessed too low. ';
    }
  } else {
    previousGuess = pPastGuess[pPastGuess.length - 2];
    //alert(previousGuess);
    if(Math.abs(pRandomNumber - pUserInput) > Math.abs(pRandomNumber - previousGuess)){
      return 'Colder. ';
    }
    if(Math.abs(pRandomNumber - pUserInput) < Math.abs(pRandomNumber - previousGuess)){
      return 'Hotter. ';
    }
    if(Math.abs(pRandomNumber - pUserInput) == Math.abs(pRandomNumber - previousGuess)){
      return 'Neither hotter nor colder. ';
    }  
  }
}


randNumber = generateRandomNumber();

while(continueGame) {

  for(i=0; i<10;){

    userInput = userPrompt();
    if(checkAnswer(userInput,randNumber,pastGuess) == 1){
      break;
    }
    i++;
  }
        
  if (prompt('Another game? Y/N').toUpperCase() != 'Y') {
    continueGame = false;
  } else {
    //empty the history array for a new game
    pastGuess.length = 0;
  }
    
}


