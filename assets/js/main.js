// To do list
function scope(){
    const textarea = document.querySelector(".adicionar textarea")
    const lista = document.querySelector(".lista")
    const span = document.querySelector(".up span")
    let itensLista

    // Atualizando o array de itens
    function atualizarLista(){
        itensLista = Array.from(document.querySelectorAll(".lista li"))
    }


    // Criando alerta
    function alertaNull(valor){
        if(valor == true){
            span.style.display = "block"
        } else{
            span.style.display = "none"
        }
    }
    
    // Criando item / Adicionando ao array
    let idItem = 0
    function include(valor){
        if(valor != false){
            lista.innerHTML += `<li class="${idItem}"><p>${valor}</p><button id="${idItem}" class="apagar" type="button">Apagar</button></li>`
            ++idItem
            atualizarLista()
            alertaNull(false)
            textarea.value = null
            salvarItem()

        } else {
            alertaNull(true)
        }
    }

    // Enviando tarefa com "Enter"
    textarea.addEventListener("keypress", (e) => {
        if(e.keyCode === 13){
            include(textarea.value)
        }
    })

    // Salvando item
    function salvarItem(){
        atualizarLista()
        let tarefas = [] 
        for(let item of itensLista){ 
            let msg = item.innerText.replace(`Apagar`, "").trim()
            tarefas.push(msg)
        }
        const packTarefas = JSON.stringify(tarefas)
        localStorage.setItem("tarefas", packTarefas) 
    }

    // Procurando item para exclusão
    function procurandoItem(arr, idEl){
        for(let item of arr){
            if(item.classList.contains(`${idEl}`)){
                lista.removeChild(item)
            }
        }
        salvarItem()
    }

    // Capturando os itens do localStorage
    function captTarefasSalvas(){
        let dadosSalvos = localStorage.getItem("tarefas")
        let dadosSalvosConvert = JSON.parse(dadosSalvos)
        for(let item of dadosSalvosConvert){
            include(item)
        }

    }
    captTarefasSalvas()
    
    // Evento click
    document.addEventListener("click", (e) => {
        let el = e.target

        if(el.classList.contains("Enviar")){
            include(textarea.value)
        }

        if(el.classList.contains("apagar")){
           procurandoItem(itensLista, el.id)
        }
    })
}
scope()