// number of card divs to build
var cards = $('.cards');
function buildCards(e) {
    for(var i = 0; i < e; i++) {
        var cardLength = $('.cards > div').length;
        if (cardLength < e) {
            cards.append('<div id="card' + i + '" class="card"></div>');
        }
    }
}
buildCards(20);
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
    if (score === 2) {
        cards.addClass('level2');
        buildCards(25);
    } 

    if (score === 4) {
        cards.addClass('level3');
        buildCards(40);
    } 

    if (score === 6) {
        cards.addClass('level4');
        buildCards(50);
    } 

    if (score === 8) {
        cards.addClass('level5');
        buildCards(100);
    } 

    // console.warn($('.cards > div').length);
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
    // Check for then remove level classes
    // TODO: make this less clinky
    if (cards.hasClass('level2') || cards.hasClass('level3') || cards.hasClass('level4')) {
        cards.removeClass('level2 level3 level4 level5');
        // Resets the board and removes extra card divs
        $('.card').slice(20, $('.cards > div').length).remove();
    }
}

var score = 0;
// On click of a card either add a point for correct or
// end the game when incorrect
card.click(function() {
    $(this).addClass('selected');

    if ($('.chosen.selected').length === $('.chosen').length) {
        score ++;
        $('.text').fadeIn().html('<i class="fa fa-smile-o"></i>').delay(500).fadeOut();
        $('.score').text(score);
        setup();
    } else if ($(this).hasClass('chosen')) {
    } else {
        $('.text').fadeIn().html('<i class="fa fa-frown-o"></i> score: ' + score + '<br><i class="fa fa-refresh"></i>');
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
