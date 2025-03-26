document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    initSmoothScroll();
    // 响应式导航栏功能
    initResponsiveNav();
    // 移动端菜单
    initMobileMenu();
    // 点击爱心特效
    initHeartEffect();
    // 添加分享功能和回到顶部按钮
    initShareAndTopButton();
    // 表单功能优化
    initFormFeatures();
    // 图片懒加载
    initLazyLoading();
    // 动态效果 - 星星和月亮
    initDynamicEffects();
    // 表单提交成功
    initFormSubmission();
});

// 平滑滚动功能
function initSmoothScroll() {
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
}

// 响应式导航栏功能
function initResponsiveNav() {
    const navLinks = document.querySelector('.nav-links');
    function updateNavDisplay() {
        navLinks.style.display = window.innerWidth > 768 ? 'flex' : 'none';
    }
    updateNavDisplay();
    window.addEventListener('resize', updateNavDisplay);
}

// 移动端导航菜单功能
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // 点击链接后自动关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '☰';
            }
        });
    });
}

// 点击爱心特效
function initHeartEffect() {
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.feature-card')) {
            createHeartEffect(e.pageX, e.pageY);
        }
    });

    function createHeartEffect(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.animation = 'floatUp 1s ease-out';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }

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

// 分享功能和回到顶部按钮
function initShareAndTopButton() {
    // 创建分享按钮
    const shareButton = createShareButton();
    // 创建回到顶部按钮
    const backToTopButton = createBackToTopButton();
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
    addHoverEffects(backToTopButton);
}

function createShareButton() {
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
    shareButton.addEventListener('click', handleShareClick);
    return shareButton;
}

function createBackToTopButton() {
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
    return backToTopButton;
}

function addHoverEffects(button) {
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#ff4757';
    });
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#ff6392';
    });
}

function handleShareClick() {
    if (navigator.share) {
        navigator.share({
            title: '梦幻玩偶工坊 - 关于我们',
            url: window.location.href
        }).catch(error => console.log('分享失败:', error));
    } else {
        alert('您的浏览器不支持原生分享功能，请手动复制链接分享');
    }
}

// 表单功能优化
function initFormFeatures() {
    const form = document.querySelector('.custom-form');
    const submitBtn = form.querySelector('button[type="submit"]');

    // 自动生成订单编号
    form.addEventListener('input', function(e) {
        if (e.target.id === 'name') {
            const name = e.target.value.trim();
            if (name) {
                const orderNumber = generateOrderNumber(name);
                submitBtn.dataset.orderNumber = orderNumber;
            }
        }
    });

    function generateOrderNumber(name) {
        const timestamp = new Date().getTime();
        const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return `${timestamp}-${nameHash}`;
    }

    // 表单提交时使用订单编号
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const orderNumber = submitBtn.dataset.orderNumber;
        const formData = new FormData(this);
        formData.append('orderNumber', orderNumber);
    });

    // 表单验证
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        if (!formData.get('name') || !formData.get('phone') || !formData.get('email')) {
            showValidationAlert();
            return;
        }
    });

    function showValidationAlert() {
        Swal.fire({
            icon: 'error',
            title: '哎呀...',
            text: '请填写所有必填项哦~ ✨',
            confirmButtonColor: '#ff85a2'
        });
    }
}

// 图片懒加载
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.image-lazy');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => {
        observer.observe(img);
    });
}

// 动态效果 - 星星和月亮
function initDynamicEffects() {
    // 创建星星
    createStars();
    // 创建月亮动画
    initMoonAnimation();
    // 创建粒子效果
    createParticles();
    // 创建波浪效果
    initWaveEffect();
}

function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.innerHTML = '★';
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 0.5 + 0.5;
        const delay = Math.random() * 2;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.fontSize = `${size}rem`;
        star.style.animationDelay = `${delay}s`;
        starsContainer.appendChild(star);
    }
}

function initMoonAnimation() {
    setTimeout(() => {
        document.querySelector('.moon').style.animation = 'moonFade 10s infinite';
    }, 3000);
}

function createParticles() {
    const container = document.querySelector('.craft-particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'craft-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(particle);
    }
}

function initWaveEffect() {
    const waveObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.querySelector('path').style.animationPlayState = 
                entry.isIntersecting ? 'running' : 'paused';
        });
    });
    document.querySelectorAll('.wave-divider').forEach(el => waveObserver.observe(el));
}
