import Game from './game.js';
const FPS = 30;

/** @type {HTMLCanvasElement} */
let canv = document.getElementById("gameCanvas");
let ctx = canv.getContext("2d");

let game = new Game(canv.width, canv.height);


// setup the game loop
setInterval(update, 1000 / FPS);


function update() {
    // Draw space
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, game.width, game.height);

    // Draw Triangular Ship
    game.ship.draw(ctx); 

    // Rotate Ship

    // Move Ship
    
}
