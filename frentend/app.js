const URL_API = 'https://teste-sigma-eight.vercel.app/usuarios';

// Buscar usuários e exibi-los
async function buscarUsuarios(filtros = {}) {
    const query = new URLSearchParams(filtros).toString();
    const resposta = await fetch(`${URL_API}?${query}`);
    const usuarios = await resposta.json();

    const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = usuarios
        .map(usuario => `
            <div class="usuario">
                <strong>${usuario.nome}</strong>
                <p>${usuario.idade} anos - ${usuario.genero}</p>
                <button onclick="idUsuario('${usuario._id}')">Editar</button>
                <button onclick="deletarUsuario('${usuario._id}')">Excluir</button>
            </div>
        `)
        .join('');
}

// Adicionar um novo usuário
async function adicionarUsuario(evento) {
    evento.preventDefault();
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const genero = document.getElementById('genero').value;

    await fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, idade, genero }),
    });

    buscarUsuarios();
}



const form = document.getElementById('formUsuarioedit')
form.style.display = 'none'

// Atualizar um usuário
let iduser = ''
let arr = {}

document.getElementById('editBtn').addEventListener('click', editarUsuario)

async function idUsuario(id) {
    form.style.display = 'block'
    iduser = id
}

async function editarUsuario() {
    arr.nome = document.getElementById('nomeedit').value;
    arr.idade = document.getElementById('idadeedit').value;
    arr.genero = document.getElementById('generoedit').value;
    
    editarUsuariofinal()

}

async function editarUsuariofinal() { 
    try {
        await fetch(`${URL_API}/${iduser}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(arr)
        });

        arr = ''
        iduser = ''

    } catch (error) {
        console.log(error)
    }

}


// Deletar usuário
async function deletarUsuario(id) {
    await fetch(`${URL_API}/${id}`, { method: 'DELETE' });
    buscarUsuarios();
}

// Filtros
document.getElementById('formUsuario').addEventListener('submit', adicionarUsuario);
document.getElementById('aplicarFiltros').addEventListener('click', () => {
    const idade = document.getElementById('filtroIdade').value;
    const nome = document.getElementById('filtroNome').value;
    const genero = document.getElementById('filtroGenero').value;
    buscarUsuarios({ idade, nome, genero });
});

buscarUsuarios();
