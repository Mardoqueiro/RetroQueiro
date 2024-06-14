let admin = JSON.parse(localStorage.getItem("admin"))
    ? JSON.parse(localStorage.getItem("admin"))
    : []

function displayAdminProducts() {
    const adminProducts = [
      { name: "Custom Cassette Bluetooth Speaker by sab_3d", category: "Bluetooth Speaker", quantity: 1, price: 196.00 },
      { name: "Retro Style Headphones with SD Card and Bluetooth", category: "Headphones", quantity: 1, price: 98.00 },
      { name: "Vintage Bluetooth Speaker with Display", category: "Bluetooth Speaker", quantity: 1, price: 175.00 },
      { name: "Classic Portable Record Player", category: "Record Players", quantity: 1, price: 119.00 },
      { name: "Classic Jukebox with Karaoke and Streaming", category: "Jukeboxes", quantity: 1, price: 385.00 },
      { name: "Retro Game Boy Gaming Console", category: "Gaming Consoles", quantity: 1, price: 105.00 },
      // Add more products
    ];
    const adminContainer = document.querySelector('.admin tbody');
    adminProducts.forEach(product => {
      const productRow = document.createElement('tr');
      productRow.innerHTML = `
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>$${product.price}</td>
        <td>
          <button onclick="editProduct('${product.name}')">Edit</button>
          <button onclick="deleteProduct('${product.name}')">Delete</button>
        </td>
      `;
      adminContainer.appendChild(productRow);
    });
  }
  
  function addProduct() {
    document.getElementById('productModal').style.display = 'block';
  }
  
  function editProduct(name) {
    document.getElementById('productModal').style.display = 'block';
    
    // Find the product with the given name
    const product = adminProducts.find(p => p.name === name);
    
    // Populate the form with product details
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    
  }
  
  function deleteProduct(name) {
    alert(`Product ${name} deleted`);
    
    const productIndex = adminProducts.findIndex(product => product.name === name);
    
    if (productIndex !== -1) {
      adminProducts.splice(productIndex, 1);
    }
    
    
  }
  
  document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const productCategory = document.getElementById('productCategory').value;
    const productPrice = document.getElementById('productPrice').value;
    
    let productIndex = adminProducts.findIndex(product => product.name === productName);
    
    if (productIndex === -1) {
      adminProducts.push({
        name: productName,
        category: productCategory,
        quantity: 1,
        price: productPrice
      });
    } else {
      adminProducts[productIndex] = {
        name: productName,
        category: productCategory,
        quantity: 1,
        price: productPrice
      };
    }
    document.getElementById('productModal').style.display = 'none';
  });
  
  document.querySelector('.close').onclick = function() {
    document.getElementById('productModal').style.display = 'none';
  };
  
  window.onclick = function(event) {
    if (event.target == document.getElementById('productModal')) {
      document.getElementById('productModal').style.display = 'none';
    }
  };
  
  document.addEventListener('DOMContentLoaded', displayAdminProducts);
  