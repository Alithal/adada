const createProductBtn = document.getElementById("createProductBtn");
const productModal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productImage = document.getElementById("productImage");

const modalBtn = document.getElementById("modalBtn");
const productList = document.getElementById("productList");

let editMode = false;
let editingCard = null;

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
        if (editMode && editingCard) {
            editingCard.querySelector("h3").textContent = nameValue;
            editingCard.querySelector("p.description").textContent = descriptionValue;
            editingCard.querySelector("p.price").textContent = `$${priceValue}`;
            editingCard.querySelector("img").src = imageValue;
            editingCard.querySelector("img").alt = nameValue;

            editMode = false;
            editingCard = null;
            modalBtn.textContent = "Create Product";
            document.getElementById("modalTitle").textContent = "Create a New Product";
        } else {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${imageValue}" alt="${nameValue}" />
                <h3>${nameValue}</h3>
                <p class="description">${descriptionValue}</p>
                <p class="price">$${priceValue}</p>
                <div class="card-buttons">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            productCard.querySelector(".delete-btn").addEventListener("click", () => {
                productCard.remove();
            });

            productCard.querySelector(".edit-btn").addEventListener("click", () => {
                productName.value = nameValue;
                productPrice.value = priceValue;
                productDescription.value = descriptionValue;
                productImage.value = imageValue;

                editMode = true;
                editingCard = productCard;
                modalBtn.textContent = "Update Product";
                document.getElementById("modalTitle").textContent = "Edit Product";
                productModal.style.display = "flex";
            });

            productList.appendChild(productCard);
        }

        resetModal();
        productModal.style.display = "none";
    } else {
        alert("Please fill all fields");
    }
});

function resetModal() {
    productName.value = "";
    productPrice.value = "";
    productDescription.value = "";
    productImage.value = "";
}
