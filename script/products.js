let container = document.querySelector("[ourStore]");
let searchProduct = document.querySelector("[searchProduct]");
let sortingByAmount = document.querySelector("[sorting]");
let categoryFilter = document.querySelector("[categoryFilter]");

let products = getProducts();

// Function to display products
function displayProducts(products) {
  container.innerHTML = ""; // Clear existing products

  products.forEach((product) => {
    container.innerHTML += `
            <div class="col">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.productName}">
                    <div class="card-body">
                        <h5 class="card-title">${product.productName}</h5>
                        <p class="card-text">${product.description.substring(0, 100)}...</p>
                        <p class="card-text">R ${product.amount.toFixed(2)}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
  });
}

// Search and category filter work together on the current sort order
function applyFilters() {
  const searchText = searchProduct.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      (product.productName.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText))
  );

  if (filteredProducts.length === 0) {
    container.innerHTML = `<div class="alert alert-warning">No matching products found</div>`;
  } else {
    displayProducts(filteredProducts);
  }
}

searchProduct.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

// Sorting functionality
let ascendingOrder = true; // Default sort order

sortingByAmount.addEventListener("click", () => {
  products.sort((a, b) =>
    ascendingOrder ? a.amount - b.amount : b.amount - a.amount
  );
  applyFilters();
  sortingByAmount.textContent = ascendingOrder
    ? "Sorted by lowest amount"
    : "Sorted by highest amount";
  ascendingOrder = !ascendingOrder; // Toggle sort order
});

// Add to cart (one listener for every card's button)
container.addEventListener("click", (event) => {
  if (!event.target.classList.contains("add-to-cart")) return;
  const product = addProductToCart(Number(event.target.dataset.id));
  if (product) {
    showCartToast(`${product.productName} has been added to your cart!`);
  }
});

function showCartToast(message) {
  document.querySelector("[cartToastMessage]").textContent = message;
  bootstrap.Toast.getOrCreateInstance(
    document.querySelector("[cartToast]")
  ).show();
}

displayProducts(products);
