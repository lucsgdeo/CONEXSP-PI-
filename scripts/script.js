function carregaDados(){
    const dados = [
        {"id": 0, "nome": "admin", "cpf": 123, "email": "admin@gmail.com", "endereco": "R. teste", "cep": 123, "tipo_sanguineo": "A+", "senha": 123}
    ]
    let dadosJSON = JSON.stringify(dados);
    localStorage.setItem("banco", dadosJSON);
    return dados;
}

function pegaIdMaximo(lista){
    let listaIDs = [] 
    lista.forEach(item => {
        listaIDs.push(item.id);
    })
    return Math.max(...listaIDs);
}

function existe(informacao, banco){
    let existe = false;
    banco.forEach(usuario=> {
        if(informacao == usuario.cpf){
            existe = true;
        }
    })
    return existe;
}

// function cadastra(){
//     const banco = JSON.parse(localStorage.getItem("banco"));

//     let nome = document.getElementById("nome").value;
//     let cpf = document.getElementById("cpf").value;
//     let email = document.getElementById("email").value;
//     let endereco = document.getElementById("endereco").value;
//     let cep = document.getElementById("cep").value;
//     let tiposanguineo = document.querySelector('input[name = "tipo_sanguineo"]:checked').value;
//     let senha = document.getElementById('senha').value;
//     let confirmaSenha = document.getElementById('confirmasenha').value;

//     if(!existe(cpf, banco) && senha == confirmaSenha){
//         proximoId = pegaIdMaximo(banco) + 1;
//         let novoUsuario = {"id": proximoId, "nome": nome, "cpf": cpf, "email": email, "endereco": endereco, "cep": cep, "tipo_sanguineo": tiposanguineo, "senha": senha};
//         banco.push(novoUsuario);
//         localStorage.setItem("banco", JSON.stringify(banco));
//         window.location.replace("Login.html");
//     }
//     else{
//         alert("JA EXISTE");
//     }
// }

function cadastra() {
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const endereco = document.getElementById("endereco").value;
  const cep = document.getElementById("cep").value;
  const tipo_sanguineo = document.querySelector('input[name="tipo_sanguineo"]:checked').value;
  const senha = document.getElementById('senha').value;
  const confirmaSenha = document.getElementById('confirmasenha').value;

  if (senha !== confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
  }

  // Criando o objeto de dados
  const dadosUsuario = {
      nome,
      cpf,
      email,
      endereco,
      cep,
      tipo_sanguineo,
      senha
  };

  // Enviando para o backend
  fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosUsuario)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert("Usuário registrado com sucesso!");
          window.location.replace("Login.html");
      } else {
          alert(data.message);
      }
  })
  .catch(error => {
      console.error("Erro ao registrar usuário:", error);
      alert("Erro ao registrar usuário. Tente novamente.");
  });
}

// function loga(){
//     const banco = JSON.parse(localStorage.getItem("banco"));

//     let cpf = document.getElementById("cpfLogin").value;
//     let email = document.getElementById("emailLogin").value;
//     let senha = document.getElementById('senhaLogin').value;

//     if(existe(cpf, banco)){
//         for(i = 0; i < banco.length; i++){
//             if(cpf == banco[i].cpf && email == banco[i].email && senha == banco[i].senha){
//                 alert("Bem-vindo!");
//                 window.location.replace("index.html");
//                 break;
//             }
//         }
//     }
//     else{
//         alert("Dados incorretos. Tente novamente")
//     }
// }

function loga() {
  const cpf = document.getElementById("cpfLogin").value;
  const email = document.getElementById("emailLogin").value;
  const senha = document.getElementById('senhaLogin').value;

  // Verifique se os campos estão preenchidos antes de enviar a solicitação
  if (!cpf || !email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
  }

  // Envia uma solicitação POST para a rota de login no backend
  fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          cpf: cpf,
          email: email,
          senha: senha
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert("Login bem-sucedido!");
          window.location.replace("index.html"); // Redireciona para a página principal
      } else {
          alert(data.message); // Exibe a mensagem de erro se os dados estiverem incorretos
      }
  })
  .catch(error => {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Tente novamente.");
  });
}
