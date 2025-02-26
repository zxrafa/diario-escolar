// Configuração do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializando o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Referência do formulário
const formTarefa = document.getElementById('form-tarefa');
const listaTarefas = document.getElementById('tarefas-lista');

// Função para adicionar uma tarefa no Firestore
formTarefa.addEventListener('submit', async (event) => {
    event.preventDefault();

    const materia = document.getElementById('materia').value;
    const descricao = document.getElementById('descricao').value;
    const data = document.getElementById('data').value;

    await db.collection('tarefas').add({
        materia,
        descricao,
        data
    });

    // Limpar o formulário
    formTarefa.reset();

    // Atualizar a lista de tarefas
    carregarTarefas();
});

// Função para carregar as tarefas do Firestore
async function carregarTarefas() {
    listaTarefas.innerHTML = '';  // Limpa a lista

    const tarefasSnapshot = await db.collection('tarefas').get();
    tarefasSnapshot.forEach(doc => {
        const tarefa = doc.data();
        const li = document.createElement('li');
        li.innerHTML = `<strong>${tarefa.materia}</strong>: ${tarefa.descricao} (Data: ${tarefa.data})`;
        listaTarefas.appendChild(li);
    });
}

// Carregar as tarefas ao iniciar
carregarTarefas();
