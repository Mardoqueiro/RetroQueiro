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
function recentProducts() {
    try{
        let arrSize = products.length
        let latestProducts = products.reverse().slice(0, arrSize >> 1)
        latestProducts.forEach(product => {
        wrapper.innerHTML += `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.productName}" loading="lazy">
            <div class="card-body">
              <h5 class="card-title">${product.productName}</h5>
              <p class="card-text">${product.description}</p>
            </div>
        </div>
        `
    })
    } catch (e) {
        wrapper.textContent = "Please contact our administrator"
    }
}

try{
    let products = JSON.parse(
        localStorage.getItem("products")
    )
    let container = document.querySelector("[ourStore]")
    products.forEach(product => {
        container.innerHTML += `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.productName}" loading="lazy">
            <div class="card-body">
              <h5 class="card-title">${product.productName}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text">${product.ammount}</p>
              <button href="#" class="btn btn-primary">Add to cart</button>
            </div>
        </div>
        `
    })
} catch (e) {
    console.log(e)
}