const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = 600
canvas.width = 400
const ship = {x:150,y:10,height:200,width:100,boosterPower:0}
let score = 0
let timer = 0
let xSmash = 0
let zSmash = 0
let frame = 0
let gravity = 1
let bottom = ship.y + ship.height
let bgImg = new Image();bgImg.src = './assets/spacebg.png';
let cameraY = 0
let bgImgy = 0
//let canvasBottom = canvasY + canvas.height
//let canvasY = 0


function draw(){
    //c.fillStyle = 'skyblue'
    c.clearRect(0,0,canvas.width,canvas.height)
    c.drawImage(bgImg, 0, bgImgy);

    c.fillStyle = 'green'
    c.fillRect(ship.x,ship.y,ship.width,ship.height,ship.boosterPower)

    c.fillStyle = 'white'
    c.font = '26px sans-serif'
    c.fillText(`Score: ${score} / ${frame}`, 10,30)

    c.fillStyle = 'white'
    c.font = '26px sans-serif'
    c.fillText(`Booster: ${ship.boosterPower}`, 10,70)
}

function update(){
   ship.y += gravity

    if (frame === 800){
       // ship.y -= ship.boosterPower
       // frame = 0
       // ship.boosterPower = 0
    } 

    if (bottom < canvas.height){
        ship.y++
        bottom = ship.y + ship.height
    } else{
        gravity = 0
        
    }

    cameraY = Math.min(ship.y - 100, bgImg.height - canvas.height);
    cameraY = Math.max(0, cameraY);
}

function loop(){
    draw()
    frame++
    update()
    requestAnimationFrame(loop)
}
loop()

window.addEventListener('keydown', e =>{
    if (e.key === 'x'){
        ship.boosterPower++
    } else if (e.key === 'z'){
        ship.boosterPower++
    } else if (e.key === ' '){
        launch()
    }   
})

function launch(){
    ship.y -= ship.boosterPower
}