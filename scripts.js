// ===== 轮播图功能 =====
// 定义变量：当前幻灯片索引、所有幻灯片元素、指示点容器等
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.carousel-dots');
const track = document.querySelector('.carousel-track');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

/**
 * 初始化轮播图指示点
 * 为每张幻灯片创建一个对应的指示点
 */
function initCarouselDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active'); // 默认激活第一个点
        dot.addEventListener('click', () => goToSlide(index)); // 点击跳转到对应幻灯片
        dotsContainer.appendChild(dot);
    });
}

/**
 * 显示指定索引的幻灯片
 * @param {number} index - 要显示的幻灯片索引
 */
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index); // 切换active类
    });
}

/**
 * 更新轮播图状态
 * 包括移动轨道位置、更新指示点状态
 */
function updateCarousel() {
    // 移动轨道位置
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // 更新幻灯片active状态
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
    
    // 更新指示点active状态
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

/**
 * 跳转到指定幻灯片
 * @param {number} index - 目标幻灯片索引
 */
function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length; // 处理边界值
    updateCarousel();
}

/**
 * 下一张幻灯片
 */
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

/**
 * 上一张幻灯片
 */
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

/**
 * 初始化轮播图
 * 包括创建指示点、绑定按钮事件、设置自动播放
 */
function initCarousel() {
    initCarouselDots(); // 创建指示点
    showSlide(currentSlide); // 显示初始幻灯片
    
    // 绑定按钮点击事件
    rightBtn.addEventListener('click', nextSlide);
    leftBtn.addEventListener('click', prevSlide);
    
    // 设置自动播放
    let autoPlay = setInterval(nextSlide, 5000);
    
    // 鼠标悬停暂停自动播放
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 5000);
    });
}

// ===== 响应式导航栏功能 =====
/**
 * 处理导航栏的响应式显示
 * 在小屏幕下隐藏导航链接
 */
function handleResponsiveNav() {
    const navLinks = document.querySelector('.nav-links');
    window.addEventListener('resize', () => {
        navLinks.style.display = window.innerWidth > 768 ? 'flex' : 'none';
    });
}

// ===== 产品卡片交互效果 =====
/**
 * 初始化产品卡片的悬停效果
 * 鼠标悬停时轻微旋转和放大
 */
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

// ===== 爱心点击特效 =====
/**
 * 初始化爱心点击效果
 * 点击特色卡片时显示漂浮的爱心
 */
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
            setTimeout(() => heart.remove(), 1000); // 1秒后移除爱心
        }
    });

    // 添加漂浮动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-100px); }
        }
    `;
    document.head.appendChild(style);
}

// ===== 平滑滚动效果 =====
/**
 * 初始化页面内的平滑滚动
 * 点击锚点链接时平滑滚动到对应位置
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80; // 导航栏高度偏移
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth' // 平滑滚动
                });
            }
        });
    });
}

// ===== 表单提交处理 =====
/**
 * 初始化表单提交逻辑
 * 包括表单验证和提交状态处理
 */
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

        // 验证逻辑 - 检查必填字段
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

/**
 * 显示表单验证失败的提示
 */
function showValidationAlert() {
    Swal.fire({
        icon: 'error',
        title: '哎呀...',
        text: '请填写所有必填项哦~ ✨',
        confirmButtonColor: '#ff85a2'
    });
}

/**
 * 显示表单提交成功的提示
 */
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

// ===== 特色卡片动画效果 =====
/**
 * 初始化特色卡片的图标动画
 * 鼠标悬停时图标弹跳
 */
function initFeaturesAnimation() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        // 鼠标悬停时添加弹跳动画
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('i');
            icon.style.animation = 'bounce 1s infinite';
        });
        
        // 鼠标离开时停止动画
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('i');
            icon.style.animation = 'none';
        });
    });
}

// ===== 分享功能和回到顶部按钮 =====
/**
 * 初始化分享按钮和回到顶部按钮
 */
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
            // 使用浏览器原生分享API
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

    // 滚动事件监听 - 显示/隐藏回到顶部按钮
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
            behavior: 'smooth' // 平滑滚动
        });
    });

    // 按钮悬停效果
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

// ===== 初始化所有功能 =====
/**
 * 页面加载完成后初始化所有功能
 */
function initAllFeatures() {
    initCarousel(); // 轮播图
    handleResponsiveNav(); // 响应式导航
    initProductItemInteraction(); // 产品卡片交互
    initHeartEffect(); // 爱心点击效果
    initSmoothScroll(); // 平滑滚动
    initFormSubmission(); // 表单提交
    initShareAndTopButton(); // 分享和回到顶部按钮
    initFeaturesAnimation(); // 特色卡片动画
}

// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', initAllFeatures);