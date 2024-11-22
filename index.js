const data = [
    {
        "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
        },
        "name": "Waffle with Berries",
        "category": "Waffle",
        "price": 6.50,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50,
        "quantity": 0
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50,
        "quantity": 0
    }
];

const cartsContainer = document.querySelector('.carts');
const cartItemsContainer = document.querySelector('.card-container');
const orderTotal = document.querySelector('.order-total .amount');
const cart = [];
function increment(index) {
    const cartItemIndex = cart.findIndex(item => item.name === data[index].name);
    if (cartItemIndex !== -1) {
        cart[cartItemIndex].quantity++;
    } else {
        cart.push({ ...data[index], quantity: 1 });
    }
    updateCartDisplay();

    // Update quantity and visibility after incrementing
    const quantityElement = document.querySelector(`.quantityof[data-index="${index}"]`);
    if (quantityElement) {
        quantityElement.innerHTML = getCartItemQuantity(index); // Update quantity
    }
    updateAddButtonVisibility(index); // Re-check visibility of "Add to Cart" button
}

function decrement(index) {
    const cartItemIndex = cart.findIndex(item => item.name === data[index].name);
    if (cartItemIndex !== -1) {
        if (cart[cartItemIndex].quantity > 1) {
            cart[cartItemIndex].quantity--;
        } else {
            cart.splice(cartItemIndex, 1);
        }
        updateCartDisplay();  // Update cart display to reflect changes

        // Update quantity and visibility after decrementing
        const quantityElement = document.querySelector(`.quantityof[data-index="${index}"]`);
        if (quantityElement) {
            quantityElement.innerHTML = getCartItemQuantity(index); // Update quantity
        }

        updateAddButtonVisibility(index);  // Re-check visibility of "Add to Cart" button
    }
}


function updateAddButtonVisibility(index) {
    const addButtonContainer = document.querySelector(`.add[data-index="${index}"]`);
    const incrementContainer = document.querySelector(`.increment[data-index="${index}"]`);

    const currentQuantity = getCartItemQuantity(index);

    // Update visibility based on quantity
    if (currentQuantity === 0) {
        addButtonContainer.style.display = 'flex'; // Show "Add to Cart" button
        incrementContainer.style.display = 'none'; // Hide increment/decrement buttons
    } else {
        addButtonContainer.style.display = 'none'; // Hide "Add to Cart" button
        incrementContainer.style.display = 'flex'; // Show increment/decrement buttons
    }
}

function renderDesserts() {
    cartsContainer.innerHTML = data
        .map(
            (item, index) => `
          <div class="card" data-id="${index}">
              <div class="image-container">
                  <img class="${getCartItemQuantity(index) != 0 ? 'border-active' : ''}" src="${item.image.desktop}" alt="${item.name}" />
                  <div class="add" style="display: ${getCartItemQuantity(index) === 0 ? 'flex' : 'none'}">
                      <button class="add-to-cart"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
                  </div>
                  <div class="increment" style="display: ${getCartItemQuantity(index) === 0 ? 'none' : 'flex'}">
                      <button onclick="decrement(${index})">-</button>
                      <span class="quantityof" data-index="${index}">${getCartItemQuantity(index)}</span>
                      <button onclick="increment(${index})">+</button>
                  </div>
              </div>
              <div class="details">
                  <span class="description">${item.category}</span>
                  <span class="title">${item.name}</span>
                  <span class="price">$${item.price.toFixed(2)}</span>
              </div>
          </div>`
        )
        .join('');
}



function getCartItemQuantity(index) {
    const cartItem = cart.find(item => item.name === data[index].name);
    return cartItem ? cartItem.quantity : 0;
}

function updateCart() {
    cartItemsContainer.innerHTML = cart.map(
        (item, index) => `
          <div class="card-content">
              <div class="text-group">
                  <span class="item-title">${item.name}</span>
                  <div class="item-details">
                      <span class="quantity">${item.quantity}x</span>
                      <span class="unit-price">@ $${item.price.toFixed(2)}</span>
                      <span class="total-price">$${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
              </div>
              <div class="icon-group">
                <svg class="remove-item" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                    <path fill="#CAAFA7"
                    d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
                </svg>
              </div>
          </div>`
    )
        .join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    orderTotal.textContent = `$${total.toFixed(2)}`;
}

function updateCartDisplay() {
    if (cart.length < 1) {
        document.querySelector('.flex').style.display = 'block';
        document.querySelector('.your').style.display = 'none';
    } else {
        document.querySelector('.flex').style.display = 'none';
        document.querySelector('.your').style.display = 'block';
        updateCart();
    }
}

function addItemToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity = 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderDesserts(); // Mahsulotlar sonini yangilash uchun chizish
    updateCartDisplay();
}


function removeItemFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

cartsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const id = e.target.closest('.card').dataset.id;
        addItemToCart(data[id]);
    }
});

cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const id = e.target.closest('.card-content').dataset.id;
        removeItemFromCart(id);
    }
});
renderDesserts();
updateCartDisplay();
