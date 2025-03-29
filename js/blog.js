// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Cách chăm sóc cáo con mới sinh",
        excerpt: "Hướng dẫn chi tiết về cách chăm sóc và nuôi dưỡng cáo con trong những ngày đầu tiên, từ việc cho ăn đến giữ ấm và vệ sinh.",
        image: "https://static.tuoitre.vn/tto/i/s626/2014/12/03/yzb7Tgd6.jpg",
        category: "care",
        date: "2024-03-15",
        author: "Nguyễn Thị Lan",
        readTime: "8 phút",
        views: 1250
    },
    {
        id: 2,
        title: "Huấn luyện cáo: Bắt đầu từ đâu?",
        excerpt: "Tìm hiểu các bước cơ bản để huấn luyện cáo, từ việc thiết lập mối quan hệ tin cậy đến các bài tập cơ bản.",
        image: "images/train_fox.png",
        category: "training",
        date: "2024-03-14",
        author: "Trần Văn Minh",
        readTime: "10 phút",
        views: 980
    },
    {
        id: 3,
        title: "Các bệnh thường gặp ở cáo và cách phòng tránh",
        excerpt: "Tổng hợp những căn bệnh phổ biến ở cáo, dấu hiệu nhận biết và các biện pháp phòng ngừa hiệu quả.",
        image: "https://www.veterinary-practice.com/wp-content/uploads/2024/08/F2-A-comprehensive-clinical-examination.jpg",
        category: "health",
        date: "2024-03-13",
        author: "Lê Thị Hương",
        readTime: "12 phút",
        views: 1560
    },
    {
        id: 4,
        title: "Mẹo chọn thức ăn phù hợp cho cáo",
        excerpt: "Hướng dẫn chi tiết về chế độ dinh dưỡng cho cáo, từ việc chọn thức ăn đến lịch cho ăn phù hợp.",
        image: "https://foxguardians.co.uk/wp-content/uploads/2021/03/fox-food-4-peanuts-1536x864.jpg",
        category: "tips",
        date: "2024-03-12",
        author: "Phạm Văn Tuấn",
        readTime: "7 phút",
        views: 890
    },
    {
        id: 5,
        title: "Cách tạo môi trường sống lý tưởng cho cáo",
        excerpt: "Tìm hiểu cách thiết kế không gian sống phù hợp cho cáo, đảm bảo sự thoải mái và an toàn cho thú cưng.",
        image: "https://www.blackfoxes.co.uk/resources/fox-6068164_1920.jpg.opt758x502o0%2C0s758x502.jpg",
        category: "care",
        date: "2024-03-11",
        author: "Hoàng Thị Mai",
        readTime: "9 phút",
        views: 1120
    },
    {
        id: 6,
        title: "Huấn luyện cáo đi vệ sinh đúng chỗ",
        excerpt: "Hướng dẫn chi tiết về cách huấn luyện cáo đi vệ sinh đúng chỗ, giúp chủ nuôi dễ dàng quản lý vệ sinh.",
        image: "images/toilet-fox.png",
        category: "training",
        date: "2024-03-10",
        author: "Đỗ Văn Hùng",
        readTime: "6 phút",
        views: 750
    }
];

// Format date to Vietnamese locale
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Render blog posts
function renderBlogPosts(posts = blogPosts) {
    const blogPostsContainer = document.querySelector('.blog-posts');
    if (!blogPostsContainer) return;

    blogPostsContainer.innerHTML = posts.map(post => `
        <article class="blog-post">
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
                    <span><i class="far fa-clock"></i> ${post.readTime}</span>
                    <span><i class="far fa-eye"></i> ${post.views}</span>
                </div>
                <a href="#" class="read-more">Đọc thêm</a>
            </div>
        </article>
    `).join('');
}

// Render popular posts
function renderPopularPosts() {
    const popularPostsContainer = document.querySelector('.popular-posts');
    if (!popularPostsContainer) return;

    // Sort posts by views and get top 3
    const popularPosts = [...blogPosts]
        .sort((a, b) => b.views - a.views)
        .slice(0, 3);

    popularPostsContainer.innerHTML = popularPosts.map(post => `
        <div class="popular-post">
            <div class="popular-post-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="popular-post-content">
                <h4>${post.title}</h4>
                <p>${formatDate(post.date)}</p>
            </div>
        </div>
    `).join('');
}

// Filter posts by category
function filterPosts(category) {
    const filteredPosts = category === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === category);
    
    renderBlogPosts(filteredPosts);
}

// Search posts
function searchPosts(query) {
    const searchResults = blogPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    
    renderBlogPosts(searchResults);
}

// Pagination
let currentPage = 1;
const postsPerPage = 6;

function updatePagination() {
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);
    const pageNumbers = document.querySelector('.page-numbers');
    
    if (!pageNumbers) return;

    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="page-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += '<span>...</span>';
        }
    }

    // Next button
    paginationHTML += `
        <button class="page-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    pageNumbers.innerHTML = paginationHTML;
}

// Newsletter subscription
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Simulate newsletter subscription
    showNotification('Cảm ơn bạn đã đăng ký nhận tin!', 'success');
    event.target.reset();
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Render initial content
    renderBlogPosts();
    renderPopularPosts();
    updatePagination();

    // Category filter
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterPosts(button.dataset.category);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchPosts(e.target.value);
        });
    }

    // Pagination
    document.addEventListener('click', (e) => {
        if (e.target.closest('.page-btn')) {
            const button = e.target.closest('.page-btn');
            const page = button.dataset.page;

            if (page === 'prev' && currentPage > 1) {
                currentPage--;
            } else if (page === 'next' && currentPage < Math.ceil(blogPosts.length / postsPerPage)) {
                currentPage++;
            } else if (!isNaN(page)) {
                currentPage = parseInt(page);
            }

            updatePagination();
        }
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}); 