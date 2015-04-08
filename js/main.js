// Build 20 divs, 5 colums and 4 rows
var totalCards = 20;
var cards = $('.cards');
for(var i = 0; i < totalCards; i++) {
    cards.append('<div id="card' + i + '" class="card"></div>')
}
// Shuffle and return random cards to choose
function shuffle(array) {
    var r1 = array.length, r2, r3;

    while (r1) {
        r3 = Math.floor(Math.random() * r1--);

        r2 = array[r1];
        array[r1] = array[r3];
        array[r3] = r2;
    }
    return array;
}

var checkedCards = 1;
var card = $('.card');
var chosen = $(shuffle(card).slice(0, checkedCards));

// Setup the board by adding a random
// Chosen card and showing it briefly
function setup() {
    chosen = $(shuffle(card).slice(0, checkedCards));
    chosen.addClass('selected chosen');
    hide();
}

// Remove selected card(s)
function hide() {
    setTimeout(function(){ card.removeClass('selected') }, 1500);
}

// Clear the board to start a new game
function clear() {
    card.removeClass('chosen selected');
    score = 0;
    $('.score').text(score);
}

var score = 0;
// On click of a card either add a point for correct or
// end the game when incorrect
card.click(function() {
    $(this).addClass('selected');

    if ($('.chosen.selected').length == $('.chosen').length) {
        score ++;
        $('.text').fadeIn().text(':)').delay(500).fadeOut();
        $('.score').text(score);
        setup();
    } else if ($(this).hasClass('chosen')) {
    } else {
        $('.text').fadeIn().text(':( score: ' + score + ' - try again!');
        $(this).removeClass('selected');
        // Start a new game when game is over
        $('.text').click(function() {
            $('.text').fadeOut();
            clear();
            setup();
        });
    }
});

setup();
