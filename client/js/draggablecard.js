// Depends on card.js
var Card, Hammer, _;
function DraggableCard(value, suit, visible, startX, startY) {
    var self = this;
    
    // Call parent constructor
    Card.call(this, value, suit, visible);
    
    function updatePosition() {
        self.elem.style.left = self.x + "px";
        self.elem.style.top  = self.y + "px";
    }
    
    // Save card position
    this.x = startX;
    this.y = startY;
    
    // Place card on page
    updatePosition();

    // Special styling for draggable cards
    self.elem.classList.add('draggable');
    
    // Place card in page
    document.body.appendChild(this.elem);
        
    // It's hammertime!
    var mc = new Hammer.Manager(this.elem);
    mc.add(new Hammer.Pan({threshold: 5}));
    
    // In Chrome/Android, sometimes panmove is fired after panend. This means
    // that the position resetting in panend is overridden. That's why
    // currentlyPanning exists.
    var currentlyPanning = false;
    
    mc.on('panstart', function (ev) {
        // Add styling effects for cards currently being dragged
        self.elem.classList.add('materiyolo');
        
        currentlyPanning = true;
    });
    
    mc.on('panmove', _.throttle(function (ev) {
        if (currentlyPanning) {
            self.x = startX + ev.deltaX;
            self.y = startY + ev.deltaY;
            updatePosition();
        }
    }, 20));
    
    mc.on('panend', function (ev) {
        currentlyPanning = false;
        
        // Remove styling effects
        self.elem.classList.remove('materiyolo');
        
        self.x = startX;
        self.y = startY;
        updatePosition();
    });
}
DraggableCard.prototype = Object.create(Card.prototype, {});
DraggableCard.prototype.constructor = DraggableCard;
