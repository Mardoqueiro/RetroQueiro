document.querySelector("[currentYear]").textContent =
  new Date().getUTCFullYear();

let checkoutItems = JSON.parse(localStorage.getItem("checkout")) || [];

function displayCheckoutItems() {
  const checkoutTableBody = document.getElementById("checkoutTableBody");
  checkoutTableBody.innerHTML = "";
  let total = 0;

  checkoutItems.forEach((item, index) => {
    const row = document.createElement("tr");
    const itemTotalPrice = item.price * (item.quantity || 1); 
    row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.category}</td>
            <td><img src="${item.image}" alt="${
      item.productName
    }" width="100"></td>
            <td>${item.description}</td>
            <td>
                <input type="number" min="1" value="${
                  item.quantity || 1
                }" onchange="updateQuantity(${index}, this.value)">
            </td> 
            <td>R${itemTotalPrice.toFixed(2)}</td>
            <td><button class="btn remove-btn btn-danger" onclick="removeItem(${index})">Remove</button></td>
        `;
    checkoutTableBody.appendChild(row);
    total += itemTotalPrice;
  });

  const totalRow = document.createElement("tr");
  totalRow.classList.add("total-row");
  totalRow.innerHTML = `
        <td colspan="7">Total: R ${total.toFixed(2)}</td>
    `;
  checkoutTableBody.appendChild(totalRow);
}

function addItemToCart(product) {
  const existingItemIndex = checkoutItems.findIndex(
    (item) => item.productName === product.productName
  );
  if (existingItemIndex !== -1) {
    checkoutItems[existingItemIndex].quantity += 1;
  } else {
    checkoutItems.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("checkout", JSON.stringify(checkoutItems));
  displayCheckoutItems();
}

function removeItem(index) {
  const removedQuantity = checkoutItems[index].quantity; 
  checkoutItems.splice(index, 1); 
  localStorage.setItem("checkout", JSON.stringify(checkoutItems)); 
  displayCheckoutItems(); 
  updateCartCounter(-removedQuantity); 
}

function updateQuantity(index, quantity) {
  checkoutItems[index].quantity = parseInt(quantity); 
  localStorage.setItem("checkout", JSON.stringify(checkoutItems));
  displayCheckoutItems(); 
  updateCartCounter(); 
}

displayCheckoutItems();

function payNow() {
  if (checkoutItems.length === 0) {
    alert("Your cart is empty. Please add items to proceed.");
    return;
  }
  else {
    alert("Thank you for your Order!");
  }
}

function clearCart() {
  checkoutItems = [];
  localStorage.setItem("checkout", JSON.stringify(checkoutItems));
  displayCheckoutItems();
}

window.onload = () => {
  updateCartCounter();
};

function updateCartCounter() {
  const totalQuantity = checkoutItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  document.querySelector("[counter]").textContent = totalQuantity || 0;
}

let spinnerWrapper = document.querySelector(".spinner-wrapper");

setTimeout(() => {
  spinnerWrapper.style.opacity = 0;
}, 200);
