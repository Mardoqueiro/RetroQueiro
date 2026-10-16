// My account: profile and order history (the page itself requires a login)
let user = getCurrentUser();

if (user) {
  document.querySelector("[accountName]").textContent = user.name;
  document.querySelector("[accountEmail]").textContent = user.email;
  document.querySelector("[accountRole]").textContent = isAdmin(user) ? "Store admin" : "Customer";
  document.querySelector("[adminShortcut]").hidden = !isAdmin(user);

  const orders = getOrders(user.email);
  const orderList = document.querySelector("[orderList]");
  document.querySelector("[ordersEmpty]").hidden = orders.length > 0;

  orderList.innerHTML = orders
    .map(
      (order) => `
        <li class="order">
          <div class="order__header">
            <div>
              <p class="order__id">Order #${escapeHtml(order.id)}</p>
              <p class="order__date">${new Date(order.date).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
            <p class="order__total">${formatPrice(order.total)}</p>
          </div>
          <ul class="order__items">
            ${order.items
              .map(
                (item) => `
                  <li>
                    <img src="${escapeHtml(item.image)}" alt="" />
                    <span>${escapeHtml(item.productName)}</span>
                    <span class="order__qty">× ${item.quantity}</span>
                  </li>`
              )
              .join("")}
          </ul>
        </li>`
    )
    .join("");
}

document.querySelector("[accountLogout]").addEventListener("click", () => {
  logOut();
  location.href = "../index.html";
});
