function playGame(){
    let board = document.createElement('div');
    board.setAttribute('id', 'board');
    board = layCards(board);
    document.body.appendChild(board);
}

function yourTurn(board){
    const card1 = 0;
    const card2 = 0;

}

function layCards(board){
    let ids = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
    ids = shuffle(ids);
    for(let i = 0; i < ids.length; i++){
        const card = new Card(ids[i], board);
        if((i+1) % 5 == 0){
            const br = document.createElement('br');
            board.appendChild(br);
        }
    }
    return board;
}

class Card{
    constructor(id, board) {
        this.board = board;
        this.id = id;
        this.src = this.getImageSrc();
        this.image = document.createElement('img');
        this.createCard();
    }

    createCard(){
        this.image.setAttribute('id', this.id);
        this.image.setAttribute('src', 'Images/backgroundCard.png');
        this.image.onclick = this.turnCard;
        this.board.appendChild(this.image);
    }

    turnCard = () => {
        console.log('turned');
        this.image.setAttribute('src', this.src);
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