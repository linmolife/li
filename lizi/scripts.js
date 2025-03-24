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
document.querySelectorAll('.product-item').forEach(item => {
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
// 在scripts.js中添加
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
// 表单提交处理（更新后代码）
document.querySelector('.custom-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // 添加按钮loading状态
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';
    submitBtn.disabled = true;

    // 获取表单数据
    const formData = new FormData(this);
    
    // 验证逻辑
    if(!formData.get('name') || !formData.get('phone') || !formData.get('email')) {
        Swal.fire({
            icon: 'error',
            title: '哎呀...',
            text: '请填写所有必填项哦~ ✨',
            confirmButtonColor: '#ff85a2'
        });
        submitBtn.innerHTML = '<i class="fas fa-magic"></i> 提交定制需求';
        submitBtn.disabled = false;
        return;
    }

    // 模拟异步提交（实际使用时替换为真实API调用）
    setTimeout(() => {
        // 显示成功提示
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
            },
            didClose: () => {
                this.reset();
                submitBtn.innerHTML = '<i class="fas fa-magic"></i> 提交定制需求';
                submitBtn.disabled = false;
            }
        });
    }, 1000); // 模拟1秒延迟
});


// 更新后的轮播图逻辑
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.carousel-dots');
const track = document.querySelector('.carousel-track');

// 初始化指示点
items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if(index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    items.forEach((item, i) => {
        item.classList.toggle('active', i === currentIndex);
    });
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = (index + items.length) % items.length;
    updateCarousel();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
}

// 按钮事件
document.querySelector('.right-btn').addEventListener('click', nextSlide);
document.querySelector('.left-btn').addEventListener('click', prevSlide);

// 自动播放
let autoPlay = setInterval(nextSlide, 5000);

// 鼠标悬停暂停
track.addEventListener('mouseenter', () => clearInterval(autoPlay));
track.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 5000));