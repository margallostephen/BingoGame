function checkUserInput() {
    if (/^\s*$/.test(num.value)) {
        num.setCustomValidity('Invalid, please input a number.');
        return;
    }

    if (!/^\d+$/.test(num.value) || num.value == 0) {
        num.setCustomValidity('Invalid, please input a natural numbers only.');
        return;
    }

    return true;
}

let draw,
    bingo = false,
    bingoCardsCreated = 0;

function createBingoCard() {
    if (checkUserInput()) {
        for (let i = 0; i < num.value; i++) {
            let bingoCard = new BingoCard(i);
            bingoCard.generateMatrix();
            bingoCards.innerHTML += bingoCard.drawCard();
            bingoCardsCreated++;
        }

        num.value = '';
        formBox.style.display = 'none';
        drawBox.style.display = 'block';
        ballDrawnHistory.style.display = 'block';
        draw = new BallDraw();
    }
}

drawButton.addEventListener('mousedown', () => {
    let drawnNum = draw.drawBall();

    if (drawnNum < 16) {
        drawnOutput.innerText = `B - ${drawnNum}`;
    } else if (drawnNum < 31) {
        drawnOutput.innerText = `I - ${drawnNum}`;
    } else if (drawnNum < 46) {
        drawnOutput.innerText = `N - ${drawnNum}`;
    } else if (drawnNum < 61) {
        drawnOutput.innerText = `G - ${drawnNum}`;
    } else {
        drawnOutput.innerText = `O - ${drawnNum}`;
    }

    draw.markCards();
});

function checkMarkedCell(cells) {
    let isAllMarked = true;

    for (let cell of cells) {
        let color = cell.style.backgroundColor;

        if (color != 'yellow') {
            isAllMarked = false;
            break;
        }
    }

    if (isAllMarked) {
        for (let cell of cells) {
            cell.style.backgroundColor = 'rgb(255, 132, 0)';
        }
    }

    return isAllMarked;
}

drawButton.addEventListener('mouseup', () => {
    let cells = [],
        letterID = ['B', 'I', 'N', 'G', 'O'];

    for (let table = 0; table < bingoCardsCreated; table++) {
        let tableCells = [[], [], [], [], []];

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let currentCell = document.getElementById(`${table}${letterID[j]}${i}`);
                tableCells[j][i] = currentCell;
            }
        }

        for (let timesCheck = 0; timesCheck < 3; timesCheck++) {
            switch (timesCheck) {
                case 0:
                    for (let i = 0; i < 5; i++) {
                        for (let j = 0; j < 5; j++) {
                            cells[j] = tableCells[i][j];
                        }

                        if (checkMarkedCell(cells)) {
                            drawButton.disabled = true;
                            alert('BINGO!');
                            bingo = true;
                        }
                    }

                    break;

                case 1:
                    for (let i = 0; i < 5; i++) {
                        for (let j = 0; j < 5; j++) {
                            cells[j] = tableCells[j][i];
                        }

                        if (checkMarkedCell(cells)) {
                            drawButton.disabled = true;
                            alert('BINGO!');
                            bingo = true;
                        }
                    }

                    break;

                case 2:
                    for (let i = 0; i < 2; i++) {
                        switch (i) {
                            case 0:
                                cells[0] = tableCells[0][0];
                                cells[1] = tableCells[1][1];
                                cells[3] = tableCells[3][3];
                                cells[4] = tableCells[4][4];

                                break;

                            case 1:
                                cells[0] = tableCells[4][0];
                                cells[1] = tableCells[3][1];
                                cells[3] = tableCells[1][3];
                                cells[4] = tableCells[0][4];

                                break;
                        }

                        cells[2] = tableCells[2][2];

                        if (checkMarkedCell(cells)) {
                            drawButton.disabled = true;
                            alert('BINGO!');
                            bingo = true;
                        }
                    }

                    break;
            }
        }
    }
});

function resetMarks() {
    let cells = document.getElementsByTagName('td');

    for (let cell of cells) {
        cell.style.backgroundColor = 'white';
        cell.style.color = 'black';
        cell.style.borderColor = 'white';
    }
}

function resetGame() {
    if (bingoCardsCreated > 0) {
        let verify;

        if (!bingo) {
            verify = confirm('Are you sure you want to start a new game?');
        }

        if (bingo || verify) {
            bingo = false;
            drawButton.disabled = false;
            bingoCardsCreated = 0;
            drawnOutput.innerText = '0';
            bingoCards.innerHTML = '';
            formBox.style.display = '';
            drawBox.style.display = 'none';
            ballDrawnHistory.style.display = 'none';
            resetMarks();
        }
    }
}