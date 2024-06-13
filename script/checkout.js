//  The checkout page products that were added to the cart must be displayed without a duplicate. Provide the details of each product, such
// as product name, category, quantity, and amount (single price * quantity = amount). In addition, you need to include
// the amount due or the total amount the user must pay. Include a button to clear all products on the cart and another
// button to display a custom or bootstrap alert ("Thank you for purchasing").

let TotalAmount = 0;

console.log("Running checkout script...");
window.onload = function() {
  console.log("Running onload function...");
  const productsList = document.getElementById("productsList");
  const checkout = JSON.parse(localStorage.getItem("checkout")) || [];

  checkout.forEach(item => {
    console.log("Processing item:", item);
    const existingItem = checkout.find(
      i => i.name === item.name && i.category === item.category
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.amount = existingItem.price * existingItem.quantity;
    } else {
      checkout.push(item);
    }
    totalAmount += item.amount;

    const product = document.createElement("li");
    product.innerHTML = `
      ${item.name} (${item.category}) - Quantity: ${item.quantity} - Amount: $${item.amount.toFixed(2)}
    `;
    productsList.appendChild(product);
  });

  const totalAmountElement = document.getElementById("totalAmount");
  totalAmountElement.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;

  const clearCartButton = document.getElementById("clearCartButton");
  clearCartButton.addEventListener("click", function() {
    console.log("Clearing cart...");
    localStorage.removeItem("checkout");
    window.location.reload();
  });

  const displayAlertButton = document.getElementById("displayAlertButton");
  displayAlertButton.addEventListener("click", function() {
    console.log("Displaying alert...");
    const alert = document.createElement("div");
    alert.classList.add("alert", "alert-success");
    alert.textContent = "Thank you for purchasing";
    document.body.appendChild(alert);
    setTimeout(function() {
      alert.remove();
    }, 3000);
  });
};

let wrapper = document.querySelector("[wrapper]");
if (!wrapper) {
  console.error("No wrapper element found");
  return;
}

let checkout = JSON.parse(localStorage.getItem("checkout")) || [];
let uniqueProducts = Array.from(new Set(checkout.map(item => item.productName)));

console.log("Unique products:", uniqueProducts);
uniqueProducts.forEach(product => {
  let productObj = checkout.find(item => item.productName === product);
  if (!productObj) {
    console.error(`Product ${product} not found in checkout`);
    return;
  }
  wrapper.innerHTML += `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${productObj.productName}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${productObj.category}</h6>
        <p class="card-text">Quantity: ${productObj.quantity} | Amount: $${productObj.amount.toFixed(2)}</p>
      </div>
    </div>
  `;
});

let totalAmount = checkout.reduce((sum, item) => sum + item.amount, 0);
wrapper.innerHTML += `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Total Amount Due</h5>
      <p class="card-text">$${totalAmount.toFixed(2)}</p>
    </div>
  </div>
`;

let clearCart = document.querySelector("[clearCart]");
if (!clearCart) {
  console.error("No clearCart element found");
  return;
}
clearCart.addEventListener("click", () => {
  console.log("Clearing cart...");
  localStorage.removeItem("checkout");
  location.reload();
});

let displayAlert = document.querySelector("[displayAlert]");
if (!displayAlert) {
  console.error("No displayAlert element found");
  return;
}
displayAlert.addEventListener("click", () => {
  console.log("Displaying alert...");
  const alert = document.createElement("div");
  alert.classList.add("alert", "alert-success");
  alert.textContent = "Thank you for purchasing";
  document.body.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 3000);
});

let currentYear = new Date().getUTCFullYear();
console.log("Current year:", currentYear);
document.querySelector("[currentYear]").textContent = currentYear;

function recentProducts() {
  try {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const latestProducts = products.slice(-Math.floor(products.length / 2));
    console.log("Latest products:", latestProducts);
    latestProducts.forEach(product => {
      wrapper.innerHTML += `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.productName}" loading="lazy">
          <div class="card-body">
            <h5 class="card-title">${product.productName}</h5>
            <p class="card-text">${product.description}</p>
          </div>
        </div>
      `;
    });
  } catch (e) {
    console.error("Error retrieving products:", e);
    wrapper.textContent = "Please contact our administrator";
  }
}