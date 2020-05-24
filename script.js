var startBtn=document.getElementById('start')
var body=document.body
var head=document.head
var pipes=document.getElementsByClassName('pipes')
var GameOver=true
var i=0
var posY=0
var posX=0
var PipeDist=0

function Pipes(height,num,dist){
    document.body.innerHTML+=`<div id='Pipe${num}${height}' class='pipes'></div>`
    document.head.innerHTML+=`<style>#Pipe${num}${height}{
        height:${height}vh;
    }</style>`
}
function Collided(x1,y1,x2,y2){
    if (x1+50>x2||x1-50<x2||y1+50>y2||y1-50<y2) {
        return true
    } else {
        return false
    }
}
function Delete(id){
    var Thing=document.getElementById(id);
    Thing.parentNode.removeChild(Thing);
    return false;
}
function RanNum(){
    return `${Math.random()}`.slice(2,4)
}
function CreatePipes(){
    setTimeout(function(){
        var Height=RanNum()
        console.log(Height)
        if(GameOver===false){
            Pipes(Height,i)
            i++
            PipeDist+=10
            CreatePipes()
        } return Height
    }, 10000);
}

startBtn.addEventListener('click',(e)=>{
    GameOver=false
    CreatePipes()
    document.body.innerHTML+=`<div id="plane"></div>`
    posX=e.x+50
    posY=e.y+50
    document.getElementById("plane").style.left=`${e.x+50}px`
    document.getElementById("plane").style.top=`${e.y+50}px`
    document.body.style.background='skyblue'
    document.body.style.width='100vw'
    document.body.style.height='100vh'
    document.body.style.cursor='none'
    Delete('start')
})
    document.body.addEventListener('mousemove',(e)=>{
        if(posY<0||posX<0||posY>500){
            if(GameOver===false){
                document.body.innerHTML=`<div id="gameover">Game Over</div>
                <div id="grass"></div>
                <button id="start">Restart Game</button>
                <script src="script.js"></script>
                <link rel="stylesheet" href="style.css">`
                GameOver=true
                document.body.style.background='skyblue'
                document.body.style.width='100vw'
                document.body.style.height='100vh'
                document.body.style.cursor='auto'
                    document.getElementById('start').addEventListener('click',(e)=>{
                        GameOver=false
                        CreatePipes()
                        document.body.innerHTML+=`<div id="plane"></div>`
                        posX=e.x+50
                        posY=e.y+50
                        document.getElementById("plane").style.left=`${e.x+50}px`
                        document.getElementById("plane").style.top=`${e.y+50}px`
                        document.body.style.background='skyblue'
                        document.body.style.width='100vw'
                        document.body.style.height='100vh'
                        document.body.style.cursor=`none`
                        Delete('start')
                        Delete('gameover')
                })
        }
    }
        if(GameOver===false){
            posY+=e.movementY
            posX+=e.movementX
            document.getElementById("plane").style.left=`${e.x}px`
            document.getElementById("plane").style.top=`${e.y}px`
            document.body.style.background='skyblue'
            document.body.style.width=`100vw`
            document.body.style.height=`100vh`
            document.body.style.cursor=`none` 
        }
    })