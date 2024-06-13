const productTable = document.querySelector("#productTable");

console.log("Product table element:", productTable);

function sortTable() {
    console.log("Running sortTable function...");
    if (productTable) {
        console.log("Found product table element, sorting rows...");
        const rows = Array.from(productTable.rows);
        if (rows.length > 1) {
            console.log("Sorting rows...");
            rows.slice(1).sort((a, b) => parseFloat(a.cells[3].textContent) - parseFloat(b.cells[3].textContent)).forEach(row => {
                console.log("Appending sorted row...");
                productTable.appendChild(row);
            });
        }
    }
}

function addProduct() {
    console.log("Running addProduct function...");
    const productNameInput = document.querySelector("#productName");
    const categoryInput = document.querySelector("#category");
    const descriptionInput = document.querySelector("#description");
    const amountInput = document.querySelector("#amount");

    if (productNameInput && categoryInput && descriptionInput && amountInput) {
        console.log("All input fields found, checking product data...");
        const productName = productNameInput.value;
        const category = categoryInput.value;
        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);

        if (productName && category && description && !isNaN(amount)) {
            console.log("Product data valid, adding product...");
            products.push({
                id: products.length + 1,
                productName,
                category,
                description,
                amount,
                image: "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.record.player.jpeg" // Replace with actual image URL
            });

            localStorage.setItem("products", JSON.stringify(products));
            recentProducts();
        } else {
            console.error("Invalid product data");
        }
    } else {
        console.error("Missing product input fields");
    }
}

document.querySelector("#addProduct").addEventListener("click", addProduct);

function renderProductRow(product) {
    console.log("Running renderProductRow function...");
    return `
        <tr>
            <td>${product.productName}</td>
            <td><img src="${product.image}" width="100" height="100"></td>
            <td>${product.category}</td>
            <td>$${product.amount.toFixed(2)}</td>
            <td>
                <button type="button" class="btn btn-warning" onclick="editProduct(${product.id})">Edit</button>
                <button type="button" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        </tr>
    `;
}

function populateTable() {
    console.log("Running populateTable function...");
    if (productTable) {
        console.log("Found product table element, rendering rows...");
        const rows = products.map(renderProductRow);
        productTable.innerHTML = `
            <tr>
                <th>Product Name</th>
                <th>Image</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
            ${rows.join("")}
        `;
    }
}

populateTable();

function recentProducts() {
    console.log("Running recentProducts function...");
    try{
        const wrapper = document.querySelector("[recentProducts]");
        if (wrapper) {
            console.log("Found wrapper element, retrieving products...");
            const productsData = JSON.parse(localStorage.getItem("products")) || [];
            const latestProducts = productsData.slice(-Math.floor(productsData.length / 2));
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
        } else {
            console.error("No wrapper element found");
        }
    } catch (e) {
        console.error("Error retrieving products:", e);
        wrapper.textContent = "Please contact our administrator";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ... existing code
    console.log("DOM content loaded, running recentProducts function...");
    recentProducts();
});


