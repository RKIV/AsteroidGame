export default class Camera{
    constructor(game) {
        this.game = game;
        this.position = {
            x: game.width / 2,
            y: game.height / 2
        };
        this.cornerPosition = {
            x: 0,
            y: 0
        };
        this.velocity = {
            x: 0,
            y: 0
        };
    }
    
    update(){
        let xDiff = this.game.ship.position.x - this.position.x;
        let yDiff = this.game.ship.position.y - this.position.y;
        this.velocity.x = Math.sign(xDiff) * Math.pow(Math.abs(xDiff), 2) / 100;
        this.velocity.y = Math.sign(yDiff) * Math.pow(Math.abs(yDiff), 2) / 100;
        
    }

    draw(ctx) {
        this.position.x += this.velocity.x / this.game.FPS;
        this.position.y += this.velocity.y / this.game.FPS;
        this.cornerPosition.x = this.position.x - this.game.width / 2;
        this.cornerPosition.y = this.position.y - this.game.height / 2;
        ctx.translate(-1 * this.velocity.x / this.game.FPS, -1 * this.velocity.y / this.game.FPS);
    }
}