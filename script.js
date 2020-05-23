var plane=document.getElementById("plane")
var body=document.getElementsByTagName("body")
var startBtn=document.getElementById('start')
var window=document.getElementsByTagName('body')
var head=document.getElementsByTagName('head')
var GameOver=true
var StartGame=false
var posY=0
var posX=0
function Delete(id){
    var Thing=document.getElementById(id);
    Thing.parentNode.removeChild(Thing);
    return false;
}
function RanNum(){
    return `${Math.random()}`.slice(2,4)
}

startBtn.addEventListener('click',(e)=>{
    console.log(0)
    StartGame=true
    GameOver=false
    document.body.innerHTML+=`<div id="plane"></div>`
    posX=e.x-50
    posY=e.y-50
    document.head.innerHTML=`
    <style>#plane{
        left:${e.x}px;
        top:${e.y}px;
        }
        body{
            background-color:skyblue;
            width:100vw;
            height:100vh;
            cursor:none;}
            </style>`
    Delete('start')
})
    document.addEventListener('mousemove',(e)=>{
        if(posY<0&&GameOver===false&&StartGame===true){
            StartGame=false
            document.body.innerHTML=`<div id="gameover">Game Over</div>
            <div id="grass"></div>
            <button id="start">Restart Game</button>
            <script src="script.js"></script>
            <link rel="stylesheet" href="style.css">`
            GameOver=true
            document.head.innerHTML=`<style>body{
                background-color:skyblue;
                width:100vw;
                height:100vh;}
                #plane{
                    top:50vh;
                }
                </style>`
        }
        if(StartGame===true&&GameOver===false){
            posY+=e.movementY
            posX+=e.movementX
            document.head.innerHTML=`<style>#plane{
            left:${posX}px;
            top:${posY}px;
            }</style>`
        }
    })