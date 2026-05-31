const input=document.getElementById("todoinput")
const btn=document.getElementById("add")
const list=document.getElementById("list")
let todoarray=JSON.parse(localStorage.getItem("todos"))||[]
todoarray.forEach((item)=>rendertask(item))
btn.addEventListener("click",add)
function add(){
    const todotext=input.value.trim()
    const todoobj={
        id:Date.now().toString(),
        todotextvalue:todotext,
        completed:false

    }
    todoarray.push(todoobj)
    savetolocal()
    rendertask(todoobj)
    input.value=""

}
function rendertask(task){
    const li=document.createElement("li")
    li.setAttribute("data-id",task.id)
    li.innerHTML=`<span class="todo-text">${task.todotextvalue}</span><button>delete</button>`
    list.appendChild(li)
    li.querySelector(".todo-text").addEventListener("click",function(){
        task.completed = !task.completed
        li.classList.toggle("completed",task.completed)
        savetolocal()
        
    })
    li.querySelector("button").addEventListener("click",function(e){
        e.stopPropagation()
        todoarray=todoarray.filter((item)=>item.id !== task.id)
        li.remove()
        savetolocal()
    })
}
    function savetolocal(){
        localStorage.setItem("todos",JSON.stringify(todoarray))
    }

