//Ativa o tooltip
// Verifica se o DOM está completamente carregado antes de executar o código
/*document.addEventListener("DOMContentLoaded", function () {
    // Inicializa todos os elementos com data-bs-toggle="tooltip"
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});*/
//Erro...não funcionou...
//Novo código...
document.addEventListener("DOMContentLoaded", function () {
    // Função para inicializar ou atualizar o tooltip
    function inicializarTooltip() {
        const statusElement = document.getElementById("statusLoja");
        // Remove qualquer tooltip existente para evitar duplicatas
        if (statusElement._tooltip) {
            statusElement._tooltip.dispose();
        }
        // Inicializa o tooltip
        new bootstrap.Tooltip(statusElement);
    }

    // Chama a inicialização após o primeiro carregamento do status
    inicializarTooltip();

    // Opcional: Escuta por mudanças no status para atualizar o tooltip
    document.getElementById("statusLoja").addEventListener("statusAtualizado", inicializarTooltip);
});