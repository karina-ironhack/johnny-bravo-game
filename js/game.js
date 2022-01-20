class Game {
  start() {
    this.player = new Player();
    this.player.domElement = this.createElm(this.player);
    this.drawElm(this.player);

    this.addEventListeners();

    this.obstaclesArray = []
    this.timer = 0;

    setInterval(() => {
        this.timer++;

        if (this.timer % 3 === 0 ) {
            // creating obstacle
            const newObstacle = new Obstacle();
            this.obstaclesArray.push(newObstacle)
            newObstacle.domElement = this.createElm(newObstacle);
            this.drawElm(newObstacle)
        }

        // move obstacles in obstacle array
        this.obstaclesArray.forEach((elm) => {
            elm.moveDown();
            this.drawElm(elm);
            // elm.remove(elm);

            if (elm.positionY <= 10) {
                this.obstaclesArray.shift(elm)
            }
        })
      }, 1000)
  }

  addEventListeners() {
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case 'ArrowRight':
                this.player.moveRight();
                break;
            case 'ArrowLeft':
                this.player.moveLeft();
        }
        this.drawElm(this.player);
    });
  }

  createElm(instance) {
    const htmlTag = document.createElement('div');
    htmlTag.className = instance.className;
    htmlTag.style.height = instance.height + 'vh';
    htmlTag.style.width = instance.width + 'vw';
    const board = document.getElementById('board');
    board.appendChild(htmlTag);
    return htmlTag;
  }

  drawElm(instance) {
    instance.domElement.style.left = instance.positionX + 'vw';
    instance.domElement.style.bottom = instance.positionY + 'vh';
  }
}

class Player {
  constructor() {
    this.className = 'player';
    this.positionX = 0;
    this.positionY = 0;
    this.height = 10;
    this.width = 10;
    this.domElement = null;
  }
  moveLeft() {
    if (this.positionX > 0) {
        this.positionX -= 5;
    } 
  }
  moveRight() {
    if (this.positionX < 55) {
        this.positionX += 5;
    }
  }
}

// class Obstacle extends Player {
//     constructor(height, width, domElement) {
//         super(height, width, domElement)
//         this.className = 'obstacle';
//         this.positionX = 30;
//         this.positionY = 80;
//     }
//     moveDown() {
//         setInterval(() => {
//             this.positionY -= 10;
//             console.log(this.positionY)
//         }, 1000)
//     }
// }

class Obstacle  {
    constructor() {
        this.className = 'obstacle';
        this.positionX = 30;
        this.positionY = 90;
        this.height = 10;
        this.width = 10;
        this.domElement = null;
    }
    moveDown() {
        if (this.positionY >= 10) {
            this.positionY -= 10;
        }
    }
    
    // remove() {
    //     game.removeChild(this.domElement)
    // }
}

const game = new Game();
game.start();
