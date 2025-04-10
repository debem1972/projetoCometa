// Category Tabs and Filtering
const categoryTabs = document.querySelectorAll('.category-tab');
const productGrids = document.querySelectorAll('.product-grid');
const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('suggestions');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
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
    });
});

// Search and Autocomplete
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
        showSuggestions(query);
    } else {
        suggestionsBox.innerHTML = '';
        suggestionsBox.classList.remove('show');
        filterProducts(''); // Reset filter when input is empty
    }
});

// Filter on Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.toLowerCase().trim();
        filterProducts(query);
        suggestionsBox.innerHTML = '';
        suggestionsBox.classList.remove('show');
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
        categoryTabs.forEach(tab => tab.classList.remove('active'));
        categoryTabs[0].classList.add('active');
    }
}

function filterSpecificProduct(title) {
    productGrids.forEach(grid => {
        const products = grid.querySelectorAll('.product-card');
        let hasVisibleProducts = false;

        products.forEach(product => {
            const productTitle = product.querySelector('.product-title').textContent;
            if (productTitle === title) {
                product.style.display = 'block';
                hasVisibleProducts = true;
            } else {
                product.style.display = 'none';
            }
        });

        grid.style.display = hasVisibleProducts ? 'grid' : 'none';
    });
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back to Top Button Visibility
window.addEventListener('scroll', () => {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

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

// Smooth Scroll for Navbar Links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Set initial state (show all grids)
productGrids.forEach(grid => {
    grid.style.display = 'grid';
});
