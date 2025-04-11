// Variável para controlar o serviço atualmente ativo
let activeService = null;

// Adicionar eventos de clique a todos os ícones
document.querySelectorAll('.icon-circle').forEach(icon => {
    icon.addEventListener('click', function () {
        const service = this.getAttribute('data-service');
        const serviceElement = document.getElementById(service + '-service');

        // Se já existe um serviço ativo e não é o mesmo que foi clicado
        if (activeService && activeService !== service) {
            // Desativa o serviço anterior
            document.getElementById(activeService + '-service').classList.remove('active');
        }

        // Alterna a visibilidade do serviço clicado
        serviceElement.classList.toggle('active');

        // Atualiza o serviço ativo
        activeService = serviceElement.classList.contains('active') ? service : null;
    });
});

// Função para "ligar" para o telefone
function callPhone() {
    window.location.href = 'tel:+5551986800866';
}

// Função para copiar e-mail
function copyEmail() {
    const email = 'contato@cometaferragem.com.br';
    navigator.clipboard.writeText(email).then(() => {
        alert('E-mail copiado para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}