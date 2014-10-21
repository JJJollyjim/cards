var _;

function cardToString(value, suit) {
    var firstPart = value;
    if (value == "Ace")   firstPart = "A";
    if (value == "Jack")  firstPart = "J";
    if (value == "Queen") firstPart = "Q";
    if (value == "King")  firstPart = "K";
    
    var secondPart = "???("+suit+")";
    if (suit == "Spades")   secondPart = "♠";
    if (suit == "Hearts")   secondPart = "♥";
    if (suit == "Diamonds") secondPart = "♦";
    if (suit == "Clubs")    secondPart = "♣";

    return firstPart + secondPart;
}

function Card(value, suit, visible) {
    var self = this;
    
    // Save value and suit
    self.value   = value;
    self.suit    = suit;
    self.visible = visible;
    
    // Setup card rendering
    self.elem = document.createElement('div');
    self.elem.classList.add('card');
    if (visible) {
        self.elem.classList.add((suit == "Diamonds" || suit == "Hearts") ? 'card-colour-red' : 'card-colour-black');
        self.elem.innerHTML = cardToString(value, suit);
    } else {
        self.elem.classList.add("card-backwards");
    }
}