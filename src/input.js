export default class InputHandler {
     constructor() {
         document.addEventListener("keydown", event => {
            switch(event.keyCode){
                // Left Arrow
                case 37:
                    break;
                // Up Arrow
                case 38:
                    break;
                // Right Arrow
                case 39:
                    break;
            }
         })

         document.addEventListener("keyup", event => {
            
        })
     }
}