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