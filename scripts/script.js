"use strict";
const game = {
    title : 'The Hi-Low Game',
    isRunning : false,
    wasRunning : false,
    currentScreen : "splash-screen",
    currentModal: null,
    players : [],
    playerMode : 0,
    difficultyNumber : 0 ,
    secretNumber : 0,
    maxTrials : 10,
    activePlayer : 1,
    inactivePlayer:2,
    round : 1,
    scoreBoard : document.getElementById("score-board"),

    addplayer(playerObject){
        this.players.push(playerObject);
        let arrayLenght = this.players.length;
        const playerElement = document.createElement("section");
        playerElement.classList.add("player-display");
        playerElement.id = `player-${arrayLenght}`;
        this.scoreBoard.append(playerElement);
        const player = document.getElementById(`player-${arrayLenght}`);
        const playerName = document.createElement("div");
        const playerscore = document.createElement("div");
        playerName.id = `player-${arrayLenght}-name`;
        playerscore.id = `player-${arrayLenght}-score`;
        playerName.textContent = this.players[arrayLenght-1].playerName;
        playerscore.textContent = this.players[arrayLenght-1].playerScore;
        player.append(playerName);
        player.append(playerscore);
    },

    updateDom(){
        const playerScoreElement = document.getElementById(`player-${game.activePlayer}-score`); 
        playerScoreElement.textContent = this.players[this.activePlayer-1].playerScore;
    },

    switchScreen(screenName){
        $(`#${screenName}`).show().siblings().hide();

        if(screenName === "splash-screen"){
            $("#header-quit-button").hide().siblings().show();
            $("#playermode-button-group").show().siblings().hide();
            $("#content").removeClass("running");
            $(`#player-${game.activePlayer}`).removeClass("active");
        }

        else if(screenName === "computer-generate-screen"){
            $("#header-quit-button").hide().siblings().show();
            $("#playermode-button-group").show().siblings().hide();
            $("#content").removeClass("running");
            $(`#player-${game.activePlayer}`).removeClass("active");
            $("#start-button").hide();
            setTimeout(()=>{$("#start-button").show();},2000);


        }
        else if (screenName === "generate-screen"){
            $("#header-quit-button").show();
            $("#header-help-button").show();
            $("#header-reset-button").hide();
            $("#content").removeClass("running");
            $(`#player-${game.activePlayer}`).addClass("active");
            $("#confirmation").show().siblings().hide();
            $("#confirm-explain").text(`${this.players[game.activePlayer-1].playerName} please confirm you are not looking` )           
        }
        else if (screenName === "game-screen"){
            $("#header-quit-button").show();
            $("#header-help-button").show();
            $("#header-reset-button").hide();
            $("#game-screen-explain").text(`${this.players[game.activePlayer-1].playerName} please enter your guess between 1 and ${game.difficultyNumber}. You have only ${game.maxTrials} Attemps.`  )            
        }
        else if (screenName === "game-over-screen"){
            $("#guess-input").val("");
            $("#header-quit-button").show();
            $("#header-help-button").hide();
            $("#header-reset-button").hide();
            $("#content").removeClass("running");
            $(`#player-${game.activePlayer}`).removeClass("active");
            if(game.playerMode == 1){
                $("#play-again-button").show();
                $("#next-round-button").hide();
            }
            else if(game.playerMode == 2 && game.round % 2 === 0 ){
                $("#play-again-button").hide();
                $("#next-round-button").show();
                $("#next-round-button").text("Play Again");
            }
            else if(game.playerMode == 2 && game.round % 2 === 1){
                $("#play-again-button").hide();
                $("#next-round-button").show();
                $("#next-round-button").text("Next Round");
            }
        }
        this.currentScreen = screenName;
    },

    showModal(){
        if(game.currentScreen == "splash-screen" && game.currentModal == null){
            const myModal = new bootstrap.Modal('#setupModal', {
                keyboard: false
            });
            myModal.show();
            game.currentModal = myModal;
        }
        else if(game.currentScreen == "splash-screen" && game.currentModal != null){
            if(game.playerMode == 0) {
                const myModal = new bootstrap.Modal('#gameModal', {
                    keyboard: false
                });
                myModal.show();
                game.currentModal = myModal;
            }   

            else if(game.playerMode == 1) {
                const myModal = new bootstrap.Modal('#onePlayerModal', {
                    keyboard: false
                });

                myModal.show();
                game.currentModal = myModal;
            } 

            else if(game.playerMode == 2) {
                const myModal = new bootstrap.Modal('#twoPlayerModal', {
                    keyboard: false
                });
                myModal.show();
                game.currentModal = myModal;
            }
        }

        if((game.currentScreen == "game-screen" || game.currentScreen =="computer-generate-screen" ) && game.playerMode == 1){
                const myModal = new bootstrap.Modal('#onePlayerModal', {
                    keyboard: false
                });
                myModal.show();
                game.currentModal = myModal;
                game.toggleGame();
        }

        else if((game.currentScreen == "game-screen" || game.currentScreen =="generate-screen" ) && game.playerMode == 2){
            const myModal = new bootstrap.Modal('#twoPlayerModal', {
                keyboard: false
            });
            myModal.show();
            game.currentModal = myModal;
            game.toggleGame();
    }
    },

    toggleGame(){
        if (game.currentScreen == "game-screen"){
            if(game.isRunning){
                $("#play-pause-button").text("Resume");
                $("#content").removeClass("running");
                $(`#player-${game.activePlayer}`).removeClass("active");
                $("#submit-guess-button").prop("disabled", true);
                $(`p`).addClass("notActive");
                $(`h1`).addClass("notActive");
                game.wasRunning = true;
            }
            else{
                $("#play-pause-button").text("Pause");
                $("#content").addClass("running");
                $(`#player-${game.activePlayer}`).addClass("active");
                $("#submit-guess-button").prop("disabled", false);
                $(`p`).removeClass("notActive");
                $(`h1`).removeClass("notActive");
                game.wasRunning = false;
            }
            game.isRunning = !game.isRunning;
        }
    },

    swichPlayer(){
        if(game.activePlayer ===1){
            game.activePlayer = 2
            game.inactivePlayer = 1
        }
        else if(game.activePlayer === 2){
            game.activePlayer = 1
            game.inactivePlayer =2
        }
    },

    compareScore(){
        if(game.players[game.activePlayer-1].playerScore === game.players[game.inactivePlayer-1].playerScore){
            $("#player-compare-result").text("Both players win.");
        }
        else if(game.players[game.activePlayer-1].playerScore > game.players[game.inactivePlayer-1].playerScore){
            $("#player-compare-result").text(`${game.players[game.activePlayer-1].playerName } is the winner.`)
        }
        else if(game.players[game.activePlayer-1].playerScore < game.players[game.inactivePlayer-1].playerScore){
            $("#player-compare-result").text(`${game.players[game.inactivePlayer-1].playerName } is the winner.`)
        }
        game.players[game.activePlayer-1].playerTrials = 0;
        game.players[game.inactivePlayer-1].playerTrials = 0;
    },

    generateRandomNumber(){
        game.secretNumber = Math.floor(Math.random() * game.difficultyNumber) + 1;
    },
    
    checkGuess(){
        var guess = document.getElementById("guess-input").value;
        if (isNaN(guess) || guess < 1 || guess > game.difficultyNumber) {
            alert(`Please enter a valid number between 1 and ${game.difficultyNumber}.`);
            game.players[game.activePlayer-1].playerTrials++;
            $("#guess-result").text(`Attempt ${game.players[game.activePlayer-1].playerTrials}.`);
            return;
        }
        game.players[game.activePlayer-1].playerTrials++
    
        if (guess == game.secretNumber) {
            game.players[game.activePlayer-1].playerScore++
            game.updateDom();
                game.switchScreen("game-over-screen");
                $("#game-over-screen-explain").text(`Congratulations ${game.players[game.activePlayer-1].playerName}! You guessed the secret number in ${game.players[game.activePlayer-1].playerTrials} attempts.`);
                if(game.playerMode == 2 && game.round%2 === 0){
                    game.round++;
                    game.compareScore();
                }
                else if (game.playerMode == 2 && game.round%2 === 1){
                    game.round++;
                }
            
        } else if (guess < game.secretNumber) {
            $("#guess-result").text(`Attempt ${game.players[game.activePlayer-1].playerTrials}. Too low. Try again.`);
        } else if (guess > game.secretNumber){
            $("#guess-result").text(`Attempt ${game.players[game.activePlayer-1].playerTrials}. Too high. Try again.`);
        }
        if (game.players[game.activePlayer-1].playerTrials == game.maxTrials) {
                game.switchScreen("game-over-screen");
                $("#game-over-screen-explain").text(`Sorry ${game.players[game.activePlayer-1].playerName}, you've reached the maximum number of attempts. The secret number was ${game.secretNumber}.`);
            if(game.playerMode == 2 && game.round%2 === 0){
                game.round++;
                game.compareScore();
            }
            else if (game.playerMode == 2 && game.round%2 === 1){
                game.round++;
            }
        }
    },
    
    reset(){
        $(".player-display").detach();
        game.players = [];
        game.activePlayer = 1;
        game.isRunning = false;
        $("guess-result").text("");
        game.round = 1;
        game.switchScreen("splash-screen");
    },

    init(){
        $("#game-title").text(this.title);
        game.reset();
    }
}

// player class****************************************************************************

class Player {
    constructor(name){
        this.playerName = name;
        this.playerScore = 0;
        this.playerTrials = 0;
        game.addplayer(this);
    }

    addPlayerScore(score){
        this.playerScore = this.playerScore+score;
        // game.updateDom(this.playerScore);
    }
}

// buttons action********************************************************************
$(document).ready(() => {
    
    game.init();

    $("#one-player-button").on('click', () => {
        game.playerMode = 1;
        $("#playermode-button-group").hide();
        $("#player-form").show();
    });
    
    $("#header-reset-button").on('click', () => {
        game.switchScreen("splash-screen");
    });
    
    $("#two-player-button").on('click', () => {
        game.playerMode = 2;
        $("#player-form").show();
        $("#playermode-button-group").hide();
    });
    
    $("#player-join-button").on('click', () => {
        const playerName = document.getElementById("player-input").value;
        if (playerName ===''){
            alert("Please enter your name.")
        }
        
        else if (game.players.length < 3){
            new Player(playerName);
        }  

        if(game.playerMode === 2 && game.players.length === 2){
            $("#player-form").hide();
            $("#difficultymode-button-group").show();
        }
        else if(game.playerMode === 1 && game.players.length === 1){
            $("#player-form").hide();
            $("#difficultymode-button-group").show();
        }        
    });

    $("#easy-button").on('click', () => {
        game.difficultyNumber = 1024;
        if(game.playerMode === 1){
            $("#difficultymode-button-group").hide();
            game.switchScreen("computer-generate-screen");
        }
        else{
            game.switchScreen("generate-screen");
        }        
    });

    $("#medium-button").on('click', () => {
        game.difficultyNumber = 2048;
        if(game.playerMode === 1){
            $("#difficultymode-button-group").hide();
            game.switchScreen("computer-generate-screen");
        }
        else{
            game.switchScreen("generate-screen");
        }
    });

    $("#hard-button").on('click', () => {
        game.difficultyNumber = 4096;
        if(game.playerMode === 1){
            $("#difficultymode-button-group").hide();
            game.switchScreen("computer-generate-screen"); 
       }
        else{
            game.switchScreen("generate-screen");
        }
    });
    
    $("#confirm-button").on('click', () => {
        $("#number-explain").text(`${game.players[game.inactivePlayer-1].playerName} please enter a secret number between 1 and ${game.difficultyNumber}`)
        $("#number-input").show();
        $("#confirmation").hide();
    });

    $("#submit-number-button").on('click', () => {
        const secretNumber = document.getElementById("secret-number").value;
        if (isNaN(secretNumber) || secretNumber < 1 || secretNumber > game.difficultyNumber) {
            alert(`Please enter a valid number between 1 and ${game.difficultyNumber}.`);
        }
        else{
            game.secretNumber = secretNumber;
            $("#number-input").hide();
            $("#start-game-button").show();
        }        
    });
    
    $("#start-game-button").on('click', () => {
        game.isRunning = true;
        $("#content").addClass("running");
        $(`#player-${game.activePlayer}`).addClass("active");
        $("#start-game-button").hide();
        game.switchScreen("game-screen");
        $("#secret-number").val("");
    });
    
    $("#start-button").on('click', () => {
        game.isRunning = true;
        game.generateRandomNumber();
        $("#content").addClass("running");
        $(`#player-${game.activePlayer}`).addClass("active");
        $("#start-button").hide();
        game.switchScreen("game-screen");
    });

    $("#header-reset-button").on('click', () => {
        game.reset();       
    });

    $("#submit-guess-button").on('click', () => {
        game.checkGuess();       
    });

    $("#play-pause-button").on('click', () => {
        game.toggleGame();
    });

    $("#end-game-button").on('click', () => {
        game.isRunning = false;
        game.switchScreen("game-over-screen");
    });

    $("#play-again-button").on('click', () => {
        game.isRunning = true;
        $("#guess-result").text("");
        $("#game-over-screen-explain").text("");
        game.players[game.activePlayer-1].playerTrials = 0;
        game.switchScreen("computer-generate-screen");
    });

    $("#next-round-button").on('click', () => {
        $("#guess-result").text("");
        $("#player-compare-result").text("");
        game.swichPlayer();
        game.switchScreen("generate-screen");
    });
// quit buttons
    $("#quit-button").on('click', () => {
        game.reset();
    });

    $("#header-quit-button").on('click', () => {
        game.reset();
    });

// modal action
    $("#header-help-button").on('click', () => {
        game.showModal();
    });

    $(".btn-secondary").on('click', () => {
        game.currentModal = null;
        game.toggleGame();
        // if(game.wasRunning){
        // game.isRunning = true;
        // }   
    });
    
    $(".close").on('click', () => {
        game.currentModal = null;
        game.toggleGame();
        // if(game.wasRunning){
        // game.isRunning = true;
        // }   
    });

    $("#more-info-button").on('click', () => {
        game.showModal();
    });
}); 

    
