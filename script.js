const createProductBtn = document.getElementById("createProductBtn");
const productModal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalBtn = document.getElementById("modalBtn");

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productImage = document.getElementById("productImage");

const productList = document.getElementById("productList");
const template = document.getElementById("productCardTemplate");

let editMode = false;
let editingCard = null;

document.addEventListener("DOMContentLoaded", () => {
    // Clear the current product list in the DOM
    productList.innerHTML = '';
    
    // Load and render products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    storedProducts.forEach((productData) => {
        createProductCard(productData);
    });
});

createProductBtn.addEventListener("click", () => {
    resetModal();
    productModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
    productModal.style.display = "none";
});

modalBtn.addEventListener("click", () => {
    const nameValue = productName.value.trim();
    const priceValue = productPrice.value.trim();
    const descriptionValue = productDescription.value.trim();
    const imageValue = productImage.value.trim();

    if (nameValue && priceValue && descriptionValue && imageValue) {
        const productData = {
            name: nameValue,
            price: parseFloat(priceValue),
            description: descriptionValue,
            image: imageValue,
        };

        if (editMode && editingCard) {
            const productId = editingCard.dataset.id;
            productData.id = productId;
            updateProduct(productData);
        } else {
            createProductCard(productData);
        }

        resetModal();
        productModal.style.display = "none";
    } else {
        alert("Please fill all fields");
    }
});

function createProductCard(productData) {
    const productCard = template.content.cloneNode(true).children[0];
    productCard.querySelector("img").src = productData.image;
    productCard.querySelector("img").alt = productData.name;
    productCard.querySelector("h3").textContent = productData.name;
    productCard.querySelector("p.description").textContent = productData.description;
    productCard.querySelector("p.price").textContent = `$${productData.price}`;
    productCard.dataset.id = productData.id || Date.now();

    productCard.querySelector(".edit-btn").addEventListener("click", () => {
        productName.value = productData.name;
        productPrice.value = productData.price;
        productDescription.value = productData.description;
        productImage.value = productData.image;

        editMode = true;
        editingCard = productCard;
        modalBtn.textContent = "Update Product";
        document.getElementById("modalTitle").textContent = "Edit Product";
        productModal.style.display = "flex";
    });

    productCard.querySelector(".delete-btn").addEventListener("click", () => {
        deleteProduct(productCard, productData.id);
    });

    productList.appendChild(productCard);

    saveToLocalStorage(productData);
}

function saveToLocalStorage(productData) {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const productIndex = storedProducts.findIndex((product) => product.id === productData.id);

    if (productIndex === -1) {
        // Product doesn't exist, add it to the list
        storedProducts.push(productData);
        localStorage.setItem("products", JSON.stringify(storedProducts));
    } else {
        // Update existing product if it exists
        storedProducts[productIndex] = productData;
        localStorage.setItem("products", JSON.stringify(storedProducts));
    }
}

function updateProduct(updatedProductData) {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const index = storedProducts.findIndex((product) => product.id == updatedProductData.id);

    if (index !== -1) {
        storedProducts[index] = updatedProductData;
        localStorage.setItem("products", JSON.stringify(storedProducts));

        editingCard.querySelector("h3").textContent = updatedProductData.name;
        editingCard.querySelector("p.description").textContent = updatedProductData.description;
        editingCard.querySelector("p.price").textContent = `$${updatedProductData.price}`;
        editingCard.querySelector("img").src = updatedProductData.image;
    }

    resetModal();
    productModal.style.display = "none";
}

function deleteProduct(productCard, productId) {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = storedProducts.filter((product) => product.id !== productId);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    productCard.remove();
}

function resetModal() {
    productName.value = "";
    productPrice.value = "";
    productDescription.value = "";
    productImage.value = "";
    editMode = false;
    editingCard = null;
    modalBtn.textContent = "Create Product";
    document.getElementById("modalTitle").textContent = "Create a New Product";
}
