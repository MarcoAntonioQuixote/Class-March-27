function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Goal: Build a game of war


// build a deck, build 52 cards (each with a value and a suit)


class GameOfWar {
    constructor() {
        this.deck = []
        this.flipped = []
        this.player = 1;
        this.initMemoryGame()
    }

    initMemoryGame() {
        let urls = [
            'https://i.natgeofe.com/k/c022030e-f1aa-4ab3-ad56-fdcdd4a1d08b/125-animals-tiger.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Hydrochoeris_hydrochaeris_in_Brazil_in_Petr%C3%B3polis%2C_Rio_de_Janeiro%2C_Brazil_09.jpg/960px-Hydrochoeris_hydrochaeris_in_Brazil_in_Petr%C3%B3polis%2C_Rio_de_Janeiro%2C_Brazil_09.jpg',
            'https://wallpapers.com/images/featured/kitty-cat-pictures-nzlg8fu5sqx1m6qj.jpg',
            'https://st2.depositphotos.com/1007517/49565/i/450/depositphotos_495653244-stock-photo-siberian-husky-puppy-outdoors.jpg',
            'https://preview.redd.it/hvtqj0gb9yd41.jpg?width=640&crop=smart&auto=webp&s=0320afada2b7335d782bf58887aa0c54d13a6d43',
            'https://dialogue.earth/content/uploads/2020/05/little_elephant.jpg',
            'https://wallpaperaccess.com/full/536212.jpg',
            'https://www.zooborns.com/.a/6a010535647bf3970b019aff3cbff5970d-800wi',
            'https://i.pinimg.com/736x/e9/56/c3/e956c3b29a6f261b7bc8ed233aba0cf3.jpg',
            'https://hakaimagazine.com/wp-content/uploads/header-shark-miscarriages.jpg'

        ];
        class Card {
            constructor(url) {
                this.url = url;
                this.faceUp = false;
            }
        }

        for (let image of urls) {
            this.deck.push(new Card(image),new Card(image))    
        }
        shuffle(this.deck)
        this.drawCards();
    }

    drawCards() {
        const table = document.getElementById('table')
        table.innerHTML = ""
        
        for (let card of this.deck) {
            let container = document.createElement('div')
            
            if (card.faceUp) {
                let image = document.createElement('img')
                image.src = card.url;
                image.setAttribute('class','cardImage')
                container.append(image)
            } else {
                container.addEventListener('click', () => {
                    this.flipCard(card)
                })
            }

            container.setAttribute('class','card')
            table.append(container)
        }
    }

    flipCard(card) {

        if (this.flipped.length < 2) {
            this.flipped.push(card)
            card.faceUp = true;
            this.drawCards();
        } 
        
        if (this.flipped.length == 2) {
            let [card1,card2] = this.flipped;
            if (card1.url === card2.url) {
                console.log('A match!')
            } else {
                setTimeout(() => {
                    for (let card of this.flipped) {
                        card.faceUp = false;
                    }
                    this.flipped = []
                    this.drawCards();
                    this.player = this.player === 1 ? 2 : 1;
                    let turn = document.getElementById('playerTurn')
                    turn.innerText = `Player Turn: ${this.player}`
                },2000)
            }
        }
    }

}

let game = new GameOfWar();






// restart (game)


