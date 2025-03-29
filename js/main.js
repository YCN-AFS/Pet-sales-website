// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Featured Pets Data
const featuredPets = [
    {
        id: 1,
        name: "Cáo Bắc Cực",
        price: "25.000.000đ",
        age: "6 tháng",
        gender: "Đực",
        health: "Đã tiêm phòng",
        image: "images/fox-1.jpg",
        description: "Cáo Bắc Cực với bộ lông trắng muốt và tính cách thân thiện."
    },
    {
        id: 2,
        name: "Cáo Đỏ",
        price: "20.000.000đ",
        age: "8 tháng",
        gender: "Cái",
        health: "Đã tiêm phòng",
        image: "images/fox-2.jpg",
        description: "Cáo Đỏ với bộ lông đỏ rực và tính cách năng động."
    }
];

// Render Featured Pets
function renderFeaturedPets() {
    const petGrid = document.querySelector('.pet-grid');
    if (!petGrid) return;

    petGrid.innerHTML = featuredPets.map(pet => `
        <div class="pet-card">
            <div class="pet-image">
                <img src="${pet.image}" alt="${pet.name}">
                <div class="pet-overlay">
                    <button class="quick-view" data-id="${pet.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="add-to-cart" data-id="${pet.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <div class="price">${pet.price}</div>
                <div class="pet-details">
                    <span><i class="fas fa-calendar"></i> ${pet.age}</span>
                    <span><i class="fas fa-venus-mars"></i> ${pet.gender}</span>
                </div>
                <p class="pet-description">${pet.description}</p>
                <div class="pet-health">
                    <i class="fas fa-heart"></i>
                    <span>${pet.health}</span>
                </div>
                <button class="view-details" data-id="${pet.id}">Xem chi tiết</button>
            </div>
        </div>
    `).join('');

    // Add event listeners for quick view and add to cart buttons
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const viewDetailsButtons = document.querySelectorAll('.view-details');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const petId = e.currentTarget.dataset.id;
            const pet = featuredPets.find(p => p.id === parseInt(petId));
            if (pet) {
                showQuickView(pet);
            }
        });
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const petId = e.currentTarget.dataset.id;
            const pet = featuredPets.find(p => p.id === parseInt(petId));
            if (pet) {
                addToCart(pet);
            }
        });
    });

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const petId = e.currentTarget.dataset.id;
            const pet = featuredPets.find(p => p.id === parseInt(petId));
            if (pet) {
                window.location.href = `pet-details.html?id=${petId}`;
            }
        });
    });
}

// Testimonials Data
const testimonials = [
    {
        id: 1,
        name: 'Nguyễn Thị Huyền',
        image: 'images/customer1.jpg',
        text: 'Tôi rất hài lòng với dịch vụ của FoxCode. Các bé cáo được chăm sóc rất tốt!'
    },
    {
        id: 2,
        name: 'Trần Thị Hà',
        image: 'images/customer1.jpg',
        text: 'Đội ngũ tư vấn rất nhiệt tình và chuyên nghiệp. Cảm ơn FoxCode!'
    },
    // Add more testimonials as needed
];

// Render Testimonials
function renderTestimonials() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (!testimonialSlider) return;

    testimonialSlider.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <img src="${testimonial.image}" alt="${testimonial.name}">
            <p class="testimonial-text">${testimonial.text}</p>
            <h4>${testimonial.name}</h4>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedPets();
    renderTestimonials();
});

// Cart Functionality
let cart = [];

function addToCart(petId) {
    const pet = featuredPets.find(p => p.id === petId);
    if (pet) {
        cart.push(pet);
        updateCartCount();
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Search Functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const petCards = document.querySelectorAll('.pet-card');
        
        petCards.forEach(card => {
            const petName = card.querySelector('h3').textContent.toLowerCase();
            const petDescription = card.querySelector('.description').textContent.toLowerCase();
            
            if (petName.includes(searchTerm) || petDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.dataset.filter;
            const petCards = document.querySelectorAll('.pet-card');
            
            petCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}); 