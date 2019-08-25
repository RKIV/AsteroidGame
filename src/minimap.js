export default class MiniMap {
    constructor(game) {
        this.game = game;
        this.scaling = 105 / 2100;

    }

    draw(ctx) {
        let topLeftCorner = {
            x: this.game.camera.position.x - this.game.width * 1.5,
            y: this.game.camera.position.y - this.game.height * 1.5
        };
        let topLeftCornerMini = {
            x: this.game.camera.position.x + this.game.width / 2 - 120,
            y: this.game.camera.position.y + this.game.height / 2 - 120
        }
        // Draw Border
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.rect(
            topLeftCornerMini.x,
            topLeftCornerMini.y,
            105,
            105);
        ctx.stroke();
        // Draw Ship
        ctx.fillStyle = "red";
        ctx.fillRect(topLeftCornerMini.x + (this.game.ship.position.x - topLeftCorner.x) * this.scaling, 
            topLeftCornerMini.y + (this.game.ship.position.y - topLeftCorner.y) * this.scaling,
            2, 2);
        // Draw every asteroid that is seen by minimap
        ctx.fillStyle = "white";
        this.game.asteroidCluster.forEach(chunk => {
            chunk.forEach(asteroid => {
                if((asteroid.position.x - topLeftCorner.x) * this.scaling >= 0 && (asteroid.position.x - topLeftCorner.x) * this.scaling <= 105 &&
                    (asteroid.position.y - topLeftCorner.y) * this.scaling >= 0 && (asteroid.position.y - topLeftCorner.y) * this.scaling <= 105)
                        ctx.fillRect(topLeftCornerMini.x + (asteroid.position.x - topLeftCorner.x) * this.scaling,
                                    topLeftCornerMini.y + (asteroid.position.y - topLeftCorner.y) * this.scaling,
                                    asteroid.radius * this.scaling,
                                    asteroid.radius * this.scaling);
            })
        })
    }
}