// Home page: latest arrivals and the best seller panel
let wrapper = document.querySelector("[recentProducts]");
let bestSeller = document.querySelector("[bestSeller]");

const BEST_SELLER_ID = 1;

function recentProducts() {
  const latestProducts = getProducts().slice().reverse().slice(0, 3);
  wrapper.innerHTML = latestProducts.map(renderProductCard).join("");
}

// Show the best seller's current price, or hide the buy button if it was removed
function showBestSeller() {
  const product = getProducts().find((product) => product.id === BEST_SELLER_ID);
  const price = bestSeller.querySelector("[bestSellerPrice]");
  const addButton = bestSeller.querySelector("[data-add-to-cart]");
  price.hidden = !product;
  addButton.hidden = !product;
  if (product) price.textContent = formatPrice(product.amount);
}

recentProducts();
showBestSeller();
bindAddToCart(wrapper);
bindAddToCart(bestSeller);
