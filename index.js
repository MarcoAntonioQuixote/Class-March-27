

// Goal: Build a game of war


// build a deck, build 52 cards (each with a value and a suit)


class GameOfWar {
    constructor() {
        this.deck = []
        this.players = []
        this.initGame();
        this.playGame();
    }

    initGame() {
        class Card {
            constructor(suit, face, value) {
                this.value = value;
                this.suit = suit;
                this.face = face;
            }
        }
        
        let suits = ['❤️','🍀','💎','🗡️']
        let ranks = [2,3,4,5,6,7,8,9,10,'J','Q','K','A']
        
        for (let suit of suits) {
            for (let x = 0; x < 13; x++) {
                let card = new Card(suit,ranks[x],x+2)
                this.deck.push(card)
            }
        }
        //combine with shuffle function

        function shuffle(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        shuffle(this.deck)

        // make players - name, hand, first(?), score
        class Player {
            constructor(name) {
                this.name = name;
                this.hand = [];
                this.score = 0;
            }
        }

        for (let x = 0; x < 2; x++) {
            let player = new Player(`Player${x+1}`)
            player.hand = this.deck.splice(0,26)
            this.players.push(player)
        }

        // shuffle(this.players)

    }

    playGame() {
        console.log(this.players)
        // players show top card from deck (AND DRAW IF TIME)
            // we need to loop 26 times 
        for (let x = 0; x < 26; x++) {
            let p1Card = this.players[0].hand[x];
            let p2Card = this.players[1].hand[x];
            console.log(p1Card,p2Card)

            if (p1Card.value > p2Card.value) {
                console.log(`Player 1 gets a point`)
            } 
        }
        
            // show each player's current top card at each loop
        
        
        
        
        
        
        // player with higher card wins point
        
        
        // determine the winner (player with most points)
    }

}

let game = new GameOfWar();






// restart (game)


