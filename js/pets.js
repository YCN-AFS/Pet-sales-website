// Pet Data
const pets = [
    {
        id: 1,
        name: 'Cáo Bắc Cực',
        price: '15.000.000đ',
        image: 'images/fox-1.jpg',
        age: '6 tháng',
        color: 'white',
        category: 'fox',
        description: 'Cáo Bắc Cực thông minh, thân thiện',
        health: 'Tốt',
        gender: 'Cái'
    },
    {
        id: 2,
        name: 'Cáo Đỏ',
        price: '12.000.000đ',
        image: 'images/fox-2.jpg',
        age: '8 tháng',
        color: 'red',
        category: 'fox',
        description: 'Cáo Đỏ năng động, thích chơi đùa',
        health: 'Tốt',
        gender: 'Đực'
    },
    // Add more pets as needed
];

// View Toggle Functionality
const viewButtons = document.querySelectorAll('.view-btn');
const petGrid = document.querySelector('.pet-grid');

viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const view = button.dataset.view;
        petGrid.className = view === 'grid' ? 'pet-grid' : 'pet-list';
        
        renderPets(currentPage);
    });
});

// Filter Functionality
const filterSelects = document.querySelectorAll('.filter-select');
let currentFilters = {
    price: '',
    age: '',
    color: ''
};

filterSelects.forEach(select => {
    select.addEventListener('change', () => {
        currentFilters[select.id.replace('-filter', '')] = select.value;
        currentPage = 1;
        renderPets(currentPage);
    });
});

// Pagination
let currentPage = 1;
const itemsPerPage = 9;

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.querySelector('.pagination');
    
    let paginationHTML = `
        <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}">${i}</button>
        `;
    }
    
    paginationHTML += `
        <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
    
    // Add event listeners to pagination buttons
    const pageButtons = pagination.querySelectorAll('.page-btn');
    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.disabled) return;
            
            if (button.querySelector('.fa-chevron-left')) {
                currentPage--;
            } else if (button.querySelector('.fa-chevron-right')) {
                currentPage++;
            } else {
                currentPage = parseInt(button.textContent);
            }
            
            renderPets(currentPage);
        });
    });
}

// Render Pets
function renderPets(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Filter pets based on current filters
    let filteredPets = pets.filter(pet => {
        if (currentFilters.price) {
            const [min, max] = currentFilters.price.split('-').map(Number);
            const price = parseInt(pet.price.replace(/[^0-9]/g, ''));
            if (max) {
                if (price < min * 1000000 || price > max * 1000000) return false;
            } else {
                if (price < min * 1000000) return false;
            }
        }
        
        if (currentFilters.age) {
            const [min, max] = currentFilters.age.split('-').map(Number);
            const age = parseInt(pet.age);
            if (max) {
                if (age < min || age > max) return false;
            } else {
                if (age < min) return false;
            }
        }
        
        if (currentFilters.color && pet.color !== currentFilters.color) {
            return false;
        }
        
        return true;
    });
    
    const paginatedPets = filteredPets.slice(startIndex, endIndex);
    
    // Render pet cards
    petGrid.innerHTML = paginatedPets.map(pet => `
        <div class="pet-card" data-category="${pet.category}">
            <div class="pet-image">
                <img src="${pet.image}" alt="${pet.name}">
                <div class="pet-overlay">
                    <button class="view-details" data-id="${pet.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="add-to-cart" data-id="${pet.id}">
                        <i class="fas fa-shopping-cart"></i>
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
                <p class="description">${pet.description}</p>
                <div class="pet-health">
                    <i class="fas fa-heart"></i>
                    <span>${pet.health}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update pagination
    updatePagination(filteredPets.length);
    
    // Add event listeners to pet card buttons
    addPetCardEventListeners();
}

// Add event listeners to pet card buttons
function addPetCardEventListeners() {
    const viewButtons = document.querySelectorAll('.view-details');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const petId = parseInt(button.dataset.id);
            window.location.href = `pet-details.html?id=${petId}`;
        });
    });
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const petId = parseInt(button.dataset.id);
            addToCart(petId);
        });
    });
}

// Search Functionality
const searchInput = document.querySelector('.search-input');
let searchTimeout;

searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase();
        currentPage = 1;
        
        // Filter pets based on search term
        const filteredPets = pets.filter(pet => 
            pet.name.toLowerCase().includes(searchTerm) ||
            pet.description.toLowerCase().includes(searchTerm)
        );
        
        renderPets(currentPage);
    }, 300);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPets(currentPage);
}); 