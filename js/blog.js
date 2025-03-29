// Blog Data
const blogPosts = [
    {
        id: 1,
        title: 'Cách chăm sóc cáo Bắc Cực',
        excerpt: 'Hướng dẫn chi tiết về cách chăm sóc và nuôi dưỡng cáo Bắc Cực trong môi trường gia đình.',
        image: 'images/blog/fox-care.jpg',
        category: 'care',
        date: '2024-03-15',
        author: 'Dr. Nguyễn Văn A',
        readTime: '5 phút',
        views: 1250
    },
    {
        id: 2,
        title: 'Huấn luyện cáo: Bắt đầu từ đâu?',
        excerpt: 'Những bước cơ bản để huấn luyện cáo của bạn trở nên ngoan ngoãn và biết nghe lời.',
        image: 'images/blog/fox-training.jpg',
        category: 'training',
        date: '2024-03-14',
        author: 'Ths. Trần Thị B',
        readTime: '7 phút',
        views: 980
    },
    {
        id: 3,
        title: 'Dấu hiệu bệnh thường gặp ở cáo',
        excerpt: 'Các dấu hiệu và triệu chứng bệnh phổ biến ở cáo mà chủ nuôi cần lưu ý.',
        image: 'images/blog/fox-health.jpg',
        category: 'health',
        date: '2024-03-13',
        author: 'BS. Lê Văn C',
        readTime: '6 phút',
        views: 850
    },
    {
        id: 4,
        title: 'Mẹo chọn thức ăn cho cáo',
        excerpt: 'Hướng dẫn chọn lựa thức ăn phù hợp và chế độ dinh dưỡng tốt nhất cho cáo.',
        image: 'images/blog/fox-food.jpg',
        category: 'tips',
        date: '2024-03-12',
        author: 'CN. Phạm Thị D',
        readTime: '4 phút',
        views: 720
    }
];

// Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
}

// Render Blog Posts
function renderBlogPosts(posts, container) {
    if (!container) return;

    container.innerHTML = posts.map(post => `
        <article class="blog-post" data-category="${post.category}">
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}">
                <div class="post-category">${post.category}</div>
            </div>
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="post-meta">
                    <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
                    <span><i class="far fa-clock"></i> ${post.readTime}</span>
                    <span><i class="far fa-eye"></i> ${post.views}</span>
                </div>
                <a href="blog-post.html?id=${post.id}" class="read-more">
                    Đọc thêm
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');
}

// Render Popular Posts
function renderPopularPosts() {
    const popularPostsList = document.querySelector('.popular-posts-list');
    if (!popularPostsList) return;

    const popularPosts = [...blogPosts]
        .sort((a, b) => b.views - a.views)
        .slice(0, 3);

    popularPostsList.innerHTML = popularPosts.map(post => `
        <div class="popular-post">
            <img src="${post.image}" alt="${post.title}">
            <div class="post-info">
                <h4>${post.title}</h4>
                <span>${formatDate(post.date)}</span>
            </div>
        </div>
    `).join('');
}

// Filter Posts by Category
function filterPosts(category) {
    const postsGrid = document.querySelector('.posts-grid');
    if (!postsGrid) return;

    const filteredPosts = category === 'all'
        ? blogPosts
        : blogPosts.filter(post => post.category === category);

    renderBlogPosts(filteredPosts, postsGrid);
}

// Search Posts
function searchPosts(query) {
    const postsGrid = document.querySelector('.posts-grid');
    if (!postsGrid) return;

    const searchResults = blogPosts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
    );

    renderBlogPosts(searchResults, postsGrid);
}

// Pagination
let currentPage = 1;
const postsPerPage = 6;

function updatePagination(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;

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

            const category = document.querySelector('.category-list li.active a').dataset.category;
            filterPosts(category);
        });
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your backend
        console.log('Newsletter subscription:', email);
        
        showNotification('Cảm ơn bạn đã đăng ký nhận tin!', 'success');
        newsletterForm.reset();
    });
}

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
    // Render initial posts
    const postsGrid = document.querySelector('.posts-grid');
    renderBlogPosts(blogPosts, postsGrid);
    renderPopularPosts();
    updatePagination(blogPosts.length);

    // Category filter
    const categoryLinks = document.querySelectorAll('.category-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            
            categoryLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            currentPage = 1;
            filterPosts(category);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.blog-search input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchPosts(e.target.value);
            }, 300);
        });
    }
}); 