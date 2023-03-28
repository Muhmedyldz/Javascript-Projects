const todoinput=document.querySelector(".todo-input");
const todobutton=document.querySelector(".todo-button");
const todolist =document.querySelector(".todo-list");
const todofilter=document.querySelector(".filter-todo");

//& aleerts
const alertwarrning=document.querySelector(".alert-warrning");
const alertsuccess= document.querySelector(".alert-success");


//? events

todobutton.addEventListener("click",addtodo);
todolist.addEventListener("click",check);
todofilter.addEventListener("click",filtertodo);



// ?function

function addtodo(e){

    e.preventDefault();

    const isempty= str=>!str.trim().length;

    if(isempty(todoinput.value)){
        alertwarrning.style.display="block";
        setTimeout(() => {
            alertwarrning.style.display="none";
        }, 1500);
    }
    else{
        alertsuccess.style.display="block";
        setTimeout(() => {
            alertsuccess.style.display="none";
        }, 1500);

        savelocaltodos(todoinput.value);

     //! create todo div
    const tododiv=document.createElement("div");
    tododiv.classList.add("todo");
    
    //& check mart button
    const completedbutton=document.createElement("button");
    completedbutton.innerHTML=" <i class='fas fa-check-circle'></i>";
    completedbutton.classList.add("complete-btn");
    tododiv.appendChild(completedbutton);

    //& creat todo li
    const newtodo=document.createElement("li");
    newtodo.innerText=todoinput.value;
    newtodo.classList.add("todo-item");
    tododiv.appendChild(newtodo);

    //& check delet button
    const trashbutton=document.createElement("button");
    trashbutton.innerHTML="<i class='fas fa-minus-circle'></i>";
    trashbutton.classList.add("trash-btn");
    tododiv.appendChild(trashbutton);

    //! append to list
    todolist.appendChild(tododiv);

    }


    //! todoinput clear 
    todoinput.value="";
}

function check(e){
    const item=e.target;

    //! delete todo
    if(item.classList[0]==="trash-btn"){
        const todo= item.parentElement;
        todo.classList.add("fall");
        removelocalstorage(todo);
        todo.addEventListener("transitionend",function() {
            todo.remove();
        });
    }

    //! mark check
    if(item.classList[0]==="complete-btn"){
        const todo =item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filtertodo(e) {
    
    const todos=todolist.childNodes;
    todos.forEach(function(item){
        switch (e.target.value) {
            case "all":
                item.style.display="flex";
                break;
            case "completed":
                if(item.classList.contains("completed")){
                    item.style.display="flex";
                }else{
                    item.style.display="none";
                }
                break;
            case "uncompleted":
                if(!item.classList.contains("completed")){
                    item.style.display="flex";
                }else{
                    item.style.display="none";
                }   
                break; 
        }
    })
}


//! localstorage
function savelocaltodos(todo) {
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function gettodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo)=>{
          //! create todo div
    const tododiv=document.createElement("div");
    tododiv.classList.add("todo");
    
    //& check mart button
    const completedbutton=document.createElement("button");
    completedbutton.innerHTML=" <i class='fas fa-check-circle'></i>";
    completedbutton.classList.add("complete-btn");
    tododiv.appendChild(completedbutton);

    //& creat todo li
    const newtodo=document.createElement("li");
    newtodo.innerText=todo;
    newtodo.classList.add("todo-item");
    tododiv.appendChild(newtodo);

    //& check delet button
    const trashbutton=document.createElement("button");
    trashbutton.innerHTML="<i class='fas fa-minus-circle'></i>";
    trashbutton.classList.add("trash-btn");
    tododiv.appendChild(trashbutton);

    //! append to list
    todolist.appendChild(tododiv);
    })
}

function removelocalstorage(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    const todoindex=todo.children[1].innerText;
    todos.splice(todos.indexof(todoindex),1);
    localStorage.setItem("todos",JSON.stringify("todos"));
}

gettodos();