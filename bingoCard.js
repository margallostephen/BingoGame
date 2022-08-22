class BingoCard {

    constructor(id) {
        this.id = id;
        this.matrix = [[], [], [], [], []];
    }

    generateMatrix() {
        let randomNumbers = [],
            minNum = [1, 15, 30, 45, 60],
            maxNum = [16, 31, 46, 61, 76];

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let number = Math.floor(Math.random() * (maxNum[j] - minNum[j]) + minNum[j]);

                if (randomNumbers.indexOf(number) != -1) {
                    j--;
                } else {
                    randomNumbers.push(number);
                    this.matrix[i][j] = number;
                }
            }
        }
    }

    drawCard() {
        let letterID = ['B', 'I', 'N', 'G', 'O'],
            newCard = `<table><tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th></tr>`;

        for (let i = 0; i < 5; i++) {
            newCard += `<tr>`;

            for (let j = 0; j < 5; j++) {
                if (this.matrix[j][i] != this.matrix[2][2]) {
                    newCard += `<td class='bingoCell' id='${this.id}${letterID[j]}${i}'>${this.matrix[i][j]}</td>`;
                } else {
                    newCard += `<td style='background-color: yellow; border-color: black;' id='${this.id}${letterID[j]}${i}'>Free</td>`;
                }
            }

            newCard += `</tr>`;
        }

        newCard += `</table>`;

        return newCard;
    }
}