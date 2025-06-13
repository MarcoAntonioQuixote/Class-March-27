function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}










class MemoryGame {
    constructor() {
        this.deck = []
        this.flipped = []
        this.player = 1;
        // this.url = 'get your own url here' //********* */
        this.initMemoryGame()
    }

    initMemoryGame() {

        let pokemon = []

        // let ids = [25,59,151,600,93,149]

        fetch(this.url)
            .then(res => res.json())
            .then(data => {
                this.makeDeck(data)
            })
    }

    makeDeck(pokemon) {
        class Card {
            constructor(pokemon) {
                this.url = pokemon.image;
                this.name = pokemon.name;
                this.type = pokemon.type;
                this.id = pokemon.id;
                this.faceUp = true;
            }
        }

        for (let p of pokemon) {
            this.deck.push(new Card(p),new Card(p))    
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
                let name = document.createElement('h2')
                let deleteBtn = document.createElement('button')
                deleteBtn.innerText = '⛔'
                deleteBtn.setAttribute('class','delete')
                deleteBtn.addEventListener('click', () => {
                    this.addFriend()
                })
                name.innerText = card.name
                image.src = card.url;
                image.setAttribute('class','cardImage')
                container.setAttribute('class', `card ${card.type}`)
                container.append(image,deleteBtn)

            } else {
                container.addEventListener('click', () => {
                    this.flipCard(card)
                })
                container.setAttribute('class','card')
            }

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

    addFriend() {

        let newFriend = {
            name: "Peter",
            image: 'https://alfabetajuega.com/hero/2025/03/spider-man-peter-parker-marvel-no-way-home-ucm.jpg?width=768&aspect_ratio=16:9&format=nowebp',
            type: 'bug'
        }

        fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(newFriend),
            headers: {'content-type': 'application/json'}
        })

        this.deck.push(newFriend);
        shuffle(this.deck)
        this.drawCards()

    }

    deleteFriend(friend) {
        
        fetch(`${this.url}/${friend.id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => console.log(data))

        this.deck = this.deck.filter(u => u.id !== friend.id)
        this.drawCards()
    }

}

let game = new MemoryGame();





