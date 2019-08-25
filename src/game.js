import Ship from './ship.js';
import Camera from './camera.js';
import Asteroid from './asteroid.js'
import seedrandom from './seedrandom.js'

export default class Game {
    constructor(width, height, seed){
        // Initialization take from seedrandom.js by David Bau
        seedrandom(
            this,   // global window object
            [],     // pool: entropy pool starts empty
            Math,   // math: package containing random, pow, and seedrandom
            256,    // width: each RC4 output is 0 <= x < 256
            6,      // chunks: at least six RC4 outputs for each double
            52,     // digits: there are 52 significant digits in a double
            (typeof module) == 'object' && module,    // present in node.js
            (typeof define) == 'function' && define,  // present with an AMD loader
            'random'// rngname: name for Math.random and Math.seedrandom
            );
        this.seed = seed
        this.width = width;
        this.height = height;
        this.ship = new Ship(this);
        this.camera = new Camera(this);
        this.chunk = {
            x: 0,
            y: 0
        };
        this.asteroidClusters = this.loadCluster({x: 0, y: 0});
        this.FPS = 30;
        

    }

    update() {
        this.ship.update();
        this.camera.update();
        if(this.chunk.x != Math.floor(this.camera.position.x / this.width) || 
            this.chunk.y != Math.floor(this.camera.position.y / this.height)){
                this.chunk.x = Math.floor(this.camera.position.x / this.width);
                this.chunk.y = Math.floor(this.camera.position.y / this.height);
                this.asteroidClusters = this.loadCluster(this.chunk);
            }
    }

    draw(ctx) {
        ctx.clearRect(this.camera.position.x - this.width / 2, this.camera.position.y - this.height / 2, this.width, this.height);
        // Draw space
        ctx.fillStyle = "#000";
        ctx.fillRect(this.camera.cornerPosition.x, this.camera.cornerPosition.y, this.width, this.height);
        this.camera.draw(ctx);

        // Draw Triangular Ship
        this.ship.draw(ctx);
        this.asteroidClusters.forEach(cluster => {
            cluster.forEach(asteroid => {
                asteroid.draw(ctx);
            });
        });

    }

    start() {

    }

    generateAsteroids(chunk) {
        let asteroids = [];
        // Setting up seeding so any specific cunk will always generate in the same way
        Math.seedrandom(this.seed + chunk.x);
        Math.seedrandom(Math.floor(Math.random() * chunk.y * 1000));
        let numOfAsteroids = Math.ceil(Math.sqrt(Math.random()) * 10);
        console.log(chunk);

        for(let i = 0; i < numOfAsteroids; i++){
            let intersecting = true;
            let xPos;
            let yPos;
            while(intersecting) {
                intersecting = false;
                xPos = Math.floor(Math.random() * (this.width)) + chunk.x * this.width;
                yPos = Math.floor(Math.random() * (this.height)) + chunk.y * this.height;
                asteroids.forEach(asteroid => {
                    // Checking if this asteroid will interfere with one of the others
                    // assuming max radius.
                    if(Math.sqrt(Math.pow(asteroid.position.x - xPos, 2) + Math.pow(asteroid.position.y - yPos, 2)) <= asteroid.MAX_RADIUS * 2)
                        intersecting = true;
                });
            }
            asteroids.push(new Asteroid(this, {x: xPos, y: yPos}, Math.random(), Math.ceil(Math.random() * 25) + 15));
        }
        console.log(asteroids);
        return asteroids;
    }

    loadCluster(chunk) {
        let asteroidClusters = [];
        for(let r = -1; r < 2; r++) {
            for(let c = -1; c < 2; c++) {
                asteroidClusters.push(this.generateAsteroids({x: chunk.x + r, y: chunk.y + c}));
            }
        }
        return asteroidClusters;
    }
}