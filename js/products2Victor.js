// products.js
// Contém toda a lógica específica da seção #products: cliques nas abas, filtragem por busca, autocompletar, ordenação alfabética e estado inicial.

// Category Tabs and Filtering
const categoryTabs = document.querySelectorAll('.category-tab');
const productGrids = document.querySelectorAll('.product-grid');
const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('suggestions');
const searchIcon = document.querySelector('.search-icon');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        categoryTabs.forEach(t => {
            t.classList.remove('active');
            t.classList.remove('belongsTo');
        });
        tab.classList.add('active');

        const category = tab.getAttribute('data-category');

        productGrids.forEach(grid => {
            grid.style.display = 'none';
            grid.querySelectorAll('.product-card').forEach(card => {
                card.style.display = 'block';
            });
        });

        if (category === 'all') {
            productGrids.forEach(grid => {
                grid.style.display = 'grid';
            });
        } else {
            const selectedGrid = document.getElementById(category);
            selectedGrid.style.display = 'grid';
        }

        searchInput.value = '';
        suggestionsBox.innerHTML = '';
        suggestionsBox.classList.remove('show');
        searchIcon.classList.remove('hidden'); // Mostra o ícone ao limpar
    });
});

// Search and Autocomplete
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
        showSuggestions(query);
        searchIcon.classList.add('hidden'); // Esconde o ícone ao digitar
    } else {
        suggestionsBox.innerHTML = '';
        suggestionsBox.classList.remove('show');
        filterProducts('');
        searchIcon.classList.remove('hidden'); // Mostra o ícone quando vazio
        // Restaurar aba "Todos" como ativa ao limpar
        categoryTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.classList.remove('belongsTo');
            if (tab.getAttribute('data-category') === 'all') {
                tab.classList.add('active');
            }
        });
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.toLowerCase().trim();
        filterProducts(query);
        suggestionsBox.innerHTML = '';
        suggestionsBox.classList.remove('show');
        if (!query) searchIcon.classList.remove('hidden'); // Garante que o ícone reapareça se Enter limpar
    }
});

function showSuggestions(query) {
    suggestionsBox.innerHTML = '';
    const allProducts = [];

    productGrids.forEach(grid => {
        grid.querySelectorAll('.product-card').forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            if (name.includes(query) || title.includes(query)) {
                allProducts.push({
                    title: card.querySelector('.product-title').textContent,
                    card: card
                });
            }
        });
    });

    if (allProducts.length > 0) {
        allProducts.forEach(product => {
            const suggestion = document.createElement('div');
            suggestion.classList.add('suggestion-item');
            suggestion.textContent = product.title;
            suggestion.addEventListener('click', () => {
                filterSpecificProduct(product.title);
                suggestionsBox.innerHTML = '';
                suggestionsBox.classList.remove('show');
                searchInput.value = product.title;
            });
            suggestionsBox.appendChild(suggestion);
        });
        suggestionsBox.classList.add('show');
    } else {
        const noResult = document.createElement('div');
        noResult.classList.add('no-results');
        noResult.textContent = 'Produto não localizado no site! Entre em contato conosco para ver a disponibilidade!';
        suggestionsBox.appendChild(noResult);
        suggestionsBox.classList.add('show');
    }
}

function filterProducts(query) {
    let hasMatches = false;
    productGrids.forEach(grid => {
        const products = grid.querySelectorAll('.product-card');
        let hasVisibleProducts = false;

        products.forEach(product => {
            const name = product.getAttribute('data-name').toLowerCase();
            const title = product.querySelector('.product-title').textContent.toLowerCase();
            if (name.includes(query) || title.includes(query)) {
                product.style.display = 'block';
                hasVisibleProducts = true;
                hasMatches = true;
            } else {
                product.style.display = 'none';
            }
        });

        grid.style.display = hasVisibleProducts ? 'grid' : 'none';
    });

    if (query && !hasMatches) {
        suggestionsBox.innerHTML = '<div class="no-results">Produto não localizado no site! Entre em contato conosco para ver a disponibilidade!</div>';
        suggestionsBox.classList.add('show');
    }

    if (query) {
        categoryTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.classList.remove('belongsTo');
        });
        categoryTabs[0].classList.add('active');
    } else {
        categoryTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.classList.remove('belongsTo');
            if (tab.getAttribute('data-category') === 'all') {
                tab.classList.add('active');
            }
        });
    }
}

function filterSpecificProduct(title) {
    let selectedCategory = null;

    productGrids.forEach(grid => {
        const products = grid.querySelectorAll('.product-card');
        let hasVisibleProducts = false;

        products.forEach(product => {
            const productTitle = product.querySelector('.product-title').textContent;
            if (productTitle === title) {
                product.style.display = 'block';
                hasVisibleProducts = true;
                selectedCategory = grid.getAttribute('id'); // Identifica a categoria do produto
            } else {
                product.style.display = 'none';
            }
        });

        grid.style.display = hasVisibleProducts ? 'grid' : 'none';
    });

    // Destacar a aba da categoria correspondente com .belongsTo
    if (selectedCategory) {
        categoryTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.classList.remove('belongsTo');
            if (tab.getAttribute('data-category') === selectedCategory) {
                tab.classList.add('belongsTo');
            }
        });
    }
}

// Sort Product Cards Alphabetically
productGrids.forEach(grid => {
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    cards.sort((a, b) => {
        const titleA = a.querySelector('.product-title').textContent.toLowerCase();
        const titleB = b.querySelector('.product-title').textContent.toLowerCase();
        return titleA.localeCompare(titleB);
    });
    cards.forEach(card => grid.appendChild(card));
});

// Set Initial State
productGrids.forEach(grid => {
    grid.style.display = 'grid';
});


//lógica do modal
// Adiciona evento de clique em cada botão "Detalhes"
function openProductModal(button) {
    const card = button.closest('.product-card');
    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalDetailsList = document.getElementById('modal-details-list');
    const modalWhatsapp = document.getElementById('modal-whatsapp');

    // Obter dados do produto
    const imgSrc = card.querySelector('.product-img').src;
    const title = card.querySelector('.product-title').textContent;
    const price = card.querySelector('.product-price').textContent;
    const description = card.querySelector('.product-description').textContent;
    const details = JSON.parse(card.dataset.details);

    // Preencher o modal
    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalDescription.textContent = description;

    // Preencher especificações técnicas
    modalDetailsList.innerHTML = '';
    for (const [key, value] of Object.entries(details)) {
        const li = document.createElement('li');
        li.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
        modalDetailsList.appendChild(li);
    }

    // Configurar link do WhatsApp
    const whatsappNumber = '+5551986800866'; // Substitua pelo número real
    const whatsappMessage = `Olá, estou interessado no ${title}! Pode me dar mais detalhes?`;
    modalWhatsapp.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Exibir o modal
    modal.style.display = 'block';
}

// Fechar o modal
document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('productModal').style.display = 'none';
});

// Fechar o modal ao clicar fora
document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.currentTarget.style.display = 'none';
    }
});

// Fechar o modal com a tecla Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('productModal').style.display === 'block') {
        document.getElementById('productModal').style.display = 'none';
    }
});