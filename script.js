var plane=document.getElementById("plane")
var body=document.getElementsByTagName("body")
var startBtn=document.getElementById('start')
var window=document.getElementsByTagName('body')
var head=document.getElementsByTagName('head')
var pipes=document.getElementsByClassName('pipes')
var GameOver=true
var i=0
var posY=0
var posX=0
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

startBtn.addEventListener('click',(e)=>{
    true
    GameOver=false
    document.body.innerHTML+=`<div id="plane"></div>`
    posX=e.x-50
    posY=e.y-50
    document.head.innerHTML=`
    <style>#plane{
        left:${e.x+50}px;
        top:${e.y+50}px;
        }
        body{
            background-color:skyblue;
            width:100vw;
            height:100vh;
            cursor:none;}
            </style>`
    Delete('start')
})
    document.body.addEventListener('mousemove',(e)=>{
        if(posY<0||posX<0||posY>500||posX>1200){
            if(GameOver===false){
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
                    document.getElementById('start').addEventListener('click',(e)=>{
                        GameOver=false
                        document.body.innerHTML+=`<div id="plane"></div>`
                        posX=e.x+50
                        posY=e.y+50
                        document.head.innerHTML=`
                        <style>#plane{
                            left:${e.x+50}px;
                            top:${e.y+50}px;
                            }
                            body{
                                background-color:skyblue;
                                width:100vw;
                                height:100vh;
                                cursor:none;}
                                </style>`
                        Delete('start')
                        Delete('gameover')
                })
        }}
        if(GameOver===false){
            posY+=e.movementY
            posX+=e.movementX
            document.head.innerHTML=`<style>#plane{
            left:${posX}px;
            top:${posY}px;
            }
            body{
                background-color:skyblue;
                width:100vw;
                height:100vh;
                cursor:none;}</style>   `
        }
    })
            // This is the making of the pipes
function Pipes(height){
    document.head.innerHTML+=`<style>.pipes{
        
    }</style>`
}