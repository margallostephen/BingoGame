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
        let cells = $('td');

        for (let cell of cells) {
            for (let ball of this.ballDrawns) {
                if ($(cell).text() == ball) {
                    $(cell).css({
                        'background-color': '#4a90e2',
                        'color': 'white',
                        'border-color': 'black'
                    });

                    if ($(cell).hasClass('bingoCell')) {
                        $(cell).css({
                            'background-color': 'rgb(251, 236, 93)',
                            'color': 'black'
                        });
                    }
                }
            }
        }
    }
}
