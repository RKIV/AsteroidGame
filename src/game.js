import Ship from './ship.js';
import Camera from './camera.js';
import Asteroid from './asteroid.js'

export default class Game {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.ship = new Ship(this);
        this.camera = new Camera(this);
        this.asteroid = new Asteroid(this, {x: 300, y: 300}, 0, 80);
        this.FPS = 30;
    }

    update() {
        this.ship.update();
        this.camera.update();
        // console.log(this.camera.position);
    }

    draw(ctx) {
        ctx.clearRect(this.camera.position.x - this.width / 2, this.camera.position.y - this.height / 2, this.width, this.height);
        // Draw space
        ctx.fillStyle = "#000";
        ctx.fillRect(this.camera.cornerPosition.x, this.camera.cornerPosition.y, this.width, this.height);
        this.camera.draw(ctx);

        // Draw Triangular Ship
        this.ship.draw(ctx);
        this.asteroid.draw(ctx);

    }

    start() {

    }
}