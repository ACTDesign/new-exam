const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.querySelector(".highscore");
let highScore = parseInt(localStorage.getItem("highScore"));
const resetScore = document.querySelector(".reset-game");

canvas.height = 500;
canvas.width = 500;

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

if (isNaN(highScore)) {
  highScore = 0;
}
scoreDisplay.innerHTML = `highScore: ${highScore}`;

resetScore.addEventListener("click", () => {
  localStorage.setItem("highScore", "0");
  score = 0;
  scoreDisplay.innerHTML = "High score: 0";
  drawEnemies();
});

function keyDownHandler(e) {
  if (e.key == "Rght" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

let score = 0;

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "green";
  ctx.fillText("Player score :" + score, 0, 20);
}

function moveBoard() {
  if (rightPressed) {
    board.x += 7;
    if (board.x + board.width >= canvas.width) {
      board.x = canvas.width - board.width;
    }
  } else if (leftPressed) {
    board.x -= 7;
    if (board.x < 0) {
      board.x = 0;
    }
  }
}

let ball_speed = 3;

let ball = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  dx: ball_speed,
  dy: -ball_speed + 1,
  radius: 7,

  draw: function () {
    ctx.beginPath();
    ctx.fillStyle = "#000300";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.closePath();
    ctx.fill();
  },
};

let board = {
  height: 10,
  width: 76,
  x: canvas.width / 2 - 76 / 2,

  draw: function () {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = "##000300";
    ctx.closePath();
    ctx.fill();
  },
};

function play() {
  ctx.clearRect(0, 0, canvas.width, canvas.height), ball.draw();
  ball.draw();
  board.draw();
  drawEnemies();
  moveBoard();
  enemyHit();
  levelIncrease();
  drawScore();

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  // resetter spillerens score

  if (ball.y + ball.radius > canvas.height) {
    if (score > parseInt(localStorage.getItem("highScore"))) {
      localStorage.setItem("highScore", score.toString());
      scoreDisplay.innerHTML = `High score: ${score}`;
    }
    score = 0;
    spawnEnemies();
    ball.dx = ball_speed;
    ball.dy = -ball_speed + 1;
  }

  if (
    ball.x >= board.x &&
    ball.x <= board.x + board.width &&
    ball.y + ball.radius >= canvas.height - board.height
  ) {
    ball.dy *= -1;
  }

  requestAnimationFrame(play);
}
let enemyRows = 3;
let enemyColumns = 5;
let enemyWidth = 70;
let enemyHeight = 20;
let enemyPadding = 20;
let enemyTop = 30;
let enemyLeft = 35;

let enemies = [];

function spawnEnemies() {
  for (let c = 0; c < enemyColumns; c++) {
    enemies[c] = [];
    for (let r = 0; r < enemyRows; r++) {
      enemies[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
}

function drawEnemies() {
  for (let c = 0; c < enemyColumns; c++) {
    for (let r = 0; r < enemyRows; r++) {
      if (enemies[c][r].status == 1) {
        let positionX = c * (enemyWidth + enemyPadding) + enemyLeft;
        let positionY = r * (enemyHeight + enemyPadding) + enemyTop;
        enemies[c][r].x = positionX;
        enemies[c][r].y = positionY;
        ctx.beginPath();
        ctx.fillRect(positionX, positionY, enemyWidth, enemyHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function enemyHit() {
  for (let c = 0; c < enemyColumns; c++) {
    for (let r = 0; r < enemyRows; r++) {
      let e = enemies[c][r];
      if (e.status == 1) {
        if (
          ball.x >= e.x &&
          ball.x <= e.x + enemyWidth &&
          ball.y >= e.y &&
          ball.y <= e.y + enemyHeight
        ) {
          ball.dy *= -1;
          e.status = 0;
          score++;
        }
      }
    }
  }
}

let levelUp = true;

function levelIncrease() {
  if (score % 15 == 0 && score != 0) {
    if (ball.y > canvas.height / 2) {
      spawnEnemies();
    }

    if (levelUp) {
      if (ball.dy > 0) {
        ball.dy += 1;
        levelUp = false;
      } else if (ball.dy < 0) {
        ball.dy -= 0;
        levelUp = false;
      }
    }
    if (score % 15 != 0) {
      levelUp = true;
    }
  }
}

spawnEnemies();
play();
