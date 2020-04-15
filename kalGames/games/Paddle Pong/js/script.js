// select canvas element
const canvas = document.getElementById(`pong`);
// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext(`2d`);
// Ball object
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : `LIGHTGREY`
}
// p1 Paddle
const p1 = {
    x : 0, // left side of canvas
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : `WHITE`
}
// p2 Paddle
const p2 = {
    x : canvas.width - 10, // - width of paddle
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : `GREY`
}
// NET
const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : `LIGHTGREY`
}
let vsWho = ``;
// draw a rectangle, will be used to draw paddles
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}
// draw circle, will be used to draw the ball
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}
function p2Move(offset) {
    p2.y += offset;
}
// P1 listening to the mouse
document.addEventListener(`mousemove`, getMousePos);
function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
  
    p1.y = evt.clientY - rect.top - p1.height/2;
}
// when p2 or p1 scores, we reset the ball
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 7;
    ball.velocityX = -ball.velocityX;
}
// draw the net
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}
// draw score
function drawScore(text,color,x,y){
    ctx.fillStyle = color;
    ctx.font = `75px book antiqua`;
    ctx.fillText(text, x, y);
}
// draw text
function drawText(text,color,x,y){
    ctx.fillStyle = color;
    ctx.font = `25px book antiqua`;
    ctx.fillText(text, x, y);
}
// collision detection
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
  
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
  
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}
// update function, the function that does all calculations
function update(){
    // change the score of players, if the ball goes to the left `ball.x<0` p2 win, else if `ball.x > canvas.width` the p1 win
    if( ball.x - ball.radius < 0 ){
        p2.score++;
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        p1.score++;
        resetBall();
    }
  
    // the ball has a velocity
    setTimeout(() => {
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
    }, 3000);
    
    // p2 plays for itself, and we must be able to beat it
    // simple AI
    if (vsWho == `COM`) {
        p2.y += ((ball.y - (p2.y + p2.height/2)))*0.1;
    }
    
    // when the ball collides with bottom and top walls we inverse the y velocity.
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
    }
    
    // we check if the paddle hit the p1 or the p2 paddle
    let player = (ball.x + ball.radius < canvas.width/2) ? p1 : p2;
    
    // if the ball hits a paddle
    if(collision(ball,player)){
        // we check where the ball hits the paddle
        let collidePoint = (ball.y - (player.y + player.height/2));
        // normalize the value of collidePoint, we need to get numbers between -1 and 1.
        // -player.height/2 < collide Point < player.height/2
        collidePoint = collidePoint / (player.height/2);
      
        // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
        // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
        // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
        // Math.PI/4 = 45degrees
        let angleRad = (Math.PI/4) * collidePoint;
      
        // change the X and Y velocity direction
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
      
        // speed up the ball everytime a paddle hits it.
        ball.speed += 0.1;
    }
}
// render function, the function that does al the drawing
function render(enemy){
  
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, `rgb(100, 50, 15)`);
  
    // draw the p1 score to the left
    drawText(`P1`,`WHITE`,canvas.width/4,canvas.height/1.1);
  
    // draw the p2 score to the right
    drawText(enemy,`GREY`,3*canvas.width/4,canvas.height/1.1);

    // draw the p1 score to the left
    drawScore(p1.score,`WHITE`,canvas.width/4,canvas.height/5);
  
    // draw the p2 score to the right
    drawScore(p2.score,`GREY`,3*canvas.width/4,canvas.height/5);
  
    // draw the net
    drawNet();
  
    // draw the p1`s paddle
    drawRect(p1.x, p1.y, p1.width, p1.height, p1.color);
  
    // draw the p2`s paddle
    drawRect(p2.x, p2.y, p2.width, p2.height, p2.color);
  
    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);

    //return enemy
    return vsWho = enemy
}
function resetSettings() {
    p1.score = 0;
    p2.score = 0;
    ball.speed = 7;
    document.querySelector(`.mulai-vs-com`).style.display = `none`;
    document.querySelector(`.mulai-vs-com`).innerHTML = `Mulai vs COM`;
    document.querySelector(`.mulai-multipemain`).style.display = `none`;
    document.querySelector(`.mulai-multipemain`).innerHTML = `Mulai Multipemain`;
}
document.querySelector(`.mulai-vs-com`).addEventListener(`click`, function() {
    resetSettings();
    function deuceReg() {
        if (p1.score == p2.score + 2) {
            drawText(`P1 Menang !`,`WHITE`,canvas.width/6,canvas.height/2);
            setTimeout(() => {
                clearInterval(loop);
            }, 50);
            document.querySelector(`.mulai-vs-com`).style.display =  `block`;
            return document.querySelector(`.mulai-vs-com`).innerHTML = `Mulai Lagi ?!`;
        } else if (p2.score == p1.score + 2) {
            drawText(`COM Menang !`,`GREY`,canvas.width/1.5,canvas.height/2);
            setTimeout(() => {
                clearInterval(loop);
            }, 50);
            document.querySelector(`.mulai-vs-com`).style.display =  `block`;
            return document.querySelector(`.mulai-vs-com`).innerHTML = `Mulai Lagi ?!`;
        } else if (p1.score == p2.score) {
            drawText(`Deuce`,`LIGHTGREY`,canvas.width/2.25,canvas.height/2);
        }
    }
    // function for score regulations
    function scoreReg() {
        if (p1.score > 10 && p2.score < 10) {
            drawText(`P1 Menang !`,`WHITE`,canvas.width/6,canvas.height/2);
            setTimeout(() => {
                clearInterval(loop);
            }, 50);
            document.querySelector(`.mulai-vs-com`).style.display =  `block`;
            return document.querySelector(`.mulai-vs-com`).innerHTML = `Mulai Lagi ?!`;
        } else if (p2.score > 10 && p1.score < 10) {
            drawText(`COM Menang !`,`GREY`,canvas.width/1.5,canvas.height/2);
            setTimeout(() => {
                clearInterval(loop);
            }, 50);
            document.querySelector(`.mulai-vs-com`).style.display =  `block`;
            return document.querySelector(`.mulai-vs-com`).innerHTML = `Mulai Lagi ?!`;
        } else if (p1.score > 9 && p2.score > 9) {
            deuceReg();
        }
    }
    // function for all gameplay
    function game(){
        render(`COM`);
        update();
        scoreReg();
    }
    // number of frames per second
    const framePerSecond = 50;
    //call the game function 50 times every 1 Sec
    const loop = setInterval(game,1000/framePerSecond);
});
document.querySelector(`.mulai-multipemain`).addEventListener(`click`, function() {
    resetSettings();
    //P2 listening to the keyboard
    document.addEventListener(`keydown`, event => {
        if (event.keyCode === 38) {
            p2Move(-50);
        } else if (event.keyCode === 40) {
            p2Move(50);
        }
    });
    function deuceReg() {
        if (p1.score == p2.score + 2) {
            drawText(`P1 Menang !`,`WHITE`,canvas.width/6,canvas.height/2);
            setTimeout(() => {
                clearInterval(loop);
            }, 50);
            document.querySelector(`.mulai-multipemain`).style.display = `block`;
            return document.querySelector(`.mulai-multipemain`).innerHTML = `Mulai Lagi ?!`;
        } else if (p2.score == p1.score + 2) {
            drawText(`P2 Menang !`,`GREY`,canvas.width/1.5,canvas.height/2);
            setTimeout(() => {
                clearInterval(loop);
            }, 50);
            document.querySelector(`.mulai-multipemain`).style.display = `block`;
            return document.querySelector(`.mulai-multipemain`).innerHTML = `Mulai Lagi ?!`;
        } else if (p1.score == p2.score) {
            drawText(`Deuce`,`LIGHTGREY`,canvas.width/2.25,canvas.height/2);
        }
    }
    // function for score regulations
    function scoreReg() {
        if (p1.score > 10 && p2.score < 10) {
            drawText(`P1 Menang !`,`WHITE`,canvas.width/6,canvas.height/2);
            setTimeout(() => {
                clearInterval(loop);
            }, 50);
            document.querySelector(`.mulai-multipemain`).style.display = `block`;
            return document.querySelector(`.mulai-multipemain`).innerHTML = `Mulai Lagi ?!`;
        } else if (p2.score > 10 && p1.score < 10) {
            drawText(`P2 Menang !`,`GREY`,canvas.width/1.5,canvas.height/2);
            setTimeout(() => {
                clearInterval(loop);
            }, 50);
            document.querySelector(`.mulai-multipemain`).style.display = `block`;
            return document.querySelector(`.mulai-multipemain`).innerHTML = `Mulai Lagi ?!`;
        } else if (p1.score > 9 && p2.score > 9) {
            deuceReg();
        }
    }
    // function for all gameplay
    function game(){
        render(`P2`);
        update();
        scoreReg();
    }
    // number of frames per second
    const framePerSecond = 50;
    //call the game function 50 times every 1 Sec
    const loop = setInterval(game,1000/framePerSecond);
});
