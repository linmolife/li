

// 产品卡片图片加载效果
function initProductImageLoading() {
    const lazyImages = document.querySelectorAll('.gallery-item img[data-src]');
    
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
}

// 产品系列标题动画
function initThemeTitleAnimation() {
    const themeTitles = document.querySelectorAll('.theme-title');
    
    themeTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.animation = 'bounce 0.5s ease';
        });
        
        title.addEventListener('mouseleave', () => {
            title.style.animation = '';
        });
    });
}

// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', function() {
    initProductImageLoading();
    initThemeTitleAnimation();
    initShareAndTopButton();
    initFormSubmission();
    initLoginModal(); 
});
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    } else {
        console.error('未找到按钮或导航菜单元素！');
    }
});
