// Recent products (the home page doesn't have a [recentProducts] section yet)
let wrapper = document.querySelector("[recentProducts]");

function recentProducts() {
  if (!wrapper) return;
  try {
    let products = getProducts();
    let latestProducts = products.slice().reverse().slice(0, products.length >> 1);
    latestProducts.forEach((product) => {
      wrapper.innerHTML += `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.productName}" loading="lazy">
                <div class="card-body">
                  <h5 class="card-title">${product.productName}</h5>
                  <p class="card-text">${product.description}</p>
                  <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
            `;
    });
  } catch (e) {
    wrapper.textContent = "Please contact our administrator";
  }
}
recentProducts();
