let plane=document.getElementById("plane")
let body=document.getElementsByTagName("body")
let startBtn=document.getElementById('start')

function Delete(id){
    var Thing=document.getElementById(id);
    Thing.parentNode.removeChild(Thing);
    return false;
}

function RanNum(){
    return `${Math.random()}`.slice(2,4)
}
startBtn.addEventListener('click',(e)=>{
    document.body.innerHTML+=`<div id="plane"></div>`
    document.addEventListener('keydown',(e)=>{
        console.log(e.key)
        if(e.key==='w'||e.key==='ArrowUp'){
            document.head.innerHTML=`<style>#plane{
            left:${e.x+1}px;
            }</style>`
        }
        
    })   
    Delete('start')
})