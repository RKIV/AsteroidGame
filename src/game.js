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
        this.asteroidClusters = this.loadAsteroidCluster({x: 0, y: 0});
        this.FPS = 30;
        

    }

    update() {
        this.ship.update();
        this.camera.update();
        if(this.chunk.x != Math.floor(this.camera.position.x / this.width) || 
            this.chunk.y != Math.floor(this.camera.position.y / this.height)){
                this.chunk.x = Math.floor(this.camera.position.x / this.width);
                this.chunk.y = Math.floor(this.camera.position.y / this.height);
                this.asteroidClusters = this.loadAsteroidCluster(this.chunk);
            }
    }

    draw(ctx) {
        ctx.clearRect(this.camera.position.x - this.width / 2, this.camera.position.y - this.height / 2, this.width, this.height);
        // Draw space
        ctx.fillStyle = "#000";
        ctx.fillRect(this.camera.cornerPosition.x, this.camera.cornerPosition.y, this.width, this.height);
        ctx.strokeStyle = "white";
        ctx.lineWidth = Ship.RADIUS / 10;
        for(let r = -1; r < 2; r++) {
            for(let c = -1; c < 2; c++) {
                ctx.rect(this.chunk.x * this.width, this.chunk.y * this.height, this.width, this.height);
                ctx.stroke();
            }
        }
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

    // Generate random set of asteroids given a chunk of the same size as the screen
    loadAsteroidChunk(chunk) {
        let asteroids = [];
        // Setting up seeding so any specific chunk will always generate in the same way
        Math.seedrandom(this.seed + chunk.x + (chunk.y * this.seed * 2));
        let numOfAsteroids = Math.ceil(Math.sqrt(Math.random()) * 10);
        console.log(chunk);

        for(let i = 0; i < numOfAsteroids; i++){
            let intersecting = true;
            let xPos;
            let yPos;
            while(intersecting) {
                intersecting = false;
                xPos = Math.floor(Math.random() * (this.width - 20)) + chunk.x * this.width + 10;
                yPos = Math.floor(Math.random() * (this.height - 20)) + chunk.y * this.height + 10;
                asteroids.forEach(asteroid => {
                    // Checking if this asteroid will interfere with one of the others
                    // assuming max radius.
                    console.log(Math.sqrt(Math.pow(asteroid.position.x - xPos, 2) + Math.pow(asteroid.position.y - yPos, 2)) <= Asteroid.MAX_RADIUS * 2);
                    if(Math.sqrt(Math.pow(asteroid.position.x - xPos, 2) + Math.pow(asteroid.position.y - yPos, 2)) <= Asteroid.MAX_RADIUS * 2)
                        intersecting = true;
                });
                console.log("Intersecting: " + intersecting);
            }
            asteroids.push(new Asteroid(this, {x: xPos, y: yPos}, Math.random(), Math.ceil(Math.random() * (Asteroid.MAX_RADIUS - Asteroid.MIN_RADIUS)) + Asteroid.MIN_RADIUS));
        }
        return asteroids;
    }

    // Generate a 3x3 gid of chunks of asteroids surrounding the player
    // a.k.a a cluster of asteroids.
    loadAsteroidCluster(chunk) {
        console.log("Loading new Cluster");
        let asteroidClusters = [];
        for(let r = -1; r < 2; r++) {
            for(let c = -1; c < 2; c++) {
                asteroidClusters.push(this.loadAsteroidChunk({x: chunk.x + r, y: chunk.y + c}));
            }
        }
        return asteroidClusters;
    }
}