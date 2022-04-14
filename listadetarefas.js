const inputtarefa= document.querySelector(".inputtarefa")
const andtarefa = document.querySelector(".andtarefa")
const tarefas = document.querySelector(".tarefas")

function criali(){
    const li = document.createElement('li');
    return li;
}

inputtarefa.addEventListener("keypress", function(e){
  if(e.keyCode === 13){
    if(!inputtarefa.value) return;
    criatarefa(inputtarefa.value)
  }
})

function limpainput(){
    inputtarefa.value = '';
    inputtarefa.focus();
}

function criabotaoapagar(li){
    li.innerText+= ' '
    const botaoapagar = document.createElement('button')
    botaoapagar.innerText = 'Apagar'
    botaoapagar.setAttribute('class', 'apagar')
    botaoapagar.setAttribute('title', 'apagar essa tarefa')
    li.appendChild(botaoapagar)
}

function criatarefa(textoinput){
    const li = criali()
    li.innerText = textoinput;
    tarefas.appendChild(li)
    limpainput()
    criabotaoapagar(li)
    salvartarefa()
}

andtarefa.addEventListener("click", function(){ //função anonima
    if(!inputtarefa.value) return;
    criatarefa(inputtarefa.value)
})

document.addEventListener("click", function(e){
    const el = e.target;
    if (el.classList.contains('apagar')){
        el.parentElement.remove()
        salvartarefa()  
    }
})

function salvartarefa(){
    const litarefas = tarefas.querySelectorAll('li')
    const listadetarefas = [];

    for (let tarefa of litarefas){
        let tarefatexto =  tarefa.innerText
        tarefatexto = tarefatexto.replace('apagar','').trim()
        listadetarefas.push(tarefatexto)
    }

    const tarefajson = JSON.stringify(listadetarefas)
    localStorage.setItem('tarefas', tarefajson)
}

function addsalvar(){
    const tarefas = localStorage.getItem('tarefas')
    const listata = JSON.parse(tarefas)
    for(let tarefa of listata){
        criatarefa(tarefa);
    }
}

addsalvar()