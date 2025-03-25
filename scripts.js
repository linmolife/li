// 轮播图功能
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.carousel-dots');
const track = document.querySelector('.carousel-track');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

// 初始化轮播图指示点
function initCarouselDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

// 显示指定索引的轮播项
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

// 更新轮播图位置和指示点
function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// 轮播图导航功能
function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    updateCarousel();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

// 初始化轮播图
function initCarousel() {
    initCarouselDots();
    showSlide(currentSlide);
    // 按钮事件监听
    rightBtn.addEventListener('click', nextSlide);
    leftBtn.addEventListener('click', prevSlide);
    // 自动播放
    let autoPlay = setInterval(nextSlide, 5000);
    // 鼠标悬停暂停
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 5000);
    });
}

// 响应式导航栏功能
function handleResponsiveNav() {
    const navLinks = document.querySelector('.nav-links');
    window.addEventListener('resize', () => {
        navLinks.style.display = window.innerWidth > 768 ? 'flex' : 'none';
    });
}

// 产品卡片交互效果
function initProductItemInteraction() {
    document.querySelectorAll('.product-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'rotate(2deg) scale(1.05)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'rotate(0deg) scale(1)';
        });
    });
}

// 点击爱心特效
function initHeartEffect() {
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.feature-card')) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = `${e.pageX}px`;
            heart.style.top = `${e.pageY}px`;
            heart.style.animation = 'floatUp 1s ease-out';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }
    });

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-100px); }
        }
    `;
    document.head.appendChild(style);
}

// 平滑滚动效果
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80; // 导航栏高度
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 表单提交处理
function initFormSubmission() {
    const form = document.querySelector('.custom-form');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 添加按钮加载状态
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';
        submitBtn.disabled = true;

        // 获取表单数据
        const formData = new FormData(form);

        // 验证逻辑
        if (!formData.get('name') || !formData.get('phone') || !formData.get('email')) {
            showValidationAlert();
            submitBtn.innerHTML = '<i class="fas fa-magic"></i> 提交定制需求';
            submitBtn.disabled = false;
            return;
        }

        // 模拟异步提交
        setTimeout(() => {
            showSuccessAlert();
            form.reset();
            submitBtn.innerHTML = '<i class="fas fa-magic"></i> 提交定制需求';
            submitBtn.disabled = false;
        }, 1000);
    });
}

// 显示验证警告
function showValidationAlert() {
    Swal.fire({
        icon: 'error',
        title: '哎呀...',
        text: '请填写所有必填项哦~ ✨',
        confirmButtonColor: '#ff85a2'
    });
}

// 显示成功提示
function showSuccessAlert() {
    Swal.fire({
        icon: 'success',
        title: '✨ 提交成功 ✨',
        html: '<div class="success-message">' +
              '<i class="fas fa-check-circle"></i>' +
              '<p>我们会在24小时内联系您~</p>' +
              '</div>',
        confirmButtonColor: '#ff85a2',
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title'
        }
    });
}

// 添加分享功能和回到顶部按钮
function initShareAndTopButton() {
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

    // 分享功能实现
    shareButton.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: '梦幻玩偶工坊 - 关于我们',
                url: window.location.href
            }).catch(error => console.log('分享失败:', error));
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

    // 添加按钮到页面
    document.body.appendChild(shareButton);
    document.body.appendChild(backToTopButton);
}

// 初始化所有功能
function initAllFeatures() {
    initCarousel();
    handleResponsiveNav();
    initProductItemInteraction();
    initHeartEffect();
    initSmoothScroll();
    initFormSubmission();
    initShareAndTopButton();
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', initAllFeatures);