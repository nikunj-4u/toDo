const textarea=document.querySelector('textarea');
const ul=document.querySelector('ul');

function localS(val,isCompleted=false){
    let arr=[];
    if(localStorage.getItem('saman')){
         arr=JSON.parse(localStorage.getItem('saman'));
    }
    const obj={val,isCompleted};
    arr.push(obj);
        localStorage.setItem('saman',JSON.stringify(arr));
    
}
function create(){
    const data=JSON.parse(localStorage.getItem('saman'));
    data.map((x)=>{
        const spanText=document.createElement('span');
        const done=document.createElement('button');
        const div=document.createElement('span');
        const cross=document.createElement('button');
        done.innerText = '✅';
        cross.innerText = '❌';
        spanText.innerText=x.val;
        const li=document.createElement('li');
        div.className="buttons";
        div.appendChild(done);
        div.appendChild(cross);
        li.appendChild(spanText);
       li.appendChild(div);
       if (x.isCompleted) {
        li.style.textDecoration = 'line-through';
    }
        ul.appendChild(li);
        done.addEventListener('click',()=>{
            li.style.textDecoration = 'line-through';
            updateCompletion(x.val,true);
        })
        cross.addEventListener('click',()=>{
            ul.removeChild(li);
            const newData = data.filter(item => item.val !== x.val);
                localStorage.setItem('saman', JSON.stringify(newData));
        })
    })
}
function updateCompletion(likhahua,isCompleted){
    const sauda = JSON.parse(localStorage.getItem('saman'));
    const updatedData=sauda.map((x)=>{
        if(x.val==likhahua){
            return {...x,isCompleted};
        }
        return x;
    })
    localStorage.setItem('saman',JSON.stringify(updatedData));
}
textarea.addEventListener('keypress',(e)=>{
    if(e.key=='Enter'){
        const val=textarea.value;
       if(val=='') alert("Please Enter Something");
       else{
        localS(val);
        const li=document.createElement('li');
        const spanText=document.createElement('span');
        const div=document.createElement('span');
        const done=document.createElement('button');
        const cross=document.createElement('button');
        done.innerText = '✅';
        cross.innerText = '❌';
        spanText.innerText=val;
        div.className="buttons";
        div.appendChild(done);
        div.appendChild(cross);
        li.appendChild(spanText);
        li.appendChild(div);
        ul.appendChild(li);
        textarea.value='';
        textarea.placeholder="I need to...";
        done.addEventListener('click',()=>{
            li.style.textDecoration = 'line-through';
            updateCompletion(val, true);
        })
        cross.addEventListener('click',()=>{
            ul.removeChild(li);
            let d=JSON.parse(localStorage.getItem('saman'));
            const newData = d.filter(item => item.val !== val);
                localStorage.setItem('saman', JSON.stringify(newData));
        })
       }
       e.preventDefault(); 
    }
})
window.addEventListener('DOMContentLoaded', create);