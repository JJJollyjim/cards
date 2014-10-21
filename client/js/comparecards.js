function compareCards(card1, card2) {
    var suits  = ["Spades", "Hearts", "Diamonds", "Clubs"];
    var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
    
    if (suits.indexOf(card1.suit) < suits.indexOf(card2.suit)) {
        return -1;
    } else if (suits.indexOf(card1.suit) > suits.indexOf(card2.suit)) {
        return 1;
    } else {
        // Suits are ==
        if (values.indexOf(card1.value) < values.indexOf(card2.value)) {
            return -1;
        } else if (values.indexOf(card1.value) > values.indexOf(card2.value)) {
            return 1;
        } else {
            // Suits and values are ==
            return 0;
        }
    }
}