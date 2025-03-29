// Pet Details Data
const petDetails = {
    1: {
        name: 'Cáo Bắc Cực',
        price: '15.000.000đ',
        originalPrice: '18.000.000đ',
        age: '6 tháng',
        gender: 'Cái',
        color: 'Trắng',
        health: 'Tốt',
        description: 'Cáo Bắc Cực thông minh, thân thiện và rất dễ thương. Được chăm sóc kỹ lưỡng từ khi còn nhỏ, bé có sức khỏe tốt và tính cách năng động.',
        images: [
            'images/fox-1.jpg',
            'images/fox-1-2.jpg',
            'images/fox-1-3.jpg',
            'images/fox-1-4.jpg'
        ],
        careInstructions: [
            'Chế độ ăn: Thức ăn chuyên biệt cho cáo, thịt tươi, rau củ',
            'Vệ sinh: Tắm 1-2 lần/tháng, chải lông hàng ngày',
            'Vận động: Dạo chơi 30-60 phút/ngày',
            'Kiểm tra sức khỏe: Định kỳ 3 tháng/lần'
        ],
        relatedPets: [2, 3, 4]
    },
    2: {
        name: 'Cáo Đỏ',
        price: '12.000.000đ',
        originalPrice: '15.000.000đ',
        age: '8 tháng',
        gender: 'Đực',
        color: 'Đỏ',
        health: 'Tốt',
        description: 'Cáo Đỏ năng động, thích chơi đùa và rất thân thiện với người. Bé có bộ lông đỏ rực rỡ và đôi mắt thông minh.',
        images: [
            'images/fox-2.jpg',
            'images/fox-2-2.jpg',
            'images/fox-2-3.jpg',
            'images/fox-2-4.jpg'
        ],
        careInstructions: [
            'Chế độ ăn: Thức ăn chuyên biệt cho cáo, thịt tươi, rau củ',
            'Vệ sinh: Tắm 1-2 lần/tháng, chải lông hàng ngày',
            'Vận động: Dạo chơi 30-60 phút/ngày',
            'Kiểm tra sức khỏe: Định kỳ 3 tháng/lần'
        ],
        relatedPets: [1, 3, 4]
    }
    // Add more pets as needed
};

// Get pet ID from URL
const urlParams = new URLSearchParams(window.location.search);
const petId = parseInt(urlParams.get('id'));

// Load Pet Details
function loadPetDetails() {
    const pet = petDetails[petId];
    if (!pet) {
        window.location.href = 'pets.html';
        return;
    }

    // Update main content
    document.getElementById('pet-name').textContent = pet.name;
    document.getElementById('pet-price').textContent = pet.price;
    document.getElementById('original-price').textContent = pet.originalPrice;
    document.getElementById('pet-age').textContent = pet.age;
    document.getElementById('pet-gender').textContent = pet.gender;
    document.getElementById('pet-color').textContent = pet.color;
    document.getElementById('pet-health').textContent = pet.health;
    document.getElementById('pet-description').textContent = pet.description;

    // Load care instructions
    const careList = document.getElementById('care-instructions');
    careList.innerHTML = pet.careInstructions.map(instruction => `
        <li>${instruction}</li>
    `).join('');

    // Load images
    const mainImage = document.getElementById('main-image');
    mainImage.src = pet.images[0];
    mainImage.alt = pet.name;

    // Load thumbnails
    const thumbnailList = document.querySelector('.thumbnail-list');
    thumbnailList.innerHTML = pet.images.map((image, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
            <img src="${image}" alt="${pet.name} - Hình ${index + 1}">
        </div>
    `).join('');

    // Load related pets
    loadRelatedPets(pet.relatedPets);

    // Add event listeners
    addEventListeners();
}

// Load Related Pets
function loadRelatedPets(relatedIds) {
    const relatedGrid = document.querySelector('.related-pets-grid');
    if (!relatedGrid) return;

    const relatedPets = relatedIds.map(id => petDetails[id]).filter(Boolean);
    
    relatedGrid.innerHTML = relatedPets.map(pet => `
        <div class="pet-card" data-id="${pet.id}">
            <div class="pet-image">
                <img src="${pet.images[0]}" alt="${pet.name}">
                <div class="pet-overlay">
                    <button class="view-details">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p class="price">${pet.price}</p>
                <div class="pet-details">
                    <span><i class="fas fa-birthday-cake"></i> ${pet.age}</span>
                    <span><i class="fas fa-venus-mars"></i> ${pet.gender}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Add click event to related pet cards
    relatedGrid.querySelectorAll('.pet-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            window.location.href = `pet-details.html?id=${id}`;
        });
    });
}

// Add Event Listeners
function addEventListeners() {
    // Thumbnail click events
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const index = parseInt(thumb.dataset.index);
            const pet = petDetails[petId];
            
            // Update main image
            mainImage.src = pet.images[index];
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // Add to cart button
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            addToCart(petId);
            showNotification('Đã thêm vào giỏ hàng!');
        });
    }

    // Buy now button
    const buyNowBtn = document.getElementById('buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            addToCart(petId);
            window.location.href = 'checkout.html';
        });
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
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
document.addEventListener('DOMContentLoaded', loadPetDetails); 