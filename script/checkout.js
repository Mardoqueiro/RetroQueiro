//  The checkout page products that were added to the cart must be displayed without a duplicate. Provide the details of each product, such
// as product name, category, quantity, and amount (single price * quantity = amount). In addition, you need to include
// the amount due or the total amount the user must pay. Include a button to clear all products on the cart and another
// button to display a custom or bootstrap alert ("Thank you for purchasing").


let wrapper = document.querySelector("[wrapper]")
let checkout = JSON.parse(localStorage.getItem("checkout"))
    ? JSON.parse(localStorage.getItem("checkout"))
    : []

let uniqueProducts = Array.from(new Set(checkout.map(item => item.productName)))

uniqueProducts.forEach(product => {
    let productObj = checkout.find(item => item.productName === product)
    wrapper.innerHTML += `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${productObj.productName}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${productObj.category}</h6>
            <p class="card-text">Quantity: ${productObj.quantity} | Amount: $${productObj.amount.toFixed(2)}</p>
        </div>
    </div>
    `
})

let totalAmount = checkout.reduce((sum, item) => sum + item.amount, 0)
wrapper.innerHTML += `
<div class="card">
    <div class="card-body">
        <h5 class="card-title">Total Amount Due</h5>
        <p class="card-text">$${totalAmount.toFixed(2)}</p>
    </div>
</div>
`

let clearCart = document.querySelector("[clearCart]")
clearCart.addEventListener("click", () => {
    localStorage.removeItem("checkout")
    location.reload()
})

let displayAlert = document.querySelector("[displayAlert]")
displayAlert.addEventListener("click", () => {
    let alert = document.createElement("div")
    alert.classList.add("alert", "alert-success")
    alert.textContent = "Thank you for purchasing"
    document.body.appendChild(alert)
    setTimeout(() => {
        alert.remove()
    }, 3000)
})

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