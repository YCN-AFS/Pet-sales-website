// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const faqItems = document.querySelectorAll('.faq-item');

    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Validate form data
            if (!validateForm(formData)) {
                return;
            }

            // Simulate form submission
            showNotification('Đang gửi tin nhắn...', 'info');

            // Simulate API call
            setTimeout(() => {
                showNotification('Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi sớm nhất có thể.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }

    // Handle FAQ interactions
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = item.querySelector('.fa-chevron-down');
        
        question.addEventListener('click', () => {
            // Close all other answers
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    icon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current answer
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});

// Form validation
function validateForm(data) {
    // Name validation
    if (data.name.trim().length < 2) {
        showNotification('Vui lòng nhập họ tên hợp lệ', 'error');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Vui lòng nhập email hợp lệ', 'error');
        return false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
        showNotification('Vui lòng nhập số điện thoại hợp lệ', 'error');
        return false;
    }

    // Subject validation
    if (!data.subject) {
        showNotification('Vui lòng chọn chủ đề', 'error');
        return false;
    }

    // Message validation
    if (data.message.trim().length < 10) {
        showNotification('Vui lòng nhập nội dung tin nhắn (ít nhất 10 ký tự)', 'error');
        return false;
    }

    return true;
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add to body
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
} 