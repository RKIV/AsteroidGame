export default class Projectile {
    constructor(game, position, velocity) {
        this.game = game;
        this.position = {
            x: position.x,
            y: position.y
        };
        this.velocity = {
            x: velocity.x,
            y: velocity.y
        };
        this.markedForDeletion = false;
    }

    update() {
        this.position.x += this.velocity.x / this.game.FPS;
        this.position.y -= this.velocity.y / this.game.FPS;
        if(Math.abs(this.position.x - this.game.camera.position.x) > this.game.width / 2 ||
            Math.abs(this.position.y - this.game.camera.position.y) > this.game.height / 2){
                this.markedForDeletion = true;
            }
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x, this.position.y, 2, 2);
    }
}