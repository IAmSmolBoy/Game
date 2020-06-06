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
                <img src="data:image/jpeg;base64,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" alt="">
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
                <img src="data:image/jpeg;base64,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" alt="">
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
            <img src="data:image/jpeg;base64,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" alt="">
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