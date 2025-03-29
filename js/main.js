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
        name: 'Cáo Bắc Cực',
        price: '15.000.000đ',
        image: 'images/fox-1.jpg',
        age: '6 tháng',
        description: 'Cáo Bắc Cực thông minh, thân thiện'
    },
    {
        id: 2,
        name: 'Cáo Đỏ',
        price: '12.000.000đ',
        image: 'images/fox-2.jpg',
        age: '8 tháng',
        description: 'Cáo Đỏ năng động, thích chơi đùa'
    },
    // Add more pets as needed
];

// Render Featured Pets
function renderFeaturedPets() {
    const petGrid = document.querySelector('.pet-grid');
    if (!petGrid) return;

    petGrid.innerHTML = featuredPets.map(pet => `
        <div class="pet-card">
            <img src="${pet.image}" alt="${pet.name}">
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p class="price">${pet.price}</p>
                <p class="age">Tuổi: ${pet.age}</p>
                <p class="description">${pet.description}</p>
                <button class="view-details" data-id="${pet.id}">Xem chi tiết</button>
            </div>
        </div>
    `).join('');
}

// Testimonials Data
const testimonials = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        image: 'images/testimonial-1.jpg',
        text: 'Tôi rất hài lòng với dịch vụ của FoxCode. Các bé cáo được chăm sóc rất tốt!'
    },
    {
        id: 2,
        name: 'Trần Thị B',
        image: 'images/testimonial-2.jpg',
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