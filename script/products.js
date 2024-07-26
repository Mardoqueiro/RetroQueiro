let container = document.querySelector("[ourStore]");
let searchProduct = document.querySelector("[searchProduct]");
let sortingByAmount = document.querySelector("[sorting]");

let checkout = JSON.parse(localStorage.getItem("checkout"))
  ? JSON.parse(localStorage.getItem("checkout"))
  : [];

// Current year
document.querySelector("[currentYear]").textContent =
  new Date().getUTCFullYear();
let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : localStorage.setItem(
      "products",
      JSON.stringify([
        {
          id: 1,
          productName: "Custom Cassette Bluetooth Speaker by sab_3d",
          category: "Bluetooth Speaker",
          description:
            "sab_3d custom-designed Bluetooth speaker, resembling a cassette tape, offers wireless streaming rechargeablebattery, and high-quality sound, making it a nostalgic conversation starter.",
          amount: 2799.99,
          image:
            "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.record.player.jpeg",
        },
        {
          id: 2,
          productName: "Retro Style Headphones with SD Card and Bluetooth",
          category: "Headphones",
          description:
            "These retro-style headphones feature Bluetooth, an SD card slot, cushioned ear cups, leather headband, and metalaccents, blending classic design with modern functionality.",
          amount: 1399.99,
          image:
            "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Headphone.jpeg",
        },
        {
          id: 3,
          productName: "Vintage Bluetooth Speaker with Display",
          category: "Bluetooth Speaker",
          description:
            "This vintage-style Bluetooth speaker features a 1950s radio design, digital display, Apple Music and Spotifysupport, and retro dials, adding a touch of nostalgia to any room.",
          amount: 2499.99,
          image:
            "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Bluetooth.Speaker.jpeg",
        },
        {
          id: 4,
          productName: "Classic Portable Record Player",
          category: "Record Players",
          description:
            "This portable record player, with a retro design and built-in speaker, offers a convenient way to enjoy your vinyl  collection on the go.",
          amount: 1699.99,
          image:
            "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Vinyl.Portable.Turntable.jpeg",
        },
        {
          id: 5,
          productName: "Classic Jukebox with Karaoke and Streaming",
          category: "Jukeboxes",
          description:
            "This retro jukebox features modern features like karaoke, AM/FM radio, Bluetooth, and Spotify & Apple Musicsupport, with vibrant LED lights and a classic design for home entertainment.",
          amount: 5499.99,
          image:
            "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Jukebox.jpeg",
        },
        {
          id: 6,
          productName: "Retro Game Boy Gaming Console",
          category: "Gaming Consoles",
          description:
            "The Retro Game Boy Gaming Console offers a nostalgic gaming experience with its modern design, color LCDscreen rechargeable battery, and pre-loaded 300 classic games.",
          amount: 1499.99,
          image:
            "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Gaming.Console.jpeg",
        },
      ])
    );

function displayProducts(products) {
  container.innerHTML = "";
  products.forEach((product) => {
    // Add product card
    container.innerHTML += `
              <div class="col">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${
      product.productName
    }" id="cardImg${product.id}">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div class="card-text-bottom">
                          <h5 class="card-title">${product.productName}</h5>
                          <p class="card-text1">${product.description}</p>
                         </div>
                    </div>
                    <div>
                      <p class="card-text2">Amount: R ${product.amount}</p>
                      <button type='button' class="btn btn-secondary align-self-end" id="btn${
                        product.id
                      }" onclick='addToCart(${JSON.stringify(
      product
    )})'>Add to cart</button>
                    </div
                </div>
              </div>
            `;
  });
}

displayProducts(products);

// Search functionality
searchProduct.addEventListener("keyup", () => {
  try {
    const searchText = searchProduct.value.toLowerCase();
    if (searchText.length < 1) displayProducts(products);
    let filteredProducts = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText)
    );
    displayProducts(filteredProducts);
    if (filteredProducts.length === 0) {
      throw new Error(`${searchText} product not found`);
    }
  } catch (error) {
    container.innerHTML = `<div class="alert alert-warning">${error.message}</div>`;
  }
});

// Sorting functionality
let ascendingOrder = true; // Default sort order

sortingByAmount.addEventListener("click", () => {
  try {
    products.sort((a, b) =>
      ascendingOrder ? a.amount - b.amount : b.amount - a.amount
    );
    displayProducts(products);
    ascendingOrder = !ascendingOrder; // Toggle sort order
    sortingByAmount.textContent = ascendingOrder
      ? "Sorted by lowest amount"
      : "Sorted by highest amount";
  } catch (error) {
    container.innerHTML = `<div class="alert alert-danger">Sorting failed. Please try again.</div>`;
  }
});

// Add to cart functionality
function addToCart(product) {
  try {
    const existingItem = checkoutItems.find((item) => item.id === product.id);
    if (existingItem) {
      // Product already exists in cart, update quantity
      existingItem.quantity += 1;
    } else {
      // Product doesn't exist in cart, add it
      checkoutItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("checkout", JSON.stringify(checkoutItems));

    // Calculate the total quantity of items in the cart, including duplicates
    const totalQuantity = checkoutItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Update the counter badge
    document.querySelector("[counter]").textContent = totalQuantity || 0;
  } catch (error) {
    alert("Unable to add product to cart. Please try again.");
  }
}

document
  .querySelector("[categoryFilter]")
  .addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    const filteredProducts = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;
    displayProducts(filteredProducts);
  });

// Update counter on page load
window.onload = () => {
  updateCartCounter();
};

// Function to update the counter badge
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


// MINE
// function displayProducts(products) {
//   try {
//     products.forEach((product) => {
//       container.innerHTML += `
//             <div class="card">
//                 <img src="${product.image}" class="card-img-top" alt="${
//         product.productName
//       }" loading="lazy">
//                 <div class="card-body">
//                   <h5 class="card-title">${product.productName}</h5>
//                   <p class="card-text">${product.description}</p>
//                   <p class="card-text">${product.amount}</p>
//                   <button type="button" class="btn btn-primary" onclick='addToCart(${JSON.stringify(
//                     product
//                   )})'>Add to cart</button>
//                 </div>
//             </div>
//             `;
//     });
//   } catch (e) {
//     console.log(e);
//   }
// }

// displayProducts(products);
// function addToCart(product) {
//   try {
//     checkout.push(product);
//     localStorage.setItem("checkout", JSON.stringify(checkout));
//   } catch (e) {}
// }

// function sortProductsByPrice() {
//   const products = loadProductsFromLocalStorage();
//   products.sort((a, b) => a.price - b.price);
//   // Re-display products after sorting
// }

// function searchProductsByName(searchTerm) {
//   const products = loadProductsFromLocalStorage();
//   return products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
// }

// function filterProductsByCategory(category) {
//   const products = loadProductsFromLocalStorage();
//   return products.filter((product) => product.category === category);
// }
