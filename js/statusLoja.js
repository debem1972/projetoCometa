function atualizarStatusLoja() {
    const agora = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    const diaSemana = agora.getDay();
    const horas = agora.getHours();
    const minutos = agora.getMinutes();

    const horaAtual = horas + (minutos / 60);
    let estaAberto = false;

    switch (diaSemana) {
        case 0: // Domingo
            estaAberto = (horaAtual >= 9 && horaAtual < 12);
            break;
        case 6: // Sábado
            estaAberto = (horaAtual >= 8 && horaAtual < 12) || (horaAtual >= 13 && horaAtual < 17);
            break;
        case 1: // Segunda
        case 2: // Terça
        case 3: // Quarta
        case 4: // Quinta
        case 5: // Sexta
            estaAberto = (horaAtual >= 7.5 && horaAtual < 11.75) || (horaAtual >= 13.5 && horaAtual < 18);
            break;
    }

    const statusElement = document.getElementById("statusLoja");
    statusElement.textContent = estaAberto ? "Aberto agora!" : "Fechado no momento!";
    statusElement.style.color = estaAberto ? "green" : "rgb(255, 0, 0)";

    // Define o conteúdo do tooltip
    statusElement.setAttribute("data-bs-title",
        "Horário de funcionamento:\n" +
        "Seg-Sex: 07:30-11:45 e 13:30-18:00\n" +
        "Sáb: 08:00-12:00 e 13:00-17:00\n" +
        "Dom: 09:00-12:00"
    );

    // Dispara um evento personalizado para atualizar o tooltip
    const evento = new Event("statusAtualizado");
    statusElement.dispatchEvent(evento);
}

// Atualiza a cada minuto
atualizarStatusLoja();
setInterval(atualizarStatusLoja, 60000);