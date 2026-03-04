const form = document.getElementById("form");
const lista = document.getElementById("lista");

let atendimentos = JSON.parse(localStorage.getItem("atendimentos")) || [];

function salvar() {
    localStorage.setItem("atendimentos", JSON.stringify(atendimentos));
}

function ordenarFila() {
    atendimentos.sort((a, b) => {
        return new Date(a.data + " " + a.hora) - new Date(b.data + " " + b.hora);
    });
}

function atualizarLista() {
    lista.innerHTML = "";
    ordenarFila();

    atendimentos.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("atendimento");

        div.innerHTML = `
            <p><strong>Nome:</strong> ${item.nome}</p>
            <p><strong>Tipo:</strong> ${item.tipo}</p>
            <p><strong>Especialidade:</strong> ${item.especialidade}</p>
            <p><strong>Data:</strong> ${item.data}</p>
            <p><strong>Hora:</strong> ${item.hora}</p>
            <p><strong>Posição na fila:</strong> ${index + 1}</p>
            <p class="${item.status === "Pendente" ? "pendente" : "concluido"}">
                Status: ${item.status}
            </p>
            ${item.status === "Pendente"
                ? `<button onclick="cancelar(${item.id})">Cancelar</button>`
                : ""}
        `;

        lista.appendChild(div);
    });

    salvar();
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const novo = {
        id: Date.now(),
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        nascimento: document.getElementById("nascimento").value,
        telefone: document.getElementById("telefone").value,
        tipo: document.getElementById("tipoAtendimento").value,
        especialidade: document.getElementById("especialidade").value,
        data: document.getElementById("data").value,
        hora: document.getElementById("hora").value,
        status: "Pendente"
    };

    atendimentos.push(novo);
    atualizarLista();
    form.reset();
});

function cancelar(id) {
    atendimentos = atendimentos.filter(a => a.id !== id);
    atualizarLista();
}