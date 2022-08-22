class BallDraw {

    constructor() {
        this.ballDrawns = [];
    }

    drawBall() {
        while (true) {
            let number = Math.floor(Math.random() * 75) + 1;

            if (this.ballDrawns.indexOf(number) == -1) {
                this.ballDrawns.push(number);
                return number;
            }
        }
    }

    markCards() {
        let cells = document.getElementsByTagName('td');

        for (let cell of cells) {
            for (let ball of this.ballDrawns) {
                if (cell.innerHTML == ball) {
                    cell.style.backgroundColor = 'rgb(0, 155, 226)';
                    cell.style.color = 'white';
                    cell.style.borderColor = 'black';

                    if (cell.classList.contains('bingoCell')) {
                        cell.style.backgroundColor = 'yellow';
                        cell.style.color = 'black';
                    }
                }
            }
        }
    }
}