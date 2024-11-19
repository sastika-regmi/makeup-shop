const products = [
    { id: 1, name: "Lipstick Set", price: 25, image: "./images/lips stick.jpg" },
    { id: 2, name: "Eyeshadow Palette", price: 30, image: "./images/eye pallet.jpg" },
    { id: 3, name: "Foundation", price: 20, image: "./images/foundation.jpg" },
    { id: 4, name: "Mascara", price: 15, image: "./images/mascara.jpg" },
    { id: 5, name: "Blush", price: 18, image: "./images/blush.jpg" },
    { id: 6, name: "Concealer", price: 22, image: "./images/concealer.jpg" },
    { id: 7, name: "Eyeliner", price: 12, image: "./images/eyeliner.jpg" },
    { id: 8, name: "Bronzer", price: 24, image: "./images/bronzer.jpg" },
    { id: 9, name: "Makeup Brushes Set", price: 35, image:"./images/Makeup  Brushes  Set .jpg" },
    { id: 10, name: "Highlighter", price: 20, image: "./images/highlighter.jpg" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
        </div>
    `).join('');
    updateTotal();
    updateCartCount();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity > 0) {
            item.quantity = newQuantity;
        } else {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled = cart.length === 0;
}

function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    localStorage.removeItem('cart');
    renderCart();
});

document.getElementById('floating-cart-btn').addEventListener('click', () => {
    document.getElementById('cart').classList.add('open');
});

document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart').classList.remove('open');
});

renderProducts();
renderCart();