function addProduct() {
    console.log("Running addProduct function...");
    const productNameInput = document.querySelector("#productName");
    const categoryInput = document.querySelector("#category");
    const descriptionInput = document.querySelector("#description");
    const amountInput = document.querySelector("#amount");

    if (productNameInput && categoryInput && descriptionInput && amountInput) {
        console.log("All input fields found, checking product data...");
        const productName = productNameInput.value;
        const category = categoryInput.value;
        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);

        if (productName && category && description && !isNaN(amount)) {
            console.log("Product data valid, adding product...");
            products.push({
                id: products.length + 1,
                productName,
                category,
                description,
                amount,
                image: "https://mardoqueiro.github.io/all_images/E-com_/Retro_Products/Retro.Queiro.record.player.jpeg" // Replace with actual image URL
            });

            localStorage.setItem("products", JSON.stringify(products));
            recentProducts();
        } else {
            console.error("Invalid product data");
        }
    } else {
        console.error("Missing product input fields");
    }
}

function editProduct(id) {
    console.log("Running editProduct function...");
    const product = products.find(product => product.id === id);
    if (product) {
        console.log("Product found, displaying edit form...");
        document.querySelector("#productName").value = product.productName;
        document.querySelector("#category").value = product.category;
        document.querySelector("#description").value = product.description;
        document.querySelector("#amount").value = product.amount;
        document.querySelector("#addProduct").style.display = "none";   

        document.querySelector("#editProduct").addEventListener("click", function() {
            console.log("Running editProduct function...");
            product.productName = document.querySelector("#productName").value;
            product.category = document.querySelector("#category").value;
            product.description = document.querySelector("#description").value;
            product.amount = parseFloat(document.querySelector("#amount").value);
            localStorage.setItem("products", JSON.stringify(products));
            recentProducts();
        });
    } else {
        console.error("Product not found");
    }
}