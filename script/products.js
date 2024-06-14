let container = document.querySelector("[ourStore]")
let searchProduct = document.querySelector("[searchProduct]")
let sortingByProduct = document.querySelector("[sorting]")
let products = JSON.parse(
    localStorage.getItem("products")
)

let checkout = JSON.parse(localStorage.getItem("checkout"))
    ? JSON.parse(localStorage.getItem("checkout"))
    : []

// current year
let currentYear = new Date().getUTCFullYear()
document.querySelector("[currentYear]").textContent = currentYear

function displayProducts(products) {
    try{
        products.forEach(product => {
            container.innerHTML += `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.productName}" loading="lazy">
                <div class="card-body">
                  <h5 class="card-title">${product.productName}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text">${product.amount}</p>
                  <button type="button" class="btn btn-primary" onclick='addToCart(${JSON.stringify(product)})'>Add to cart</button>
                </div>
            </div>
            `
        })
    } catch (e) {
        console.log(e)
    }
}

displayProducts(products)
function addToCart(product) {
    try{
        checkout.push(product)
        localStorage.setItem("checkout", JSON.stringify(checkout))
    }catch(e) {
        
    }

}

function sortProductsByPrice() {
    const products = loadProductsFromLocalStorage();
    products.sort((a, b) => a.price - b.price);
    // Re-display products after sorting
  }
  
  function searchProductsByName(searchTerm) {
    const products = loadProductsFromLocalStorage();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  function filterProductsByCategory(category) {
    const products = loadProductsFromLocalStorage();
    return products.filter(product => product.category === category);
  }