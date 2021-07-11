class Conta {
    constructor(usuario,senha,confSenha) {
        this.usuario = usuario
        this.senha = senha
        this.confSenha = confSenha
    }
}

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
}

let bd = new Bd()

function criarRegistro() {
    let usuario = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;
    let confSenha = document.getElementById('conf-senha').value;
    let user = document.getElementById('user');
    let password = document.getElementById('password1');
    let password2 = document.getElementById('password2');
    let contaCriada = document.getElementById('contaCriada');
    let pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    let conta = new Conta(usuario,senha,confSenha)

    function verificaInput() {
        if (usuario === "") {
            user.textContent = "Informe seu nome de usuário."
        } else {
            user.textContent = ""
        }
        if (senha === "") {
            password.textContent = "Informe sua senha."
        } else {
            password.textContent = ""
        }
        if (confSenha === "") {
            password2.textContent = "Informe sua senha novamente."
        } else {
            password2.textContent = ""
        }

        if (usuario !== "" && senha !== "" && confSenha !== "") {
            if (senha !== confSenha) {
                password.textContent = "As senhas não coincidem.";
                password2.textContent = "As senhas não coincidem.";
            } else {
                if (senha.match(pattern) && confSenha.match(pattern)) {
                    contaCriada.textContent = "Registro feito com sucesso!";
                    bd.persistir(conta)
                    setTimeout(function() {
                        window.location.reload(1);
                      }, 1000);
                } else {
                    password2.textContent = "A sua senha deve possuir ao menos 8 caracteres contendo um caracter especial, um caracter numérico e um caracter alfanumérico";
                }
            }
        }
    }

    verificaInput()

    

}

