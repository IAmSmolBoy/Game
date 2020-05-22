let plane=document.getElementById("plane")
let body=document.getElementById('body')
document.addEventListener('mousemove',(e)=>{
    console.log(e.x+e.y)
    document.head.innerHTML=`<style>#plane{top:${e.y-50}px;
    left:${e.x-50}px;
}</style>`  
})          