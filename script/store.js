// Shared by every page: the product list, the cart and the navbar/footer bits

const defaultProducts = [
  {
    id: 1,
    productName: "Custom Cassette Bluetooth Speaker by sab_3d",
    category: "Bluetooth Speaker",
    description:
      "sab_3d custom-designed Bluetooth speaker, resembling a cassette tape, offers wireless streaming, a rechargeable battery, and high-quality sound, making it a nostalgic conversation starter.",
    amount: 2799.99,
    image:
      "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.record.player.jpeg"
  },
  {
    id: 2,
    productName: "Retro Style Headphones with SD Card and Bluetooth",
    category: "Headphones",
    description:
      "These retro-style headphones feature Bluetooth, an SD card slot, cushioned ear cups, leather headband, and metal accents, blending classic design with modern functionality.",
    amount: 1399.99,
    image:
      "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Headphone.jpeg"
  },
  {
    id: 3,
    productName: "Vintage Bluetooth Speaker with Display",
    category: "Bluetooth Speaker",
    description:
      "This vintage-style Bluetooth speaker features a 1950s radio design, digital display, Apple Music and Spotify support, and retro dials, adding a touch of nostalgia to any room.",
    amount: 2499.99,
    image:
      "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Bluetooth.Speaker.jpeg"
  },
  {
    id: 4,
    productName: "Classic Portable Record Player",
    category: "Record Players",
    description:
      "This portable record player, with a retro design and built-in speaker, offers a convenient way to enjoy your vinyl collection on the go.",
    amount: 1699.99,
    image:
      "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Vinyl.Portable.Turntable.jpeg"
  },
  {
    id: 5,
    productName: "Classic Jukebox with Karaoke and Streaming",
    category: "Jukeboxes",
    description:
      "This retro jukebox features modern features like karaoke, AM/FM radio, Bluetooth, and Spotify & Apple Music support, with vibrant LED lights and a classic design for home entertainment.",
    amount: 5499.99,
    image:
      "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Jukebox.jpeg"
  },
  {
    id: 6,
    productName: "Retro Game Boy Gaming Console",
    category: "Gaming Consoles",
    description:
      "The Retro Game Boy Gaming Console offers a nostalgic gaming experience with its modern design, color LCD screen, rechargeable battery, and pre-loaded 300 classic games.",
    amount: 1499.99,
    image:
      "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Gaming.Console.jpeg"
  },
];

// Products (seeded into localStorage on the first visit)
function getProducts() {
  const products = JSON.parse(localStorage.getItem("products"));
  if (products) return products;
  saveProducts(defaultProducts);
  return defaultProducts.slice();
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

function getCategories(products = getProducts()) {
  return [...new Set(products.map((product) => product.category))].sort();
}

// Cart
function getCart() {
  return JSON.parse(localStorage.getItem("checkout")) || [];
}

function saveCart(cart) {
  localStorage.setItem("checkout", JSON.stringify(cart));
  updateCartCounter();
}

function addProductToCart(productId) {
  const product = getProducts().find((product) => product.id === productId);
  if (!product) return null;

  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  return product;
}

function getCartCount(cart = getCart()) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Navbar cart badge shows the total quantity in the cart
function updateCartCounter() {
  const count = getCartCount();
  document.querySelectorAll("[counter]").forEach((counter) => {
    counter.textContent = count;
  });
}

// Formatting
function formatPrice(amount) {
  return (
    "R " +
    Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

// Product text can be typed in on the admin page, so escape it before
// putting it into HTML
function escapeHtml(value) {
  const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value ?? "").replace(/[&<>"']/g, (char) => entities[char]);
}

// Product card used on the home and products pages
function renderProductCard(product) {
  return `
    <article class="product-card">
      <div class="product-card__media">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.productName)}" loading="lazy" />
        <span class="price-burst">${formatPrice(product.amount)}</span>
      </div>
      <div class="product-card__body">
        <p class="product-card__category">${escapeHtml(product.category)}</p>
        <h3 class="product-card__title">${escapeHtml(product.productName)}</h3>
        <p class="product-card__text">${escapeHtml(product.description)}</p>
        <button class="btn-retro btn-retro--block" type="button" data-add-to-cart="${product.id}">
          <i class="bi bi-bag-plus" aria-hidden="true"></i> Add to cart
        </button>
      </div>
    </article>`;
}

// Any [data-add-to-cart] button inside root adds that product to the cart
function bindAddToCart(root) {
  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-to-cart]");
    if (!button) return;
    const product = addProductToCart(Number(button.dataset.addToCart));
    if (product) showToast(`${product.productName} was added to your cart.`);
  });
}

// Small confirmation message in the corner, created the first time it's needed
function showToast(message) {
  let toast = document.querySelector("[siteToast]");
  if (!toast) {
    const container = document.createElement("div");
    container.className = "toast-container position-fixed bottom-0 end-0 p-3";
    container.innerHTML = `
      <div class="toast site-toast" role="status" aria-live="polite" aria-atomic="true" siteToast>
        <div class="d-flex align-items-center">
          <i class="bi bi-check-circle-fill site-toast__icon" aria-hidden="true"></i>
          <div class="toast-body" siteToastMessage></div>
          <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>`;
    document.body.appendChild(container);
    toast = container.querySelector("[siteToast]");
  }
  toast.querySelector("[siteToastMessage]").textContent = message;
  bootstrap.Toast.getOrCreateInstance(toast, { delay: 2500 }).show();
}

// Runs on every page
document.querySelector("[currentYear]").textContent =
  new Date().getUTCFullYear();
updateCartCounter();
