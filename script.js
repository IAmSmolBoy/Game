let plane=document.getElementById("plane")
let body=document.getElementById('body')

document.addEventListener('mousemove',(e)=>{
    document.head.innerHTML=`<style>#plane{top:${e.screenY-150}px;
    left:${e.screenX-50}px;
}</style>`
})        