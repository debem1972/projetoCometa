document.addEventListener('DOMContentLoaded', () => {
    // Função para detectar se é tablet (768px a 991px) ou mobile (<768px)
    function isTabletOrMobile() {
        return window.innerWidth <= 991;
    }

    // Função para iniciar chamada
    function callPhone() {
        const phoneNumber = "5551986800866";
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.location.href = `tel:${phoneNumber}`;
        } else {
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

    // Configurar tooltips e eventos de clique nos ícones
    document.querySelectorAll('.icon-circle').forEach(icon => {
        const service = icon.getAttribute('data-service');

        // Adicionar atributos de tooltip para tablets e móveis
        if (isTabletOrMobile()) {
            icon.setAttribute('data-bs-toggle', 'tooltip');
            icon.setAttribute('data-bs-placement', 'top');
            switch (service) {
                case 'phone':
                    icon.setAttribute('data-bs-title', 'Ligar: +5551986800866');
                    break;
                case 'whatsapp':
                    icon.setAttribute('data-bs-title', 'Enviar WhatsApp');
                    break;
                case 'email':
                    icon.setAttribute('data-bs-title', 'E-mail: contato@cometaferragem.com.br');
                    break;
                case 'facebook':
                    icon.setAttribute('data-bs-title', 'Visitar Facebook');
                    break;
                case 'instagram':
                    icon.setAttribute('data-bs-title', 'Visitar Instagram');
                    break;
            }
        }

        // Adicionar evento de clique
        icon.addEventListener('click', () => {
            switch (service) {
                case 'phone':
                    callPhone();
                    break;
                case 'whatsapp':
                    window.open('https://wa.me/5551986800866', '_blank');
                    break;
                case 'email':
                    copyEmail();
                    break;
                case 'facebook':
                    window.open('https://facebook.com/cometaferragem', '_blank');
                    break;
                case 'instagram':
                    window.open('https://instagram.com/cometaferragem', '_blank');
                    break;
            }
        });
    });

    // Inicializar tooltips Bootstrap
    if (isTabletOrMobile()) {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new bootstrap.Tooltip(tooltipTriggerEl);
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
    const numberOfParticles = 40;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.8 - 0.4;
            this.speedY = Math.random() * 0.8 - 0.4;
            this.color = Math.random() > 0.5 ? 'rgba(255, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.03;
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

    initParticles();
    animateParticles();

    window.addEventListener('resize', resizeCanvas);
});