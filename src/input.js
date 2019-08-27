export default class InputHandler {
     constructor(game) {
         document.addEventListener("keydown", event => {
            switch(event.keyCode){
                // Left Arrow
                case 37:
                    game.ship.turnLeft();
                    break;
                // Up Arrow
                case 38:
                    game.ship.thrusting = true;
                    break;
                // Right Arrow
                case 39:
                    game.ship.turnRight();
                    break;
                // Space
                case 32:
                    game.ship.shootProjectile();
                    break;
            }
         })

         document.addEventListener("keyup", event => {
            switch(event.keyCode){
                // Left Arrow
                case 37:
                    game.ship.stopTurn();
                    break;
                // Up Arrow
                case 38:
                    game.ship.thrusting = false;
                    break;
                // Right Arrow
                case 39:
                    game.ship.stopTurn();
                    break;
            }
        })
     }
}