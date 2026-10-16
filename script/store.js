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

// Navbar cart badge shows the total quantity in the cart
function updateCartCounter() {
  document.querySelector("[counter]").textContent = getCart().reduce(
    (total, item) => total + item.quantity,
    0
  );
}

// Runs on every page
document.querySelector("[currentYear]").textContent =
  new Date().getUTCFullYear();
updateCartCounter();

// Fade out the loading spinner on pages that have one
const spinnerWrapper = document.querySelector(".spinner-wrapper");
if (spinnerWrapper) {
  setTimeout(() => {
    spinnerWrapper.style.opacity = 0;
  }, 200);
}
