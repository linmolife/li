// 轮播图功能
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// 自动轮播
setInterval(nextSlide, 5000);

// 初始化显示第一个轮播项
showSlide(0);

// 响应式导航栏功能
window.addEventListener('resize', () => {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// 新增互动功能
document.querySelectorAll('.product-card').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'rotate(2deg) scale(1.05)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'rotate(0deg) scale(1)';
    });
});

// 新增点击爱心特效
document.body.addEventListener('click', function(e) {
    if(e.target.closest('.feature-card')) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = e.pageX + 'px';
        heart.style.top = e.pageY + 'px';
        heart.style.animation = 'floatUp 1s ease-out';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
});

// 新增动画
const style = document.createElement('style');
style.textContent = `
@keyframes floatUp {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-100px); }
}
`;
document.head.appendChild(style);

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // 导航栏高度
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});





// 添加分享功能
document.addEventListener('DOMContentLoaded', function() {
    // 创建分享按钮
    const shareButton = document.createElement('button');
    shareButton.id = 'share-button';
    shareButton.innerHTML = '<i class="fas fa-share"></i> 分享页面';
    shareButton.style.position = 'fixed';
    shareButton.style.bottom = '20px';
    shareButton.style.right = '20px';
    shareButton.style.padding = '10px 20px';
    shareButton.style.backgroundColor = '#ff6392';
    shareButton.style.color = 'white';
    shareButton.style.border = 'none';
    shareButton.style.borderRadius = '5px';
    shareButton.style.cursor = 'pointer';
    shareButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    shareButton.style.zIndex = '1000';
    
    document.body.appendChild(shareButton);
    
    // 分享功能实现
    shareButton.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: '梦幻玩偶工坊 - 关于我们',
                url: window.location.href
            })
            .catch(error => console.log('分享失败:', error));
        } else {
            alert('您的浏览器不支持原生分享功能，请手动复制链接分享');
        }
    });

    // 创建回到顶部按钮
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.left = '20px';
    backToTopButton.style.width = '40px';
    backToTopButton.style.height = '40px';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.backgroundColor = '#ff6392';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.opacity = '0';
    backToTopButton.style.transition = 'opacity 0.3s ease';
    backToTopButton.style.zIndex = '1000';
    backToTopButton.style.display = 'flex';
    backToTopButton.style.alignItems = 'center';
    backToTopButton.style.justifyContent = 'center';
    backToTopButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    
    document.body.appendChild(backToTopButton);

    // 滚动事件监听
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            shareButton.classList.add('show');
            backToTopButton.style.opacity = '1';
        } else {
            shareButton.classList.remove('show');
            backToTopButton.style.opacity = '0';
        }
    });

    // 点击按钮回到顶部
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 悬停效果
    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.backgroundColor = '#ff4757';
    });

    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.backgroundColor = '#ff6392';
    });
});