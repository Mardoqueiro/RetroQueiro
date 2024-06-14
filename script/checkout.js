//  The checkout page products that were added to the cart must be displayed without a duplicate. Provide the details of each product, such
// as product name, category, quantity, and amount (single price * quantity = amount). In addition, you need to include
// the amount due or the total amount the user must pay. Include a button to clear all products on the cart and another
// button to display a custom or bootstrap alert ("Thank you for purchasing").

// Function to display cart items
function displayCartProducts() {
  const cart = [
    { name: "Custom Cassette Bluetooth Speaker by sab_3d", category: "Bluetooth Speaker", quantity: 1, price: 196.00 },
    { name: "Retro Style Headphones with SD Card and Bluetooth", category: "Headphones", quantity: 1, price: 98.00 },
    { name: "Vintage Bluetooth Speaker with Display", category: "Bluetooth Speaker", quantity: 1, price: 175.00 },
    { name: "Classic Portable Record Player", category: "Record Players", quantity: 1, price: 119.00 },
    { name: "Classic Jukebox with Karaoke and Streaming", category: "Jukeboxes", quantity: 1, price: 385.00 },
    { name: "Retro Game Boy Gaming Console", category: "Gaming Consoles", quantity: 1, price: 105.00 },
  ];
  const cartContainer = document.querySelector('.checkout tbody');
  cart.forEach(products => {
    const cartRow = document.createElement('tr');
    cartRow.innerHTML = `
      <td>${products.name}</td>
      <td>${products.category}</td>
      <td>${products.quantity}</td>
      <td>$${products.price * products.quantity}</td>
    `;
    cartContainer.appendChild(cartRow);
  });
}

function clearCart() {
  alert('Cart cleared');
}

function thankYou() {
  alert('Thank you for purchasing');
}

document.addEventListener('DOMContentLoaded', displayCartProducts);
