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

    drawCard(cardNo) {
        let letterID = ['B', 'I', 'N', 'G', 'O'];
        let newCard = $("<table>")
            .append($("<tr>").append($(`<th colspan="5" id="${cardNo}">`).text(`Player ${cardNo} Card`)))
            .append($("<tr>").append(letterID.map(letter => $("<th>").text(letter))));

        for (let i = 0; i < 5; i++) {
            let row = $("<tr>");

            for (let j = 0; j < 5; j++) {
                let cell;
                if (this.matrix[j][i] != this.matrix[2][2]) {
                    cell = $("<td>").addClass("bingoCell").attr("id", `${this.id}${letterID[j]}${i}`).text(this.matrix[i][j]);
                } else {
                    cell = $("<td>").css({"background-color": "rgb(251, 236, 93)", "border-color": "black"}).attr("id", `${this.id}${letterID[j]}${i}`).text("Free");
                }
                row.append(cell);
            }

            newCard.append(row);
        }

        return newCard;
    }
}
