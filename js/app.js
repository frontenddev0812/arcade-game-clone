// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -50
        this.speed = 50 + Math.floor(Math.random() * 100);
    }
};
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt) {
    // Collision detection
    for (let enemy of allEnemies) {
        let dx = this.x - enemy.x - 15;
        let dy = this.y - enemy.y - 20;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 56) {
            console.log('hit');
            this.y = 400;
            this.x = 200;
        }
    }
    // Did player win
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y < 5) {
        setTimeout(function() { alert("You Won!"); }, 10);
    }
};



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

let enemyStart = [75, 150, 240];

const player = new Player();

enemyStart.forEach(function(start) {
    let newEnemy = new Enemy(-1, start, 100 + Math.floor(Math.random() * 300));
    allEnemies.push(newEnemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});



Player.prototype.handleInput = function(dt) {
    switch (dt) {
        case "up":
            this.y -= 80;
            break;
        case "down":
            this.y += 80;
            break;
        case "left":
            this.x -= 80;
            break;
        case "right":
            this.x += 80;
            break;
    }
};