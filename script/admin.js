// JavaScript for admin page

// Add product to table
document.getElementById('addProductForm').addEventListener('submit', addProduct);

// Sort table by price
document.querySelector('[sorting]').addEventListener('click', sortTable);

// Delete product
document.addEventListener('click', deleteProduct);

// Edit product
document.addEventListener('click', editProduct);

// Functions

function addProduct(event) {
    event.preventDefault();
    const form = event.target;
    const table = document.getElementById('productTable');
    const row = table.insertRow();
    const cells = ['productName', 'productImage', 'productCategory', 'productPrice'];

    cells.forEach((cell, index) => {
        row.insertCell(index).textContent = form.elements[cell].value;
    });

    const actionsCell = row.insertCell(cells.length);
    actionsCell.innerHTML = `
        <button class="btn btn-warning btn-sm">Edit</button>
        <button class="btn btn-danger btn-sm">Delete</button>
    `;

    form.reset();
    $('#addProductModal').modal('hide');
}

function sortTable() {
    const table = document.getElementById('productTable');
    const rows = Array.from(table.rows);
    rows.sort((a, b) => parseFloat(a.cells[3].textContent) - parseFloat(b.cells[3].textContent));
    rows.forEach(row => table.appendChild(row));
}

function deleteProduct(event) {
    if (event.target.classList.contains('btn-danger')) {
        const row = event.target.closest('tr');
        row.remove();
    }
}

function editProduct(event) {
    if (event.target.classList.contains('btn-warning')) {
        const row = event.target.closest('tr');
        const cells = row.cells;
        const form = document.getElementById('addProductForm');

        form.elements['productName'].value = cells[0].textContent;
        form.elements['productImage'].value = cells[1].querySelector('img').src;
        form.elements['productCategory'].value = cells[2].textContent;
        form.elements['productPrice'].value = cells[3].textContent;

        row.remove();
        $('#addProductModal').modal('show');
    }
}
// current year
let currentYear = new Date().getUTCFullYear()
document.querySelector("[currentYear]").textContent = currentYear


function recentProducts() {
    try{
        let arrSize = products.length
        let latestProducts = products.reverse().slice(0, arrSize >> 1)
        latestProducts.forEach(product => {
        wrapper.innerHTML += `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.productName}" loading="lazy">
            <div class="card-body">
              <h5 class="card-title">${product.productName}</h5>
              <p class="card-text">${product.description}</p>
            </div>
        </div>
        `
    })
    } catch (e) {
        wrapper.textContent = "Please contact our administrator"
    }
}