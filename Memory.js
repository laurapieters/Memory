function playGame(){
    let board = new Board();
    // document.body.appendChild(board.makeBoard());
    document.getElementById("message").innerHTML = 'Turn first card';
    document.getElementById("nrOfTurns").innerHTML = 'Number of turns: '+0;
}

class Board{
    constructor(){
        this.cards = this.makeBoard();
        this.turnedCards = [];
        this.nrOfTurns = 0;
        this.firstClick = false;
        this.secondClick = false;
    }

    onTurnCallback = (card) => {
        if(this.firstClick){
            this.secondClick = true;
            setTimeout(() => {
                this.freezeAllCards();
            },1);
            this.firstClick = false;
        }else{
            this.firstClick = true;
            document.getElementById("message").innerHTML = 'Turn second card';
        }

        this.turnedCards.push(card);
        if (this.turnedCards.length === 2) {
            // check for match
            if (this.turnedCards[0].getId() === this.turnedCards[1].getId()) {
                setTimeout(() => {
                    document.getElementById("message").innerHTML = 'Match!';
                    setTimeout(() => {
                        this.unfreezeAllCards();
                        document.getElementById("message").innerHTML = 'Turn first card';
                    },1000);
                },500);
                this.turnedCards = [];
                this.nrOfTurns++;
                document.getElementById("nrOfTurns").innerHTML = 'Number of turns: '+this.nrOfTurns;
            } else {
                setTimeout(() => {
                    document.getElementById("message").innerHTML = 'no match :(';
                },5000);
                setTimeout(() => {
                    this.turnedCards[0].turnBack();
                    this.turnedCards[1].turnBack();
                    this.turnedCards = [];
                    document.getElementById("message").innerHTML = 'Turn first card';
                    this.unfreezeAllCards();
                },5000);
                this.nrOfTurns++;
                document.getElementById("nrOfTurns").innerHTML = 'Number of turns: '+this.nrOfTurns;
            }
        }
    }

    freezeAllCards(){
        for(let i = 0; i < this.cards.length; i++){
            this.cards[i].freezeCard();
        }
    }

    unfreezeAllCards(){
        for(let i = 0; i < this.cards.length; i++){
            this.cards[i].unfreezeCard();
        }
    }

    makeBoard(){
        const cards = [];
        let board = document.createElement('div');
        board.setAttribute('id', 'board');
        let ids = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
        ids = shuffle(ids);
        for(let i = 0; i < ids.length; i++){
            const card = new Card(ids[i],this.onTurnCallback);
            cards.push(card);
            board.appendChild(card.createCard());
            if((i+1) % 5 == 0){
                const br = document.createElement('br');
                board.appendChild(br);
            }
        }
        document.body.appendChild(board);
        return cards;
        // this.cards = cards;
    }

}

class Card{
    constructor(id, onTurnCallback) {
        this.id = id;
        this.src = this.getImageSrc();
        this.image = document.createElement('img');
        this.onTurnCallback = onTurnCallback;
    }

    createCard(){
        this.image.setAttribute('data-id', this.id);
        this.image.setAttribute('src', 'Images/backgroundCard.png');
        this.image.onclick = this.turnCard;
        return this.image;
    }

    turnCard = () => {
        this.image.setAttribute('src', this.src);
        this.image.setAttribute('class', 'turn');
        this.freezeCard()
        this.onTurnCallback(this);
    }

    getId(){
        return this.id;
    }

    freezeCard(){
        this.image.onclick = null;
    }

    unfreezeCard(){
        this.image.onclick = this.turnCard;
    }

    turnBack(){
        this.image.setAttribute('src', 'Images/backgroundCard.png');
        this.unfreezeCard()
    }

    getImageSrc(){
        let src = '';
        switch(this.id) {
            case 1:
                src = 'Images/hut-gloves512+.png';
                break;
            case 2:
                src = 'Images/cookies512+.png';
                break;
            case 3:
                src = 'Images/candles512+.png';
                break;
            case 4:
                src = 'Images/socks512+.png';
                break;
            case 5:
                src = 'Images/santa-chimney512+.png';
                break;
            case 6:
                src = 'Images/gift512+.png';
                break;
            case 7:
                src = 'Images/fireplace512+.png';
                break;
            case 8:
                src = 'Images/santa512+.png';
                break;
            case 9:
                src = 'Images/christmas-hut512+.png';
                break;
            case 10:
                src = 'Images/snowman512+.png';
                break;
        }
        return src;
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}