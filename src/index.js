import Game from './game.js';
import InputHandler from './input.js';

/** @type {HTMLCanvasElement} */
let canv = document.getElementById("gameCanvas");
let ctx = canv.getContext("2d");

let game = new Game(canv.width, canv.height);
let input = new InputHandler(game);


// setup the game loop
setInterval(update, 1000 / game.FPS);


function update() {
    game.update();
    game.draw(ctx);

    // Rotate Ship

    // Move Ship
    
}
