/**
 * Renderiza los planes desde un JSON y gestiona el carrito con localStorage y los filtros.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar ruta correcta del JSON según la ubicación de tu archivo JS
    fetch('../js/products.json') // O ajusta a 'products.json' dependiendo de tu estructura de carpetas
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar el archivo JSON de productos');
            return response.json();
        })
        .then(products => {
            renderProductCards(products, '#products-container');
            initFilterSystem(products);
        })
        .catch(error => {
            // Intento alternativo de carga por si el archivo está en la raíz
            fetch('products.json')
                .then(res => res.json())
                .then(products => {
                    renderProductCards(products, '#products-container');
                    initFilterSystem(products);
                })
                .catch(err => console.error('Error crítico cargando JSON:', err));
        });
});

function renderProductCards(products, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error(`No se encontró el contenedor con el selector: ${containerSelector}`);
        return;
    }

    container.innerHTML = '';

    products.forEach(product => {
        const featuredClass = product.isFeatured ? 'featured' : '';
        const tagClass = product.isFeatured ? 'plan-tag recommended' : 'plan-tag';
        const buttonClass = product.isFeatured ? 'btn btn-af-primary add-to-cart' : 'btn btn-af-outline add-to-cart';

        const featuresHtml = product.features.map(feature => `
            <li><i class="bi bi-check2"></i> <span>${feature}</span></li>
        `).join('');

        const cardHtml = `
            <div class="col-md-6 col-lg-4 product-item" data-category="${product.category}">
              <div class="plan-card ${featuredClass}">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="plan-icon"><i class="bi ${product.icon}"></i></div>
                    <span class="${tagClass}">${product.tag}</span>
                  </div>
                  <h3 class="h4 fw-bold mb-1">${product.title}</h3>
                  <p class="text-muted small mb-4">${product.description}</p>
                  
                  <div class="d-flex align-items-baseline gap-1 mb-2">
                    <span class="plan-price">$${product.price}</span>
                    <span class="plan-currency">${product.currency}</span>
                  </div>
      
                  <ul class="feature-list">
                    ${featuresHtml}
                  </ul>
                </div>
                <button class="${buttonClass}" 
                        data-id="${product.id}" 
                        data-product="${product.title}" 
                        data-price="${product.price}">
                  Agregar al Carrito <i class="bi bi-plus-lg ms-1"></i>
                </button>
              </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', cardHtml);
    });

    initCartListeners();
}

function initCartListeners() {
    const cartButtons = document.querySelectorAll('.add-to-cart');

    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productData = {
                id: e.currentTarget.getAttribute('data-id'),
                name: e.currentTarget.getAttribute('data-product'),
                price: parseFloat(e.currentTarget.getAttribute('data-price')),
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('af_cart')) || [];
            const existingIndex = cart.findIndex(item => item.id === productData.id);
            
            if (existingIndex > -1) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push(productData);
            }

            localStorage.setItem('af_cart', JSON.stringify(cart));
            alert(`¡"${productData.name}" agregado al carrito!`);
        });
    });
}

function initFilterSystem(products) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const countLabel = document.getElementById('solutions-count');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const productItems = document.querySelectorAll('.product-item');
            let visibleCount = 0;

            productItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            if (countLabel) {
                countLabel.textContent = `${visibleCount} ${visibleCount === 1 ? 'solución disponible' : 'soluciones disponibles'}`;
            }
        });
    });
}