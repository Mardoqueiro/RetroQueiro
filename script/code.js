// create products and store it on the local storage
let wrapper = document.querySelector("[recentProducts]")
let products = 
    JSON.parse(localStorage.getItem("products")) ? JSON.parse(localStorage.getItem("products")) : localStorage.setItem("products",
        JSON.stringify(
            [
                {
                id:1,
                productName: "Custom Cassette Bluetooth Speaker by @sab_3d",
                category: "Bluetooth Speaker",
                description: "@sab_3d's custom-designed Bluetooth speaker, resembling a cassette tape, offers wireless streaming rechargeablebattery, and high-quality sound, making it a nostalgic conversation starter.",
                amount: 2799.99,
                image: "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.record.player.jpeg"
              },
              {
                id:2,
                productName: "Retro Style Headphones with SD Card and Bluetooth",
                category: "Headphones",
                description: "These retro-style headphones feature Bluetooth, an SD card slot, cushioned ear cups, leather headband, and metalaccents, blending classic design with modern functionality.",
                amount: 1399.99,
                image: "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Headphone.jpeg"
              },
              {
                id:3,
                productName: "Vintage Bluetooth Speaker with Display",
                category: "Bluetooth Speaker",
                description: "This vintage-style Bluetooth speaker features a 1950s radio design, digital display, Apple Music and Spotifysupport, and retro dials, adding a touch of nostalgia to any room.",
                amount: 2499.99,
                image: "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Bluetooth.Speaker.jpeg"
              },
              {
                productName: "Classic Portable Record Player",
                category: "Record Players",
                description: "This portable record player, with a retro design and built-in speaker, offers a convenient way to enjoy your vinyl  collection on the go.",
                amount: 1699.99,
                image: "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Vinyl.Portable.Turntable.jpeg"
              },
              {
                productName: "Classic Jukebox with Karaoke and Streaming",
                category: "Jukeboxes",
                description: "This retro jukebox features modern features like karaoke, AM/FM radio, Bluetooth, and Spotify & Apple Musicsupport, with vibrant LED lights and a classic design for home entertainment.",
                amount: 5499.99,
                image: "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Jukebox.jpeg"
              },
              {
                productName: "Retro Game Boy Gaming Console",
                category: "Gaming Consoles",
                description: "The Retro Game Boy Gaming Console offers a nostalgic gaming experience with its modern design, color LCDscreen rechargeable battery, and pre-loaded 300 classic games.",
                amount: 1499.99,
                image: "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.Gaming.Console.jpeg"
              }
            ]
        )
    )

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
        seetTimeout(() => {
            location.reload()  
        },
            2000  
        )
    }
}

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