function recentProducts() {
    try{
        const latestProducts = products.slice(-Math.floor(products.length / 2));
        const cards = latestProducts.map(product => `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.productName}" loading="lazy">
                <div class="card-body">
                  <h5 class="card-title">${product.productName}</h5>
                  <p class="card-text">${product.description}</p>
                </div>
            </div>
        `);
        wrapper.innerHTML = cards.join('');
    } catch (e) {
        wrapper.textContent = "Please contact our administrator"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ... existing code
    recentProducts();
});
