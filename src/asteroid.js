export default class Asteroid {
    constructor(game, position, angle, radius) {
        this.game = game;
        this.position = position;
        this.angle = angle;
        this.radius = radius;
    }
    
    draw(ctx) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        ctx.moveTo(
            this.position.x + this.radius * Math.cos(this.angle),
            this.position.y + this.radius * Math.sin(this.angle)
        );
        for(let i = 1; i < 8; i++)
        {
            ctx.lineTo(
                this.position.x + this.radius * Math.cos(this.angle + i * Math.PI / 4),
                this.position.y + this.radius * Math.sin(this.angle + i * Math.PI / 4)
            );
        }

        ctx.closePath();
        ctx.stroke();
    }

    

}