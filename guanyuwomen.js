document.addEventListener('DOMContentLoaded', function() {
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

    // 响应式导航栏功能
    const navLinks = document.querySelector('.nav-links');
    function updateNavDisplay() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    }
    updateNavDisplay();
    window.addEventListener('resize', updateNavDisplay);

    // 点击爱心特效
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

    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-100px); }
        }
    `;
    document.head.appendChild(style);

    // 添加分享功能
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

    // 优化表单功能 - 自动生成订单编号
    document.querySelector('.custom-form').addEventListener('input', function(e) {
        if (e.target.id === 'name') {
            const name = e.target.value.trim();
            if (name) {
                const orderNumber = generateOrderNumber(name);
                document.querySelector('.submit-btn').dataset.orderNumber = orderNumber;
            }
        }
    });

    function generateOrderNumber(name) {
        const timestamp = new Date().getTime();
        const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return `${timestamp}-${nameHash}`;
    }

    // 在表单提交时使用订单编号
    document.querySelector('.custom-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        const orderNumber = submitBtn.dataset.orderNumber;
        const formData = new FormData(this);
        formData.append('orderNumber', orderNumber);
    });

    // 优化表单验证
    document.querySelector('.custom-form').addEventListener('submit', function(e) {
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

    // 图片懒加载
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

    // 动态效果 - 星星和月亮
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

    setTimeout(() => {
        document.querySelector('.moon').style.animation = 'moonFade 10s infinite';
    }, 3000);

    // 粒子生成器
    function createCraftParticles() {
        const container = document.querySelector('.craft-particles');
        for(let i=0; i<30; i++) {
            const particle = document.createElement('div');
            particle.className = 'craft-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(particle);
        }
    }
    createCraftParticles();

    // 自动暂停动画当元素不可见时
    const waveObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.querySelector('path').style.animationPlayState = 
                entry.isIntersecting ? 'running' : 'paused';
        });
    });
    document.querySelectorAll('.wave-divider').forEach(el => waveObserver.observe(el));
});




