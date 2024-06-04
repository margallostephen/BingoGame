let draw,
    num = $('#num'),
    bingo = false,
    bingoCardsCreated = 0;

function checkUserInput() {
    const input = num.val().trim();

    if (/^\s*$/.test(input)) {
        return num[0].setCustomValidity('Please input a number.');
    }

    if (!/^\d+$/.test(input) || input == 0) {
        return num[0].setCustomValidity('Please input a valid number.');
    }

    return true;
}

function createBingoCard() {
    if (checkUserInput()) {
        for (let i = 0; i < num.val(); i++) {
            let bingoCard = new BingoCard(i);
            bingoCard.generateMatrix();
            $('#bingoCards').append(bingoCard.drawCard(i + 1));
            bingoCardsCreated++;
        }

        num.val('');
        $('#formBox').hide();
        $('#drawBox, #ballDrawnHistory').show();
        draw = new BallDraw();
    }
}

$('#drawButton').on('mousedown', () => {
    let drawnNum = draw.drawBall();
    let drawnOutput = $('#drawnOutput');

    if (drawnNum < 16) {
        drawnOutput.text(`B - ${drawnNum}`);
    } else if (drawnNum < 31) {
        drawnOutput.text(`I - ${drawnNum}`);
    } else if (drawnNum < 46) {
        drawnOutput.text(`N - ${drawnNum}`);
    } else if (drawnNum < 61) {
        drawnOutput.text(`G - ${drawnNum}`);
    } else {
        drawnOutput.text(`O - ${drawnNum}`);
    }

    draw.markCards();
});

function checkMarkedCell(cells) {
    if (cells.every(cell => $(cell).css('background-color') === 'rgb(251, 236, 93)')) {
        cells.forEach(cell => $(cell).css('background-color', '#FFBF00'));
        return true;
    }
    return false;
}

$('#drawButton').on('mouseup', () => {
    let winnerCards = [],
        letterID = ['B', 'I', 'N', 'G', 'O'];

    const checkWin = (cells, cardNumber) => {
        if (checkMarkedCell(cells)) {
            $('#drawButton').prop('disabled', true);
            winnerCards.push(cardNumber);
        }
    };

    for (let table = 0; table < bingoCardsCreated; table++) {
        let cardNumber = table + 1;
        let tableCells = Array.from({ length: 5 }, (_, i) =>
            Array.from({ length: 5 }, (_, j) => $(`#${table}${letterID[j]}${i}`)[0])
        );

        for (let i = 0; i < 5; i++) {
            checkWin(tableCells[i], cardNumber);
            checkWin(tableCells.map(row => row[i]), cardNumber);
        }

        checkWin(tableCells.map((row, i) => row[i]), cardNumber);
        checkWin(tableCells.map((row, i) => row[4 - i]), cardNumber);
    }

    if (winnerCards.length > 0) {
        $(`#${winnerCards[0]}`).get(0).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    
        const formatWinnerCards = winnerCards => winnerCards.length < 2 ? winnerCards[0] : `${winnerCards.slice(0, -1).join(', ')} and ${winnerCards.slice(-1)}`;
    
        Swal.fire({
            title: `BINGO! <br> Player ${formatWinnerCards(winnerCards)} Card Win.`,
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false
        });
    }
    
});

function proceedWithReset() {
    bingo = false;
    $('#drawButton').prop('disabled', false);
    bingoCardsCreated = 0;
    $('#drawnOutput').text('0');
    $('#bingoCards').empty();
    $('#formBox').show();
    $('#drawBox, #ballDrawnHistory').hide();
    $('td').css({
        'background-color': 'white',
        'color': 'black',
        'border-color': 'white'
    });
}

function resetGame() {
    if (bingoCardsCreated > 0)
        !bingo ?
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to start a new game?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, start new game!'
            }).then(result => {
                if (result.isConfirmed) proceedWithReset();
            }) : proceedWithReset();
}
