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

// Função para iniciar chamada
function callPhone() {
    const phoneNumber = "5551986800866"; // Número no formato internacional
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = `tel:${phoneNumber}`;
    } else {
        // Para desktops, copia o número para a área de transferência
        navigator.clipboard.writeText("+5551986800866").then(() => {
            alert("Número copiado para a área de transferência: +5551986800866");
        }).catch(err => {
            console.error("Erro ao copiar número: ", err);
        });
    }
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

// Partículas animadas
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

// Ajustar tamanho do canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.contact-section').offsetHeight;
}
resizeCanvas();

const particlesArray = [];
const numberOfParticles = 40; //  densidade das partículas

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Tamanho inicial reduzido de [2, 7] para [1, 4]
        this.speedX = Math.random() * 0.8 - 0.4;  // Velocidade inicial reduzida de [0.5, 1] para [-0.5, 0.5]
        this.speedY = Math.random() * 0.8 - 0.4;  // Velocidade inicial reduzida de [0.5, 1] para [-0.5, 0.5]
        this.color = Math.random() > 0.5 ? 'rgba(255, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.03; // Redução mais lenta para partículas menores

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            particlesArray.push(new Particle());
            i--;
        }
    }
    requestAnimationFrame(animateParticles);
}

// Inicializar partículas e animação
initParticles();
animateParticles();

// Ajustar canvas ao redimensionar
window.addEventListener('resize', resizeCanvas);