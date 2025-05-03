// Inicializar Vanilla Tilt nas imagens dos cards
VanillaTilt.init(document.querySelectorAll('.product-img'), {
    max: 15, // Ângulo máximo de inclinação (menor que o exemplo para um efeito mais sutil)
    speed: 400, // Velocidade da animação
    glare: true, // Ativa o brilho
    'max-glare': 0.3 // Intensidade do brilho (menor para não sobrecarregar visualmente)
});