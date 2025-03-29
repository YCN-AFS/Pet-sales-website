// Cart Data Structure
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cart Functions
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function addToCart(petId) {
    const pet = petDetails[petId];
    if (pet) {
        cart.push({
            id: petId,
            name: pet.name,
            price: pet.price,
            image: pet.images[0],
            quantity: 1
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

function removeFromCart(petId) {
    cart = cart.filter(item => item.id !== petId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateQuantity(petId, quantity) {
    const item = cart.find(item => item.id === petId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

// Format Price
function formatPrice(price) {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Calculate Totals
function calculateTotals() {
    const subtotal = cart.reduce((total, item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        return total + (price * item.quantity);
    }, 0);

    const shipping = document.querySelector('input[name="delivery"]:checked').value === 'home' ? 500000 : 0;
    const total = subtotal + shipping;

    return {
        subtotal,
        shipping,
        total
    };
}

// Render Cart
function renderCart() {
    const cartItemsList = document.querySelector('.cart-items-list');
    if (!cartItemsList) return;

    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Giỏ hàng trống</p>
                <a href="pets.html" class="continue-shopping">Tiếp tục mua sắm</a>
            </div>
        `;
        return;
    }

    cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-info">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price}</p>
                </div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateQuantity(${item.id}, this.value)">
                <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="item-total">
                ${formatPrice((parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toString())}đ
            </div>
            <div class="item-actions">
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Update summary
    const totals = calculateTotals();
    document.getElementById('subtotal').textContent = formatPrice(totals.subtotal.toString()) + 'đ';
    document.getElementById('shipping').textContent = formatPrice(totals.shipping.toString()) + 'đ';
    document.getElementById('total').textContent = formatPrice(totals.total.toString()) + 'đ';
}

// Delivery Options
const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
const deliveryAddress = document.querySelector('.delivery-address');

deliveryOptions.forEach(option => {
    option.addEventListener('change', () => {
        if (option.value === 'home') {
            deliveryAddress.style.display = 'block';
        } else {
            deliveryAddress.style.display = 'none';
        }
        renderCart();
    });
});

// Checkout Process
const checkoutBtn = document.getElementById('checkout-btn');
const addressForm = document.getElementById('address-form');

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Giỏ hàng trống!', 'error');
        return;
    }

    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    
    if (deliveryMethod === 'home') {
        if (!addressForm.checkValidity()) {
            showNotification('Vui lòng điền đầy đủ thông tin giao hàng!', 'error');
            return;
        }
    }

    const orderData = {
        items: cart,
        delivery: {
            method: deliveryMethod,
            address: deliveryMethod === 'home' ? {
                fullname: document.getElementById('fullname').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                note: document.getElementById('note').value
            } : null
        },
        payment: document.querySelector('input[name="payment"]:checked').value,
        totals: calculateTotals()
    };

    // Here you would typically send the order data to your backend
    console.log('Order Data:', orderData);
    
    // For demo purposes, we'll just show a success message
    showNotification('Đặt hàng thành công!', 'success');
    
    // Clear cart
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    renderCart();
});

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
}); 