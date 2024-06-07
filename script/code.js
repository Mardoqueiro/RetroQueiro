// create products and store it on the local storage
let wrapper = document.querySelector("[recentProducts]")
let products = 
    JSON.parse(localStorage.getItem("products")) ? JSON.parse(localStorage.getItem("products")) : localStorage.setItem("products",
        JSON.stringify(
            [
                {
                    id:1,
                    productName:"Retro Queiro",
                    category: "eyeglasses",
                    description: "Just a logo",
                    ammount: 350.50,
                    image:"https://mardoqueiro.github.io/all_images/eyeglasses/retro_queiro.png"
                },
                {
                    id:2,
                    productName:"Retro",
                    category: "Anything you want",
                    description: "whatever you want",
                    ammount: 450.50,
                    image:"https://mardoqueiro.github.io/all_images/images/0f2aeb671c21d094e80784c4c8b712c7.jpg"
                },
                {
                    id:3,
                    productName:"Queiro",
                    category: "what do you want",
                    description: "however you want",
                    ammount: 600.50,
                    image:"https://mardoqueiro.github.io/all_images/images/keyboaard.img.png"
                },
                {
                    id:4,
                    productName:"Stuff",
                    category: "what stuff?",
                    description: "how do you want it?",
                    ammount: 390.50,
                    image:"https://mardoqueiro.github.io/all_images/images/Calculator_img.png"
                },
                {
                    id:5,
                    productName:"Something",
                    category: "nothing here",
                    description: "Do you want something here",
                    ammount: 550.50,
                    image: "https://mardoqueiro.github.io/all_images/images/Building a Unified Team - John Maxwell.jpg"
                }
            ]
        )
    )

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
recentProducts()