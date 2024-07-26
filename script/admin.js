document.querySelector('[currentYear]').textContent = new Date().getUTCFullYear();

document.addEventListener("DOMContentLoaded", function() {
    const productTableBody = document.getElementById("productTableBody");
    const searchInput = document.querySelector("[searchProduct]");
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function renderProducts(productList) {
        productTableBody.innerHTML = "";
        productList.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.productName}</td>
                <td>${product.category}</td>
                <td>${product.description}</td>
                <td>R${product.amount}</td>
                <td><img src="${product.image}" alt="${product.productName}" style="width: 100px; height: auto;"></td>
                <td><button class="edit-btn btn btn-success" data-id="${product.id}">Edit</button></td>
                <td><button class="remove-btn btn btn-danger" data-id="${product.id}">Remove</button></td>
            `;
            productTableBody.appendChild(row);
        });
    }

    function filterAndSortProducts(query) {
        const filteredProducts = products.filter(product =>
            product.productName.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        filteredProducts.sort((a, b) => {
            const nameA = a.productName.toLowerCase();
            const nameB = b.productName.toLowerCase();
            const categoryA = a.category.toLowerCase();
            const categoryB = b.category.toLowerCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            if (categoryA < categoryB) return -1;
            if (categoryA > categoryB) return 1;
            return 0;
        });

        return filteredProducts;
    }

    // Constructor function for products
    function Product(id, productName, category, description, amount, image) {
        this.id = id;
        this.productName = productName;
        this.category = category;
        this.description = description;
        this.image = amount;
        this.image = image;
    }

    renderProducts(products);

    // Add new product button functionality
    const addNewProductBtn = document.getElementById("addNewProductBtn");
    addNewProductBtn.addEventListener("click", function() {
        clearModal();
        const modal = new bootstrap.Modal(document.getElementById("addProductModal"));
        modal.show();
    });

    // Clear modal fields
    function clearModal() {
        document.getElementById("productName").value = "";
        document.getElementById("category").value = "";
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("image").value = "";
        document.getElementById("saveProductChangesBtn").dataset.id = "";
    }

    // Event listener for modal's "Save Changes" button
    document.getElementById("saveProductChangesBtn").addEventListener("click", function() {
        const id = this.dataset.id ? parseInt(this.dataset.id) : products.length + 1;
        const productName = document.getElementById("productName").value;
        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value;
        const amount = document.getElementById("amount").value;
        const image = document.getElementById("image").value;

        if (this.dataset.id) {
            // Edit existing product
            const index = products.findIndex(product => product.id === id);
            products[index] = new Product(id, productName, category, description, amount, image);
        } else {
            // Add new product
            const newProduct = new Product(id, productName, category, description, amount, image);
            products.push(newProduct);
        }

        localStorage.setItem("products", JSON.stringify(products));
        renderProducts(products);
        clearModal();
        const modal = bootstrap.Modal.getInstance(document.getElementById("addProductModal"));
        modal.hide();
    });

    // Event listener for remove buttons
    productTableBody.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-btn")) {
            const productId = parseInt(event.target.dataset.id);
            const productName = products.find(product => product.id === productId).productName;
            const modalBody = document.getElementById("errorModalBody");
            modalBody.innerHTML = `<p>Are you sure you want to remove "${productName}"?</p>`;
            const removeButton = document.querySelector("#errorModal button.btn-secondary:last-child");
            removeButton.addEventListener("click", function() {
                removeProduct(productId);
            });
            const modal = new bootstrap.Modal(document.getElementById("errorModal"));
            modal.show();
        } else if (event.target.classList.contains("edit-btn")) {
            const productId = parseInt(event.target.dataset.id);
            editProduct(productId);
        }
    });

    // Edit product functionality
    function editProduct(productId) {
        const product = products.find(product => product.id === productId);
        if (product) {
            document.getElementById("productName").value = product.productName;
            document.getElementById("category").value = product.category;
            document.getElementById("description").value = product.description;
            document.getElementById("amount").value = product.amount;
            document.getElementById("image").value = product.image;
            document.getElementById("saveProductChangesBtn").dataset.id = productId;
            const modal = new bootstrap.Modal(document.getElementById("addProductModal"));
            modal.show();
        }
    }

    // Remove product functionality
    function removeProduct(productId) {
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
            localStorage.setItem("products", JSON.stringify(products));
            renderProducts(products);
        }
    }

    // Sorting functionality
    let ascendingOrder = true; // Default sort order
    const sortButton = document.querySelector("[sorting]");

    sortButton.addEventListener("click", () => {
        try {
            products.sort((a, b) => ascendingOrder ? a.amount - b.amount : b.amount - a.amount);
            renderProducts(products);
            ascendingOrder = !ascendingOrder; // Toggle sort order
            sortButton.textContent = ascendingOrder ? "Sort by highest amount" : "Sort by lowest amount";
        } catch (error) {
            document.body.innerHTML += `<div class="alert alert-danger">Sorting failed. Please try again.</div>`;
        }
    });

    // Search functionality
    searchInput.addEventListener("input", function() {
        const query = this.value.trim();
        if (query === "") {
            renderProducts(products);
        } else {
            const filteredProducts = filterAndSortProducts(query);
            renderProducts(filteredProducts);
        }
    });
});

// Update counter on page load
window.onload = () => {
  updateCartCounter();
};

// Function to update the counter badge
function updateCartCounter() {
  const totalQuantity = checkoutItems.reduce((total, item) => total + item.quantity, 0);
  document.querySelector("[counter]").textContent = totalQuantity || 0;
}

// Initialize checkoutItems and update counter on page load
let checkoutItems = JSON.parse(localStorage.getItem("checkout")) || [];

window.onload = () => {
    updateCartCounter();
};

// Function to update the counter badge
function updateCartCounter() {
    const totalQuantity = checkoutItems.reduce((total, item) => total + item.quantity, 0);
    document.querySelector("[counter]").textContent = totalQuantity || 0;
}

// Spinner
let spinnerWrapper = document.querySelector(".spinner-wrapper");

setTimeout(() => {
  spinnerWrapper.style.opacity = 0;
}, 200);