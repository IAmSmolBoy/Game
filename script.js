var startBtn=document.getElementById('start')
var body=document.body
var head=document.head
var pipes=document.getElementsByClassName('pipes')
var GameOver=true
var Count=1
var PipeList=[]
var posX=0
var posY=0

function FindPipeHeight(i){
    return PipeList[i-1].slice(PipeList[i-1].length-2,PipeList[i-1].length)
}
function Pipes(height,num){ 
    PipeList.push(`Pipe${num}${height}`)
    document.body.innerHTML+=`<div id='Pipe${num}${height}' class='pipes' class='PipePipes'></div>
    <div id='OtherPipe${num}${height}' class="OtherPipes" class="PipePipes"></div>`
    document.getElementById(`Pipe${num}${height}`).style.left=`1500px`
    document.getElementById(`Pipe${num}${height}`).style.height=`${height}vh`
    document.getElementById(`OtherPipe${num}${height}`).style.height=`${100-height}vh`
    document.getElementById(`OtherPipe${num}${height}`).style.left=`1500px`
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
    }, 1000);
}
function ScrollUp(){
    window.scroll(0,0)
}
function Movement(){
    window.scroll(0,0)
    setTimeout(function(){
        if(GameOver===false){
            for(i=1;i<=PipeList.length;i++){
                var Pipeloc=document.getElementById(`${PipeList[i-1]}`).style
                var OtherPipeloc=document.getElementById(`Other${PipeList[i-1]}`).style
                OtherPipeloc.left=`${parseInt(OtherPipeloc.left)-5}px`
                Pipeloc.left=`${parseInt(Pipeloc.left)-5}px`
                if(Pipeloc.left.slice(0,1)==='-'){
                    Delete(`${PipeList[i-1]}`)
                    Delete(`Other${PipeList[i-1]}`)
                    PipeList.splice(0,1)        
                }
            }
            Movement()
            ScrollUp()
        }
    },30)
}
function CollisionTest(){
    setTimeout(function(){
        for(i=1;i<=PipeList.length;i++){
            var PipeX=document.getElementById(`${PipeList[i-1]}`).style.left
            var PipeY=FindPipeHeight(i)
            if(posX>parseInt(PipeX)){
                console.log(`past${i}`)
            }
            // console.log(`${parseInt(PipeX)}  `,`${PipeY}`,PipeList[i-1])
        }
    CollisionTest()    
    },30)   
}

startBtn.addEventListener('click',(e)=>{
    posX=e.clientX-10
    posY=e.clientY-10
    GameOver=false
    if(GameOver===false){
        var Height=RanNum() 
        Pipes(Height,Count)
        Count++
    }
    CreatePipes()
    Movement()
    CollisionTest()
    document.body.innerHTML+=`<div id="plane"></div>`
    document.getElementById("plane").style.left=`${e.clientX-2.5}px`
    document.getElementById("plane").style.top=`${e.clientY-2.5}px`
    document.body.style.cursor='none'
    Delete('start')
    Delete('title')
})
document.body.addEventListener('mousemove',(e)=>{
    if(posX<=0||posY<=0||posY>=530){
        if(GameOver===false){
            document.body.innerHTML=`<div id="gameover">Game Over</div>
            <div id="grass"></div>
            <button id="start">Restart Game</button>
            <script src="script.js"></script>
            <link rel="stylesheet" href="style.css">`
            GameOver=true
            document.body.style.cursor='auto'
            document.getElementById('start').addEventListener('click',(e)=>{
                PipeList=[]
                posX=50
                posY=50
                GameOver=false
                if(GameOver===false){
                    var Height=RanNum() 
                    Pipes(Height,Count)
                    Count++
                }
                CreatePipes()
                Movement()
                CollisionTest()
                document.body.innerHTML+=`<div id="plane"></div>`
                document.getElementById("plane").style.left=`${e.clientX-2.5}px`
                document.getElementById("plane").style.top=`${e.clientY-2.5}px`
                document.body.style.cursor=`none`
                Delete('start')
                Delete('gameover')
            })
        }
    }
    if(GameOver===false){
        document.getElementById("plane").style.left=`${e.clientX-2.5}px`
        document.getElementById("plane").style.top=`${e.clientY-2.5}px`
        posX=e.clientX-10
        posY=e.clientY-10
        document.body.style.cursor=`none` 
    }
})