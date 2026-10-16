let cartContent = document.querySelector("[cartContent]");
let cartEmpty = document.querySelector("[cartEmpty]");
let cartItems = document.querySelector("[cartItems]");
let orderModal = new bootstrap.Modal(document.getElementById("orderModal"));

let cart = getCart();

function renderCart() {
  const count = getCartCount(cart);
  const subtotal = cart.reduce((sum, item) => sum + item.amount * item.quantity, 0);

  cartContent.hidden = cart.length === 0;
  cartEmpty.hidden = cart.length > 0;

  document.querySelector("[cartItemCount]").textContent = `${count} ${count === 1 ? "item" : "items"}`;
  document.querySelector("[cartSummaryCount]").textContent = count;
  document.querySelector("[cartSubtotal]").textContent = formatPrice(subtotal);
  document.querySelector("[cartTotal]").textContent = formatPrice(subtotal);

  cartItems.innerHTML = cart
    .map(
      (item, index) => `
        <li class="cart-item">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.productName)}" />
          <div class="cart-item__info">
            <h3 class="cart-item__name">${escapeHtml(item.productName)}</h3>
            <p class="cart-item__meta">${escapeHtml(item.category)} · ${formatPrice(item.amount)} each</p>
            <div class="qty" role="group" aria-label="Quantity of ${escapeHtml(item.productName)}">
              <button class="icon-btn" type="button" data-action="decrease" data-index="${index}" aria-label="Decrease quantity" ${item.quantity <= 1 ? "disabled" : ""}>
                <i class="bi bi-dash-lg" aria-hidden="true"></i>
              </button>
              <input class="form-control qty__input" type="number" min="1" max="99" value="${item.quantity}" data-index="${index}" aria-label="Quantity" />
              <button class="icon-btn" type="button" data-action="increase" data-index="${index}" aria-label="Increase quantity">
                <i class="bi bi-plus-lg" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="cart-item__side">
            <span class="cart-item__total">${formatPrice(item.amount * item.quantity)}</span>
            <button class="link-remove" type="button" data-action="remove" data-index="${index}">
              <i class="bi bi-trash3" aria-hidden="true"></i> Remove
            </button>
          </div>
        </li>`
    )
    .join("");
}

// Save the cart, then refresh the page and the navbar counter
function saveAndRender() {
  saveCart(cart);
  renderCart();
}

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const item = cart[Number(button.dataset.index)];

  if (button.dataset.action === "increase") item.quantity = Math.min(99, item.quantity + 1);
  if (button.dataset.action === "decrease") item.quantity = Math.max(1, item.quantity - 1);
  if (button.dataset.action === "remove") cart.splice(Number(button.dataset.index), 1);
  saveAndRender();
});

// Typed quantities are kept between 1 and 99
cartItems.addEventListener("change", (event) => {
  if (!event.target.matches(".qty__input")) return;
  const item = cart[Number(event.target.dataset.index)];
  item.quantity = Math.min(99, Math.max(1, parseInt(event.target.value) || 1));
  saveAndRender();
});

document.querySelector("[clearCart]").addEventListener("click", () => {
  cart = [];
  saveAndRender();
});

document.querySelector("[checkoutButton]").addEventListener("click", () => {
  if (cart.length === 0) return;
  cart = [];
  saveAndRender();
  orderModal.show();
});

renderCart();
