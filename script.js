var startBtn=document.getElementById('start')
var body=document.body
var head=document.head
var pipes=document.getElementsByClassName('pipes')
var GameOver=true
var Count=1
var PipeList=[]
var posX=0
var posY=0
var FirstPipeX=100

function FindPipeHeight(i){
    return PipeList[i-1].slice(PipeList[i-1].length-2,PipeList[i-1].length)
}
function Pipes(height,num){ 
    PipeList.push(`Pipe${num}${height}`)
    document.body.innerHTML+=`<div id='Pipe${num}${height}${FirstPipeX}' class='pipes'></div>`
    document.getElementById(`Pipe${num}${height}${FirstPipeX}`).style.left=`5ex`
    document.getElementById(`Pipe${num}${height}${FirstPipeX}`).style.height=`${height}vh`
}
function Delete(id){
    var Thing=document.getElementById(id);
    Thing.parentNode.removeChild(Thing);
    return false;
}
function RanNum(){ 
    var Height=`${Math.random()}`
    if(Height.slice(2,3)===`9`){
        Height=`8`+`${Height.slice(3,4)}`
    }
    if(Height.slice(2,3)==='0'){
        Height=`1`+`${Height.slice(3,4)}`
    }
    if(Height.slice(2,3)!='0'&&Height.slice(2,3)!='9'&&Height.length>3){
        Height=`${Height.slice(2,4)}`
    }
    return Height
}
function CreatePipes(){
    setTimeout(function(){
        if(GameOver===false){
            var Height=RanNum() 
            Pipes(Height,Count)
            Count++
            for(i=1;i<=PipeList.length;i++){
                document.getElementById(PipeList[i-1]).style.left=`${parseInt(document.getElementById(PipeList[i-1]).style.left)-20}vw`
            }
            CreatePipes()
        }
    }, 1000);
}

startBtn.addEventListener('click',(e)=>{
    posX=e.x
    posY=e.y
    GameOver=false
    CreatePipes()
    document.body.innerHTML+=`<div id="plane"></div>`
    document.getElementById("plane").style.left=`${e.x/7.5}ex`
    document.getElementById("plane").style.top=`${e.y/7.5}ex`
    document.body.style.cursor='none'
    Delete('start')
})
document.body.addEventListener('mousemove',(e)=>{
    if(posX<0||posY<0||posY>500){
        if(GameOver===false){
            PipeList=[]
            document.body.innerHTML=`<div id="gameover">Game Over</div>
            <div id="grass"></div>
            <button id="start">Restart Game</button>
            <script src="script.js"></script>
            <link rel="stylesheet" href="style.css">`
            GameOver=true
            document.body.style.cursor='auto'
            document.getElementById('start').addEventListener('click',(e)=>{
                posX=100
                posY=100
                GameOver=false
                CreatePipes()
                document.body.innerHTML+=`<div id="plane"></div>`
                document.getElementById("plane").style.left=`${e.x/7.5}ex`
                document.getElementById("plane").style.top=`${e.y/7.5}ex`
                document.body.style.cursor=`none`
                Delete('start')
                Delete('gameover')
            })
        }
    }
    if(GameOver===false){
        document.getElementById("plane").style.left=`${e.x/7.5}ex`
        document.getElementById("plane").style.top=`${e.y/7.5}ex`
        posX=e.x
        posY=e.y
        document.body.style.cursor=`none` 
    }
})