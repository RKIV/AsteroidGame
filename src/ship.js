export default class Ship {
    constructor(game) {
        this.game = game;
        this.position = {
            x: game.width / 2,
            y: game.height / 2,
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.thrusting = false;
        this.angle = 0.1 * Math.PI; // In Radians
        this.angularSpeed = 0;

    }

    update() {
        // Rotate Ship
        this.angle += this.angularSpeed;
        if(this.thrusting) {
            this.velocity.x += Ship.THRUST * Math.cos(this.angle) / this.game.FPS;
            this.velocity.y += Ship.THRUST * Math.sin(this.angle) / this.game.FPS;
        }
        this.velocity.x *= Ship.DECELERATION;
        this.velocity.y *= Ship.DECELERATION;
        this.position.x += this.velocity.x;
        this.position.y -= this.velocity.y;
        
    }

    draw (ctx) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = Ship.RADIUS / 10;
        ctx.beginPath();
        // Nose of the ship
        ctx.moveTo(
            this.position.x + (4 / 3) *Ship.RADIUS * Math.cos(this.angle),
            this.position.y - (4 / 3) * Ship.RADIUS * Math.sin(this.angle)
        );
        // Rear Left
        ctx.lineTo(
            this.position.x - Ship.RADIUS * ((2 / 3) * Math.cos(this.angle) + Math.sin(this.angle)),
            this.position.y + Ship.RADIUS * ((2 / 3) * Math.sin(this.angle) - Math.cos(this.angle))
        );
        // Just Below Center
        ctx.lineTo(
            this.position.x - Ship.RADIUS * Math.cos(this.angle) / 3,
            this.position.y + Ship.RADIUS * Math.sin(this.angle) / 3
        );
        // Rear Right
        ctx.lineTo(
            this.position.x - Ship.RADIUS * ((2 / 3) * Math.cos(this.angle) - Math.sin(this.angle)),
            this.position.y + Ship.RADIUS * ((2 / 3) * Math.sin(this.angle) + Math.cos(this.angle))
        );
        ctx.closePath();
        ctx.stroke();

        // Dot At Center
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x - 1, this.position.y - 1, 2, 2);
    }

    turnLeft(){ this.angularSpeed = Ship.TURN_SPEED / this.game.FPS; }

    turnRight(){ this.angularSpeed = -Ship.TURN_SPEED / this.game.FPS; }

    stopTurn(){ this.angularSpeed = 0; }
}


// Ship Constant Static Variables
Ship.RADIUS = 15;
Ship.TURN_SPEED = 2 * Math.PI // radians/sec
Ship.THRUST = 5; // Acceleration in pixels/sec^2
Ship.DECELERATION = 0.99;