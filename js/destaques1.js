function openHighlightModal(button) {
    const carouselItem = button.closest('.carousel-item');
    const modal = document.getElementById('highlightModal');
    const modalImg = document.getElementById('highlight-modal-img');
    const modalTitle = document.getElementById('highlight-modal-title');
    const modalPrice = document.getElementById('highlight-modal-price');
    const modalDescription = document.getElementById('highlight-modal-description');
    const modalDetailsList = document.getElementById('highlight-modal-details-list');
    const modalWhatsapp = document.getElementById('highlight-modal-whatsapp');

    // Obter dados do produto
    const imgSrc = carouselItem.querySelector('img').src;
    const title = carouselItem.querySelector('h3').textContent;
    const description = carouselItem.querySelector('p').textContent;
    let price = 'Consultar preço'; // Fallback caso o preço não esteja em data-details
    let details = {};

    // Parse seguro dos data-details
    try {
        details = JSON.parse(carouselItem.dataset.details);
        price = details.price || price; // Usa o preço de data-details, se disponível
        delete details.price; // Remove o preço para não exibi-lo na lista de detalhes
    } catch (e) {
        console.error('Erro ao parsear data-details:', e);
        modalDetailsList.innerHTML = '<li>Erro ao carregar especificações técnicas</li>';
    }

    // Preencher o modal
    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalDescription.textContent = description;

    // Preencher especificações técnicas
    modalDetailsList.innerHTML = '';
    if (Object.keys(details).length > 0) {
        for (const [key, value] of Object.entries(details)) {
            const li = document.createElement('li');
            li.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
            modalDetailsList.appendChild(li);
        }
    } else {
        modalDetailsList.innerHTML = '<li>Sem especificações disponíveis</li>';
    }

    // Configurar link do WhatsApp
    const whatsappNumber = '+5551986800866';
    const whatsappMessage = `Olá, estou interessado no ${title}! Pode me dar mais detalhes?`;
    modalWhatsapp.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Exibir o modal
    modal.style.display = 'block';
}

// Fechar o modal
document.querySelector('#highlightModal .modal-close').addEventListener('click', () => {
    document.getElementById('highlightModal').style.display = 'none';
});

// Fechar o modal ao clicar fora
document.getElementById('highlightModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.currentTarget.style.display = 'none';
    }
});

// Fechar o modal com a tecla Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('highlightModal').style.display === 'block') {
        document.getElementById('highlightModal').style.display = 'none';
    }
});