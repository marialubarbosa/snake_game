let cavas = document.getElementById("area");
let context = area.getContext("2d");
let box = 32; //cria a classe representando a área
let snake = []; //cria a classe representando a cobra
snake[0] = { //define tamanho da cobra
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; //cria a classe representando direção em que a cobra se movimenta
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
function criarBG(){ //função que cria  a área
    context.fillStyle = "lightgreen"; //define cor
    context.fillRect(0, 0, 16 * box, 16 * box); //define dimensões
}

function criarCobrinha(){ //cria função que cria a cobra em tela
    for(i=0; i < snake.length; i++){ //regra que define como o corpo da cobra será criado
        context.fillStyle = "green";//define cor
        context.fillRect(snake[i].x, snake[i].y, box, box);//define dimensão
    }
}

function criarComida(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box); 
}

document.addEventListener("keydown", update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";

}

function iniciarJogo(){ //função que inicia o jogo
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down")snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[1].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("GAME OVER :(");
        }
    }

    criarBG();
    criarCobrinha();
    criarComida();

    let snakeX = snake[0].x; //array posição 0 de x 
    let snakeY = snake[0].y; //array posição 0 de y

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }



    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);
