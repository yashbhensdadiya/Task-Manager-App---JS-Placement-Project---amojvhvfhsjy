const state_checker ={
    "open" : ["none"],
    "in-progress" : ["open"],
    "in-review" : ["in-progress"],
    "done" : ["in-review"]
}
const icon_checker ={
    "fa-regular fa-circle" : "fa-solid fa-hourglass",
    "fa-solid fa-hourglass" : "fa-solid fa-pen-to-square",
    "fa-solid fa-pen-to-square" : "fa-solid fa-check",
    "fa-solid fa-check" : "fa-solid fa-check"
}
const btn = document.getElementById("add_btn");
const input = document.getElementById("input");
let ids = 1;

btn.addEventListener('click',()=>{

    if(!input.value==''){

        const cb1 =  document.getElementById("card-bord1");
        const button = document.createElement('button');
        let new_div = document.createElement('div');
        new_div.appendChild(button);
        button.setAttribute('id','open_btn');
        new_div.setAttribute('draggable','true');
        new_div.setAttribute('ondragstart','drag(event)');
        new_div.setAttribute('class','dragg');
        new_div.setAttribute('id',`div-id${ids}`);
        ids++;
        new_div.innerHTML += `<details>
        <summary>${input.value}</summary>
        <p id="content" contenteditable="True">please enter description about the task</p>
        </details>`;
        new_div.innerHTML += '<i class="fa-regular fa-circle"></i><br>&nbsp';
        cb1.appendChild(new_div);
        input.value ='';
        window.addEventListener('keydown',(e)=>{
            if(e.keyCode==13 || e.keyIdentifier=='Enter'){
                if(e.target.id=='content'){
                    e.preventDefault()
                }
            }
        })
    }
    else{
        alert("Please enter valid task !");
    } 
    let p_val = document.querySelectorAll('p');
    p_val.forEach(val => {
        val.addEventListener('mouseover',()=>{
            if(val.innerHTML ==''){
                val.innerHTML = "please enter description about the task";
            }
        })
    }); 
})

function drag(e){
    e.dataTransfer.setData('text/plain',e.target.id);
}
function dragover(e,ele){
    if(e.target==ele && e.target!=''){
    //     console.log(typeof ele);
    //     console.log(typeof e.target);
        e.preventDefault();
    }
}

function drop(e) {
    e.preventDefault();
    const soruceId = e.dataTransfer.getData('text/plain');
    const task_id = document.getElementById(soruceId).parentNode.parentNode.id;
    const state_id = document.getElementById(e.target.id).parentNode.id;

    if(state_checker[state_id].includes(task_id)){
        icon_changer(soruceId);
        e.target.appendChild(document.getElementById(soruceId));
    }
    else{
        alert(`You can't add from "${task_id}" section to "${state_id}" section`);
    }
}

function icon_changer(id){
    const icons = document.querySelectorAll(`#${id} i`);
    icons.forEach(ele=>{
        ele.className = icon_checker[ele.className];
    })
    
}