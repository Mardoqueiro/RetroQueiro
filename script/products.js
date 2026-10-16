let productGrid = document.querySelector("[ourStore]");
let searchInput = document.querySelector("[searchProduct]");
let categorySelect = document.querySelector("[categoryFilter]");
let sortSelect = document.querySelector("[sortProducts]");
let resultsCount = document.querySelector("[resultsCount]");
let emptyState = document.querySelector("[emptyState]");

let products = getProducts();

// Categories come from the products, so ones added on the admin page show up too
getCategories(products).forEach((category) => {
  categorySelect.add(new Option(category, category));
});

const sorters = {
  featured: () => 0,
  "price-asc": (a, b) => a.amount - b.amount,
  "price-desc": (a, b) => b.amount - a.amount,
  name: (a, b) => a.productName.localeCompare(b.productName),
};

// Search, category and sort all apply together
function renderProducts() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;

  const visibleProducts = products
    .filter(
      (product) =>
        (!selectedCategory || product.category === selectedCategory) &&
        (product.productName.toLowerCase().includes(searchText) ||
          product.category.toLowerCase().includes(searchText))
    )
    .sort(sorters[sortSelect.value]);

  productGrid.innerHTML = visibleProducts.map(renderProductCard).join("");
  resultsCount.textContent = `${visibleProducts.length} ${
    visibleProducts.length === 1 ? "product" : "products"
  }`;
  emptyState.hidden = visibleProducts.length > 0;
}

searchInput.addEventListener("input", renderProducts);
categorySelect.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);

document.querySelector("[resetFilters]").addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "";
  sortSelect.value = "featured";
  renderProducts();
});

bindAddToCart(productGrid);
renderProducts();
