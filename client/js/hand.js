// Depends on card.js, comparecards.js
var Card, compareCards, Hammer, onUserChoosesToRemoveCard;

function HandCard(value, suit, visible) {
    var self = this;
    
    // Call parent constructor
    Card.call(this, value, suit, visible);
    
    // Reference to hand the card is in (adjusted by Hand#addCard and Hand#removeCard)
    self.hand = null;
    
    // Add special styling for hand cards
    self.elem.classList.add('card-hand');
    
    // What time is it? It's...
    var hammertime = new Hammer(self.elem);
    
    hammertime.on('doubletap', function(ev) {
        self.hand.removeCard(self);
        onUserChoosesToRemoveCard(self);
    });
}

HandCard.prototype = Object.create(Card.prototype, {});
HandCard.prototype.constructor = HandCard;

function Hand() {
    var self = this;
    
    // Setup element
    self.elem = document.createElement('div');
    self.elem.classList.add('hand');
    document.body.appendChild(self.elem);
    
    // List of cards in hand
    self.cards = [];
    
    self.addCard = function(newCard) {
        // Card will get added to hand either way, so set its hand now
        newCard.hand = self;
        
        for (var i = 0; i < self.cards.length; i++) {
            var comparisonCard = self.cards[i];
            
            var comparison = compareCards(comparisonCard, newCard);
            if (comparison === 0 || comparison === 1) {
                // Add to array
                self.cards.splice(i, 0, newCard);
                
                // Add to DOM
                self.elem.insertBefore(newCard.elem, comparisonCard.elem);
                
                return;
            }
        }
        
        // Add to end of array
        self.cards.push(newCard);
        
        // Add to end of DOM
        self.elem.appendChild(newCard.elem);
    };
    
    self.removeCard = function(card) {
        // Remove card from DOM
        self.elem.removeChild(card.elem);
        
        // Remove card from array
        self.cards.splice(self.cards.indexOf(card), 1);
    };
}
