export default class Ship {
    constructor(game) {
        this.position = {
            x: game.width / 2,
            y: game.height / 2,
        };
        this.angle = 0.1 * Math.PI;

    }

    draw (ctx) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = Ship.RADIUS / 10;
        ctx.beginPath();
        // nose of the ship
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
}


// Ship Constant Static Variables
Ship.RADIUS = 15;