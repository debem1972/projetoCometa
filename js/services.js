// Inicializar AOS Animation
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Conteúdo dinâmico para o modal
    const serviceDetails = {
        'entrada-energia': {
            title: 'Construção e Reforma de Entrada de Energia',
            content: `
                <div class="row">
                    <div class="col-md-5">
                        <img src="/api/placeholder/400/300" alt="Entrada de Energia" class="img-fluid rounded mb-4">
                    </div>
                    <div class="col-md-7">
                        <h4 class="mb-3" style="color: #e60000;">Construção e Reforma de Entrada de Energia</h4>
                        <p>Nossa equipe especializada realiza instalação e adequação de padrões de entrada de energia para:</p>
                        <ul>
                            <li>Residências (monofásico, bifásico e trifásico)</li>
                            <li>Comércios (com demandas variadas)</li>
                            <li>Indústrias (com subestações e cabines)</li>
                        </ul>
                        <p>Todos os serviços são executados com materiais de alta qualidade e seguindo rigorosamente as normas técnicas da ABNT e exigências das concessionárias locais.</p>
                    </div>
                </div>
                <div class="mt-4">
                    <h5 class="mb-3">O que inclui este serviço:</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul>
                                <li>Análise e dimensionamento de carga</li>
                                <li>Projeto e documentação</li>
                                <li>Instalação de postes e caixas</li>
                                <li>Montagem de quadros de distribuição</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                <li>Instalação de disjuntores e dispositivos de proteção</li>
                                <li>Aterramento conforme normas</li>
                                <li>Acompanhamento junto à concessionária</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        'manutencao': {
            title: 'Manutenção Elétrica',
            content: `
                <div class="row">
                    <div class="col-md-5">
                        <img src="/api/placeholder/400/300" alt="Manutenção Elétrica" class="img-fluid rounded mb-4">
                    </div>
                    <div class="col-md-7">
                        <h4 class="mb-3" style="color: #e60000;">Manutenção Elétrica Profissional</h4>
                        <p>Realizamos manutenção elétrica preventiva e corretiva para:</p>
                        <ul>
                            <li>Residências (casas e apartamentos)</li>
                            <li>Comércios (lojas, escritórios e estabelecimentos)</li>
                            <li>Indústrias (fábricas e plantas industriais)</li>
                        </ul>
                        <p>Nossa equipe utiliza equipamentos modernos para diagnóstico e solução de problemas elétricos, garantindo maior segurança e eficiência para sua instalação.</p>
                    </div>
                </div>
                <div class="mt-4">
                    <h5 class="mb-3">Serviços de manutenção inclusos:</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul>
                                <li>Diagnóstico de problemas elétricos</li>
                                <li>Reparo de circuitos</li>
                                <li>Substituição de componentes</li>
                                <li>Balanceamento de fases</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                <li>Verificação de aterramento</li>
                                <li>Termografia para identificação de pontos quentes</li>
                                <li>Manutenção preventiva programada</li>
                                <li>Laudos técnicos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        'redes': {
            title: 'Projeto e Execução de Redes',
            content: `
                <div class="row">
                    <div class="col-md-5">
                        <img src="/api/placeholder/400/300" alt="Redes Elétricas" class="img-fluid rounded mb-4">
                    </div>
                    <div class="col-md-7">
                        <h4 class="mb-3" style="color: #e60000;">Projeto, Execução e Manutenção de Redes</h4>
                        <p>Atuamos no projeto, execução e manutenção de:</p>
                        <ul>
                            <li>Redes de baixa tensão (até 1kV)</li>
                            <li>Redes de média tensão (até 36,2kV)</li>
                            <li>Instalações aéreas e subterrâneas</li>
                        </ul>
                        <p>Nossos projetos são desenvolvidos por engenheiros especializados, garantindo soluções eficientes e adequadas às necessidades específicas de cada cliente.</p>
                    </div>
                </div>
                <div class="mt-4">
                    <h5 class="mb-3">O que contempla este serviço:</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul>
                                <li>Levantamento de carga e dimensionamento</li>
                                <li>Projetos executivos completos</li>
                                <li>Instalação de postes e estruturas</li>
                                <li>Lançamento de cabos e conexões</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                <li>Montagem de subestações</li>
                                <li>Construção de redes rurais</li>
                                <li>Manutenção preventiva</li>
                                <li>Atendimento emergencial</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        'transformadores': {
            title: 'Substituição e Manutenção de Transformadores',
            content: `
                <div class="row">
                    <div class="col-md-5">
                        <img src="/api/placeholder/400/300" alt="Transformadores" class="img-fluid rounded mb-4">
                    </div>
                    <div class="col-md-7">
                        <h4 class="mb-3" style="color: #e60000;">Serviços Especializados em Transformadores</h4>
                        <p>Oferecemos serviços completos para transformadores de energia:</p>
                        <ul>
                            <li>Substituição de transformadores antigos ou danificados</li>
                            <li>Manutenção preventiva e corretiva</li>
                            <li>Análise de óleo e ensaios elétricos</li>
                            <li>Instalação de novos equipamentos</li>
                        </ul>
                        <p>Nossa equipe possui experiência e credenciamento para trabalhar com transformadores de diversas potências e aplicações.</p>
                    </div>
                </div>
                <div class="mt-4">
                    <h5 class="mb-3">Serviços específicos para transformadores:</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul>
                                <li>Ensaios de relação de transformação</li>
                                <li>Medição de resistência de isolamento</li>
                                <li>Verificação de temperatura</li>
                                <li>Substituição de óleo isolante</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                <li>Ajustes de TAPs</li>
                                <li>Limpeza de isoladores</li>
                                <li>Tratamento de óleo</li>
                                <li>Reparo de vazamentos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        }
    };

    // Configurar o modal para mostrar conteúdo dinâmico
    const serviceModal = document.getElementById('serviceModal');
    if (serviceModal) {
        serviceModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const serviceType = button.getAttribute('data-service');
            const modalTitle = serviceModal.querySelector('.modal-title');
            const modalContent = document.getElementById('modalContent');

            if (serviceDetails[serviceType]) {
                modalTitle.textContent = serviceDetails[serviceType].title;
                modalContent.innerHTML = serviceDetails[serviceType].content;
            }
        });
    }

    // Efeito de rolagem suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});