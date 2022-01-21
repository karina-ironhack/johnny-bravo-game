const gameBoard = document.getElementById("board");

class Game {
  constructor() {
    this.obstaclesArray = []
    this.timer = 0;
  }

  start() {
    // create player
    this.player = new Player();
    this.player.domElement = this.createElm(this.player);
    this.drawElm(this.player);
    this.addEventListeners();

    setInterval(() => {
        this.timer++;

        if (this.timer % 3 === 0 ) {
          // create obstacle
          const newObstacle = new Obstacle();
          this.obstaclesArray.push(newObstacle)
          newObstacle.domElement = this.createElm(newObstacle);
          this.drawElm(newObstacle)
        }

        // move obstacles in obstacle array
        this.obstaclesArray.forEach((elm) => {
          elm.moveDown();
          this.drawElm(elm);
          this.detectCollision(elm);
          elm.removeObstacle(this.obstaclesArray, elm);
        })
        console.log(this.obstaclesArray)
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

  detectCollision(elm) {
    if (this.player.positionX < elm.positionX + elm.width && 
      this.player.positionX + this.player.width > elm.positionX &&
      this.player.positionY < elm.positionY + elm.height && 
      this.player.positionY + this.player.height > elm.positionY
    ) {
      alert('game over')
    }
  }
}

class Player {
  constructor() {
    this.className = 'player';
    this.positionX = 0;
    this.positionY = 0;
    this.height = 10;
    this.width = 4;
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

class Obstacle extends Player {
  constructor(height, width, domElement) {
    super(height, width, domElement)
    this.className = 'obstacle';
    this.positionX = Math.floor(Math.random() * 55);
    this.positionY = 90;
    this.width = 3;
  }
  moveDown() {
    this.positionY -= 10;
  }
  removeObstacle(arr, elm) {
    if(elm.positionY < 0) {
      elm.domElement.remove();
      arr.shift(elm);
    }
  }
}
const game = new Game();
game.start();
