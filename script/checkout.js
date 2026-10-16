let checkoutItems = getCart();

function displayCheckoutItems() {
  const checkoutTableBody = document.getElementById("checkoutTableBody");
  checkoutTableBody.innerHTML = "";
  let total = 0;

  checkoutItems.forEach((item, index) => {
    const row = document.createElement("tr");
    const itemTotalPrice = item.amount * (item.quantity || 1);
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

// Save the cart, then refresh the table and the navbar counter
function saveCheckout() {
  saveCart(checkoutItems);
  displayCheckoutItems();
}

function removeItem(index) {
  checkoutItems.splice(index, 1);
  saveCheckout();
}

function updateQuantity(index, quantity) {
  // Don't allow an empty, zero or negative quantity
  checkoutItems[index].quantity = Math.max(1, parseInt(quantity) || 1);
  saveCheckout();
}

function payNow() {
  if (checkoutItems.length === 0) {
    alert("Your cart is empty. Please add items to proceed.");
    return;
  }
  alert("Thank you for your Order!");
  clearCart();
}

function clearCart() {
  checkoutItems = [];
  saveCheckout();
}

displayCheckoutItems();
