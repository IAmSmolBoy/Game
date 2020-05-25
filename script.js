var startBtn=document.getElementById('start')
var body=document.body
var head=document.head
var pipes=document.getElementsByClassName('pipes')
var GameOver=true
var Count=0
var posY=0
var posX=0
var FirstPipeX=0
var PipeList=[]

function FindPipeHeight(i){
    return PipeList[i-1].slice(PipeList[i-1].length-2,PipeList[i-1].length)
}
function Pipes(height,num){
    PipeList.push(`Pipe${num}${height}`)
    document.body.innerHTML+=`<div id='Pipe${num}${height}' class='pipes'></div>`
    document.getElementById(`Pipe${num}${height}`).style.left=`${100}vw`
    document.getElementById(`Pipe${num}${height}`).style.height=`${height}vh`
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
        if(GameOver===false){
            var Height=RanNum() 
            if(Height>90){
                Height-=10
            }
            if(Height<10){
                Height+=10
            }
            console.log(Height)
            Pipes(Height,Count)
            Count++
            CreatePipes()
        }
    }, 10000);
}

startBtn.addEventListener('click',(e)=>{
    GameOver=false
    CreatePipes()
    document.body.innerHTML+=`<div id="plane"></div>`
    posX=e.x+50
    posY=e.y+50
    document.getElementById("plane").style.left=`${e.x-50}px`
    document.getElementById("plane").style.top=`${e.y-50}px`
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
                        document.getElementById("plane").style.left=`${e.x-50}px`
                        document.getElementById("plane").style.top=`${e.y-50}px`
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
            document.getElementById("plane").style.left=`${e.x-50}px`
            document.getElementById("plane").style.top=`${e.y-50}px`
            document.body.style.background='skyblue'
            document.body.style.width=`100vw`
            document.body.style.height=`100vh`
            document.body.style.cursor=`none` 
        }
    })