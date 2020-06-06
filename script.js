const startBtn=document.getElementById('start')
const body=document.body
const head=document.head
const pipes=document.getElementsByClassName('pipes')
var GameOver=true
var Count=1
var PipeList=[]
var posX=0
var posY=0
var Highscore=0
var score=0
var PipesPassed=[]

function FindPipeHeight(i,PipeType){
    if(PipeType==='Pipe'){
        return parseInt(PipeList[i-1].slice(PipeList[i-1].length-2,PipeList[i-1].length))
    }
    if(PipeType==='Other'){
        return 80-parseInt(PipeList[i-1].slice(PipeList[i-1].length-2,PipeList[i-1].length))
    }
}
function Pipes(height,num){ 
    PipeList.push(`Pipe${num}${height}`)
    document.body.innerHTML+=`<div id='Pipe${num}${height}' class='pipes' class='PipePipes'></div>
    <div id='OtherPipe${num}${height}' class="OtherPipes" class="PipePipes"></div>`
    document.getElementById(`Pipe${num}${height}`).style.left=`1600px`
    document.getElementById(`Pipe${num}${height}`).style.height=`${height}vh`
    document.getElementById(`OtherPipe${num}${height}`).style.height=`${100-height}vh`
    document.getElementById(`OtherPipe${num}${height}`).style.left=`1600px`
    document.getElementById(`OtherPipe${num}${height}`).style.top=`${20+parseInt(height)}vh`
}
function Delete(id){
    document.getElementById(id).parentNode.removeChild(document.getElementById(id));
    return false;
}
function RanNum(){ 
    var Height=`${Math.random()}`
    if(Height.slice(2,3)===`9`){
        Height=`7`+`${Height.slice(3,4)}`
    }
    if(Height.slice(2,3)==='0'){
        Height=`2`+`${Height.slice(3,4)}`
    }
    if(Height.slice(2,3)===`8`){
        Height=`7`+`${Height.slice(3,4)}`
    }
    if(Height.slice(2,3)===`1`){
        Height=`2`+`${Height.slice(3,4)}`
       }
    if(Height.slice(2,3)!='0'&&Height.slice(2,3)!='9'&&Height.length>3&&Height.slice(2,3)!=`1`&&Height.slice(2,3)!=`8`){
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
            CreatePipes()
        }
    }, 1500);
}
function ScrollUp(){
    window.scroll(0,0)
}
function CollisionTest(){
    setTimeout(function(){
        for(i=1;i<=PipeList.length;i++){
            var PipeY=FindPipeHeight(i,'Pipe')
            var Pipeloc=document.getElementById(`${PipeList[i-1]}`).style
            var OtherPipeloc=document.getElementById(`Other${PipeList[i-1]}`).style
            OtherPipeloc.left=`${parseInt(OtherPipeloc.left)-5}px`
            Pipeloc.left=`${parseInt(Pipeloc.left)-5}px`
            if(Pipeloc.left.slice(0,1)==='-'){
                Delete(`${PipeList[i-1]}`)
                Delete(`Other${PipeList[i-1]}`)
                PipeList.splice(0,1)        
            }
            if(posX>=parseInt(document.getElementById(`${PipeList[i-1]}`).style.left)&&posY/document.documentElement.clientHeight*100<PipeY&&posX<parseInt(document.getElementById(`${PipeList[i-1]}`).style.left)+25){
                document.body.innerHTML=`<div id="gameover">Game Over</div>
                <div id="grass"></div>
                <div id='highscore'>Highscore:${Highscore}</div>
                <button id="start">Restart Game</button>
                <script src="script.js"></script>
                <link rel="stylesheet" href="style.css">`
                Highscore=score
                score=0
                GameOver=true
                document.body.style.cursor='auto'
                document.getElementById('start').addEventListener('click',(e)=>{
                    Delete('highscore')
                    PipesPassed=[]
                    PipeList=[]
                    posX=50
                    posY=50
                    GameOver=false
                    var Height=RanNum() 
                    Pipes(Height,Count)
                    Count++
                    CreatePipes()
                    CollisionTest()
                    document.body.innerHTML+=`<div id="plane"></div>
                    <div class='scores'>Highscore:${Highscore}</div>
                    <div class='scores' id='score'>Score:${score}</div>
                    `
                    document.getElementById("plane").style.left=`${e.clientX-12.5}px`
                    document.getElementById("plane").style.top=`${e.clientY-12.5}px`
                    document.body.style.cursor=`none`
                    Delete('start')
                    Delete('gameover')
                })
            }
            if(posX>=parseInt(parseInt(document.getElementById(`${PipeList[i-1]}`).style.left))&&posY/document.documentElement.clientHeight*100>20+PipeY&&posX<parseInt(parseInt(document.getElementById(`${PipeList[i-1]}`).style.left))+25){
                document.body.innerHTML=`<div id="gameover">Game Over</div>
                <div id="grass"></div>
                <div id='highscore'>Highscore:${Highscore}</div>
                <button id="start">Restart Game</button>
                <script src="script.js"></script>
                <link rel="stylesheet" href="style.css">`
                Highscore=score
                score=0
                GameOver=true
                document.body.style.cursor='auto'
                document.getElementById('start').addEventListener('click',(e)=>{
                    Delete('highscore')
                    PipesPassed=[]
                    PipeList=[]
                    posX=50
                    posY=50
                    GameOver=false
                    var Height=RanNum() 
                    Pipes(Height,Count)
                    Count++
                    CreatePipes()
                    CollisionTest()
                    document.body.innerHTML+=`<div id="plane"></div>
                    <div class='scores'>Highscore:${Highscore}</div>
                    <div class='scores' id='score'>Score:${score}</div>
                    `
                    document.getElementById("plane").style.left=`${e.clientX-12.5}px`
                    document.getElementById("plane").style.top=`${e.clientY-12.5}px`
                    document.body.style.cursor=`none`
                    Delete('start')
                    Delete('gameover')
                })
            }
            if(posX>parseInt(document.getElementById(`${PipeList[i-1]}`).style.left)&&posY/document.documentElement.clientHeight*100<20+PipeY<PipeY){
                score++
                document.getElementById('score').innerHTML=`Score:${score}`
                PipesPassed.push(`${PipeList[i-1]}1`)
                console.log(PipesPassed)
                document.getElementById(`${PipeList[i-1]}`).id=`${PipeList[i-1]}1`
                document.getElementById(`Other${PipeList[i-1]}`).id=`Other${PipeList[i-1]}1`
                PipeList.splice(0,1)
            }
        }
    ScrollUp()
    CollisionTest()
    },30)
}
function MovementPassed(){
    setTimeout(function(){
        for(i=1;i<=PipesPassed.length;i++){
            document.getElementById(`Other${PipesPassed[i-1]}`).style.left=`${parseInt(document.getElementById(`Other${PipesPassed[i-1]}`).style.left)-5}px`
            document.getElementById(`${PipesPassed[i-1]}`).style.left=`${parseInt(document.getElementById(`${PipesPassed[i-1]}`).style.left)-5}px`
        }
    MovementPassed()    
    },30)
}

startBtn.addEventListener('click',(e)=>{
    posX=e.clientX+10
    posY=e.clientY
    GameOver=false
    var Height=RanNum()
    Count++
    CreatePipes()
    CollisionTest()
    MovementPassed()
    document.body.innerHTML+=`<div id="plane"></div>
    <div class='scores'>Highscore:${Highscore}</div>
    <div class='scores' id='score'>Score:${score}</div>`
    document.getElementById("plane").style.left=`${e.clientX-12.5}px`
    document.getElementById("plane").style.top=`${e.clientY-12.5}px`
    document.body.style.cursor='none'
    Delete('start')
    Delete('title')
    Delete('Rules')
    Delete('rule1')
    Delete('rule2')
    Delete('rule3')
    Delete('rule4')
})
document.body.addEventListener('mousemove',(e)=>{
    if(posX<=20||posY<=12.5||posY>=document.documentElement.clientHeight-10){
        if(GameOver===false){
            document.body.innerHTML=`<div id="gameover">Game Over</div>
            <div id="grass"></div>
            <div id='highscore'>Highscore:${Highscore}</div>
            <button id="start">Restart Game</button>
            <script src="script.js"></script>
            <link rel="stylesheet" href="style.css">`
            Highscore=score
            score=0
            GameOver=true
            document.body.style.cursor='auto'
            document.getElementById('start').addEventListener('click',(e)=>{
                Delete('highscore')
                PipesPassed=[]
                PipeList=[]
                posX=50
                posY=50
                GameOver=false
                var Height=RanNum()
                Count++
                CreatePipes()
                CollisionTest()
                MovementPassed()
                document.body.innerHTML+=`<div id="plane"></div>
                <div class='scores'>Highscore:${Highscore}</div>
                <div class='scores' id='score'>Score:${score}</div>
                `
                document.getElementById("plane").style.left=`${e.clientX-12.5}px`
                document.getElementById("plane").style.top=`${e.clientY-12.5}px`
                document.body.style.cursor=`none`
                Delete('start')
                Delete('gameover')
            })
        }
    }
    if(GameOver===false){
        document.getElementById("plane").style.left=`${e.clientX-12.5}px`
        document.getElementById("plane").style.top=`${e.clientY-12.5}px`
        posX=e.clientX+10
        posY=e.clientY
        document.body.style.cursor=`none` 
    }
})  