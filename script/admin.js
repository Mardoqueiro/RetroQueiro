let productTableBody = document.getElementById("productTableBody");
let searchInput = document.querySelector("[searchProduct]");
let sortSelect = document.querySelector("[sortProducts]");
let productForm = document.getElementById("productForm");
let productModal = new bootstrap.Modal(document.getElementById("productModal"));
let removeModal = new bootstrap.Modal(document.getElementById("removeModal"));

let products = getProducts();
let editingId = null; // null while adding a new product
let productIdToRemove = null;

const sorters = {
  default: () => 0,
  "price-asc": (a, b) => a.amount - b.amount,
  "price-desc": (a, b) => b.amount - a.amount,
  name: (a, b) => a.productName.localeCompare(b.productName),
};

function renderTable() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleProducts = products
    .filter(
      (product) =>
        product.productName.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    )
    .sort(sorters[sortSelect.value]);

  if (visibleProducts.length === 0) {
    productTableBody.innerHTML = `
      <tr><td colspan="6" class="admin-table__empty">No products found.</td></tr>`;
    return;
  }

  productTableBody.innerHTML = visibleProducts
    .map(
      (product) => `
        <tr>
          <td><img src="${escapeHtml(product.image)}" alt="" /></td>
          <td class="admin-table__name">${escapeHtml(product.productName)}</td>
          <td>${escapeHtml(product.category)}</td>
          <td class="text-nowrap">${formatPrice(product.amount)}</td>
          <td><p class="admin-table__desc">${escapeHtml(product.description)}</p></td>
          <td>
            <div class="admin-actions">
              <button class="btn-retro btn-retro--secondary btn-retro--sm" type="button" data-action="edit" data-id="${product.id}">
                <i class="bi bi-pencil" aria-hidden="true"></i> Edit
              </button>
              <button class="btn-retro btn-retro--danger btn-retro--sm" type="button" data-action="remove" data-id="${product.id}">
                <i class="bi bi-trash3" aria-hidden="true"></i> Remove
              </button>
            </div>
          </td>
        </tr>`
    )
    .join("");
}

// Suggest existing categories while typing in the form
function refreshCategoryOptions() {
  document.getElementById("categoryOptions").innerHTML = getCategories(products)
    .map((category) => `<option value="${escapeHtml(category)}"></option>`)
    .join("");
}

function openProductForm(product) {
  editingId = product ? product.id : null;
  productForm.reset();
  productForm.classList.remove("was-validated");
  document.getElementById("productModalLabel").textContent = product ? "Edit product" : "Add product";

  if (product) {
    productForm.productName.value = product.productName;
    productForm.category.value = product.category;
    productForm.price.value = product.amount;
    productForm.imageUrl.value = product.image;
    productForm.description.value = product.description;
  }
  productModal.show();
}

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!productForm.checkValidity()) {
    productForm.classList.add("was-validated");
    productForm.querySelector(":invalid").focus();
    return;
  }

  const product = {
    // New products get the next id after the highest one, so ids stay unique after removals
    id: editingId ?? products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1,
    productName: productForm.productName.value.trim(),
    category: productForm.category.value.trim(),
    description: productForm.description.value.trim(),
    amount: parseFloat(productForm.price.value),
    image: productForm.imageUrl.value.trim(),
  };

  if (editingId === null) {
    products.push(product);
  } else {
    products[products.findIndex((item) => item.id === editingId)] = product;
  }

  saveProducts(products);
  renderTable();
  refreshCategoryOptions();
  productModal.hide();
  showToast(editingId === null ? "Product added." : "Product updated.");
});

productTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const product = products.find((product) => product.id === Number(button.dataset.id));

  if (button.dataset.action === "edit") openProductForm(product);
  if (button.dataset.action === "remove") {
    productIdToRemove = product.id;
    document.querySelector("[removeProductName]").textContent = product.productName;
    removeModal.show();
  }
});

document.getElementById("confirmRemoveBtn").addEventListener("click", () => {
  products = products.filter((product) => product.id !== productIdToRemove);
  saveProducts(products);
  renderTable();
  refreshCategoryOptions();
  removeModal.hide();
  showToast("Product removed.");
});

document.getElementById("addNewProductBtn").addEventListener("click", () => openProductForm(null));
searchInput.addEventListener("input", renderTable);
sortSelect.addEventListener("change", renderTable);

renderTable();
refreshCategoryOptions();
