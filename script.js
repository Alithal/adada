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
    const storedProducts = getAllProducts();
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
            id: editMode && editingCard ? editingCard.dataset.id : Date.now().toString()
        };

        if (editMode && editingCard) {
            updateProduct(productData);
        } else {
            const allProducts = getAllProducts();
            allProducts.push(productData);
            saveAllProducts(allProducts);
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
    productCard.dataset.id = productData.id;

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
}

function updateProduct(updatedProductData) {
    const allProducts = getAllProducts();
    const index = allProducts.findIndex((p) => p.id === updatedProductData.id);

    if (index !== -1) {
        allProducts[index] = updatedProductData;
        saveAllProducts(allProducts);

        editingCard.querySelector("h3").textContent = updatedProductData.name;
        editingCard.querySelector("p.description").textContent = updatedProductData.description;
        editingCard.querySelector("p.price").textContent = `$${updatedProductData.price}`;
        editingCard.querySelector("img").src = updatedProductData.image;
    }

    resetModal();
    productModal.style.display = "none";
}

function deleteProduct(productCard, productId) {
    const allProducts = getAllProducts();
    const updatedProducts = allProducts.filter((product) => product.id !== productId);
    saveAllProducts(updatedProducts);
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

function getAllProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveAllProducts(productsArray) {
    localStorage.setItem("products", JSON.stringify(productsArray));
}
