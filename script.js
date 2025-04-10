const createProductBtn = document.getElementById("createProductBtn");
const productModal = document.getElementById("productModal");
const closeModalBtm = document.getElementById("closeModalBtn");

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productImage = document.getElementById("productImage");

const modalBtn = document.getElementById("modalBtn");
const productList = document.getElementById("productList");

createProductBtn.addEventListener("click", function () {
    productModal.style.display = "flex";
});

closeModalBtm.addEventListener("click", function () {
    productModal.style.display = "none";
});

modalBtn.addEventListener("click", async function () {
    const nameValue = productName.value.trim();
    const priceValue = productPrice.value.trim();
    const descriptionValue = productDescription.value.trim();
    const imageValue = productImage.value.trim();

    if (nameValue && priceValue && descriptionValue && imageValue) {
        const product = {
            name: nameValue,
            price: priceValue,
            description: descriptionValue,
            image: imageValue,
        };

        try {
            await fetch("http://localhost:3000/api/products", {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json"
                },
            });
        } catch (error) {
            console.error("Failed to send to server:", error);
        }

        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p><strong>Price:</strong> $${product.price}</p>
            <p>${product.description}</p>
        `;

        productList.appendChild(productCard);

        productName.value = "";
        productPrice.value = "";
        productDescription.value = "";
        productImage.value = "";
        productModal.style.display = "none";
    } else {
        alert("Please fill all fields");
    }
});
