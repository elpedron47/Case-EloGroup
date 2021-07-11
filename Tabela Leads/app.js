/* ABRIR E FECHAR O MODAL */

function openModal() {
    document.getElementById('modal-1').style.display = 'block';
    document.body.classList.add('jw-modal-open');
}

function closeModal() {
    document.getElementById('modal-1').style.display = 'none';
    document.body.classList.remove('jw-modal-open');
}

/* CHECKBOX QUE DESMARCA */

function marcarTodos(radio) {
    const itens = document.querySelectorAll('.check');

    for(current of itens) {
        current.checked = radio.checked;
    }
}

/* ARMAZENAR O LEAD NO BANCO DE DADOS (LOCALSTORAGE) */

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    persistir(a) {
       let id = this.getProximoId()
       localStorage.setItem(id, JSON.stringify(a))
       localStorage.setItem('id', id)
    }

    recuperarLeads() {

        let leads = Array()

        let id = localStorage.getItem('id')
        for(let i = 1; i <= id; i++) {
            let infLead = JSON.parse(localStorage.getItem(i))

            if (infLead === null) {
                continue
            }

            leads.push(infLead)
        }

        return leads
    }
}

let bd = new Bd()

/* CRIAÇÇÃO DO LEAD */
class Lead {
    constructor(nome, telefone, email, 
        rpa, produtoDigital, analytics, bpm) {
            this.nome = nome
            this.telefone = telefone
            this.email = email
            this.rpa = rpa
            this.produtoDigital = produtoDigital
            this.analytics = analytics
            this.bpm = bpm
        }
}

function adicionarLead() {
    let nome = document.querySelector('#nome').value;
    let telefone = document.querySelector('#telefone').value;
    let email = document.querySelector('#email').value;
    let rpa = document.querySelector('#rpa').checked;
    let produtoDigital = document.querySelector('#produto-digital').checked;
    let analytics = document.querySelector('#analytics').checked;
    let bpm = document.querySelector('#bpm').checked;
    let alerta = document.querySelector('.alerta');
    let alerta2 = document.querySelector('.alerta2');
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    let lead = new Lead(nome,telefone,email,rpa,produtoDigital,analytics,bpm)
    
    
    if (nome === "" && telefone === "" && email === "") {
        alerta.textContent = "Você precisa informar um nome, número de telefone e endereço de email válido."
    } else {
        if (nome === "") {
            alerta.textContent = "Informe um nome válido."
        } else {
            alerta.textContent = ""
            if (telefone === "" || isNaN(telefone)) {
                alerta.textContent = "Informe um número de telefone válido."
            } else {
                alerta.textContent = ""
                if (email === "") {
                    alerta.textContent = "Informe um endereço de email válido."
                } else if (!email.match(pattern)) {
                    alerta.textContent = "Informe um endereço de email válido."
                } else {
                    bd.persistir(lead)
                    setTimeout(function() {
                        window.location.reload(1);
                      }, 750);
                     alert("Lead cadastrado com sucesso.")
                     
                }
            }
        }
        
    }
}

/* ADICIONAR O LEAD NA TABELA */

function carregarLeads() {
    
    let leads = Array ()
    leads = bd.recuperarLeads()

    for(let i = 0; i < leads.length ; i++) {
        const table = document.querySelector('.tabela')
        const tr = document.createElement('tr')
        const th = document.createElement('th')
        tr.innerHTML = `<th class="tabela-1 dropzone"><p class="drag-lead" draggable="true">${leads[i].nome}</p></th>
        <th class="tabela-1 dropzone"><p class="drag-lead" draggable="true"></p></th>
        <th class="tabela-1 dropzone"><p class="drag-lead" draggable="true"></p></th>`
        table.appendChild(tr)
    }

    /* DRAG AND DROP */

    const nomeLeads = document.querySelectorAll('.drag-lead')
    const dropzones = document.querySelectorAll('.dropzone')

    nomeLeads.forEach(nomeLead => {
        nomeLead.addEventListener('dragstart', dragstart)
        nomeLead.addEventListener('drag', drag)
        nomeLead.addEventListener('dragend', dragend)
    })

    function dragstart() {

       this.classList.add('is-dragging')
    }

    function drag() {
    }

    function dragend() {

       this.classList.remove('is-dragging')
}

    /* DROP ZONE */

    dropzones.forEach( dropzone => {
        dropzone.addEventListener('dragenter', dragenter)
        dropzone.addEventListener('dragover', dragover)
        dropzone.addEventListener('dragleave', dragleave)
        dropzone.addEventListener('drop', drop)
    })

    function dragenter() {
    }

    function dragover() {
        this.classList.add('over')

        const cardDrag = document.querySelector('.is-dragging')

        this.appendChild(cardDrag)
    }

    function dragleave() {
        this.classList.remove('over')
    }

    function drop(){
    }

}
