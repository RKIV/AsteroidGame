import Ship from './ship.js';

export default class Game {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.ship = new Ship(this);
    }

    start() {

    }
}