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
// ===== 移动端导航菜单功能 =====
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // 点击链接后自动关闭菜单（包括登录按钮）
    document.querySelectorAll('.nav-links a, .nav-links .login-btn').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '☰';
            }
        });
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
    initMobileMenu();// 移动端导航
    initProductItemInteraction(); // 产品卡片交互
    initHeartEffect(); // 爱心点击效果
    initSmoothScroll(); // 平滑滚动
    initFormSubmission(); // 表单提交
    initShareAndTopButton(); // 分享和回到顶部按钮
    initFeaturesAnimation(); // 特色卡片动画
}

// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', initAllFeatures);
// 修改移动端菜单点击处理
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // 如果是下拉菜单项则不关闭菜单
        if(!e.target.closest('.dropdown-content')) {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '☰';
            }
        }
    });
});

// 处理下拉菜单点击
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '☰';
        }
    });
});

// ===== 登录功能 =====
function initLoginModal() {
    const loginBtn = document.getElementById('loginBtn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.querySelector('.login-form');
    
    // 打开模态框
    loginBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });
    
    // 关闭模态框
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 表单提交处理
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // 这里可以添加实际的登录逻辑
        console.log('登录信息:', { username, password, remember });
        
        // 模拟登录成功
        Swal.fire({
            icon: 'success',
            title: '登录成功',
            text: '欢迎回来！',
            confirmButtonColor: '#ff85a2'
        });
        
        // 关闭模态框
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // 更新登录按钮状态
        loginBtn.textContent = username;
        loginBtn.style.backgroundColor = '#4CAF50';
    });
}

// 在 initAllFeatures 函数中添加初始化登录功能
function initAllFeatures() {
    initCarousel();
    handleResponsiveNav();
    initMobileMenu();
    initProductItemInteraction();
    initHeartEffect();
    initSmoothScroll();
    initFormSubmission();
    initShareAndTopButton();
    initFeaturesAnimation();
    initLoginModal(); // 添加这行
}





// ===== 忘记密码功能 =====
function initForgotPassword() {
    // 返回登录链接
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html#loginModal';
        });
    }
    
    // 表单提交处理
    const form = document.getElementById('forgotPasswordForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 显示加载状态
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
            submitBtn.disabled = true;
            
            // 模拟发送邮件
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: '邮件已发送',
                    html: '<div class="success-message">' +
                          '<i class="fas fa-paper-plane"></i>' +
                          '<p>请检查您的邮箱并按照指示重置密码</p>' +
                          '</div>',
                    confirmButtonColor: '#ff85a2',
                    customClass: {
                        popup: 'custom-swal-popup',
                        title: 'custom-swal-title'
                    }
                });
                
                // 重置按钮状态
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

/**
 * 检查登录状态并更新导航栏
 */
/**
 * 检查登录状态并更新导航栏
 */
function updateNavForLoggedInUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) return;
    
    const loginLink = navLinks.querySelector('a[href="login.html"]');
    const registerLink = navLinks.querySelector('a[href="register.html"]');
    
    if (currentUser) {
        // 创建用户菜单
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <div class="user-greeting">
                <i class="fas fa-user"></i>
                <span>${currentUser.username}</span>
            </div>
            <div class="user-dropdown">
                <a href="#" class="logout-btn">退出登录</a>
            </div>
        `;
        
        // 替换或添加用户菜单
        if (loginLink) {
            loginLink.replaceWith(userMenu);
        } else {
            // 如果没有找到登录链接，就添加到导航链接末尾
            navLinks.appendChild(userMenu);
        }
        
        // 隐藏注册按钮
        if (registerLink) {
            registerLink.style.display = 'none';
        }
        
        // 添加退出登录事件
        const logoutBtn = userMenu.querySelector('.logout-btn');
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    } else {
        // 如果用户未登录，确保注册按钮显示
        if (registerLink) {
            registerLink.style.display = 'block';
        }
    }
}
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // 点击链接后自动关闭菜单（包括用户菜单）
    document.querySelectorAll('.nav-links > a, .nav-links .user-greeting').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                // 如果是用户菜单，只切换下拉菜单
                if (link.classList.contains('user-greeting')) {
                    e.preventDefault();
                    link.closest('.user-menu').classList.toggle('active');
                } else {
                    navLinks.classList.remove('active');
                    menuBtn.innerHTML = '☰';
                }
            }
        });
    });
}
// 在 initAllFeatures 函数中添加初始化忘记密码功能
function initAllFeatures() {
    updateNavForLoggedInUser(); // 检查登录状态并更新导航栏
    initCarousel();
    handleResponsiveNav();
    initMobileMenu();
    initProductItemInteraction();
    initHeartEffect();
    initSmoothScroll();
    initFormSubmission();
    initShareAndTopButton();
    initFeaturesAnimation();
    initLoginModal();
    initForgotPassword(); // 展示成功样式
}
// 视频自动播放控制
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('click', () => {
        video.paused ? video.play() : video.pause();
    });
    
    // 离开页面时暂停播放
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) video.pause();
    });
});







// 模拟数据关于搜索框的
const dollProducts = [
    {
        name: '精品玩偶',
        series: '童话精灵系列',
        desc: '童话星座系列',
        tags: ['会唱歌', '夜光', '换装'],
        img: 'image/fairy1.jpg',
        link: 'gallery.html#fairy'
    },
    {
        name: '魔法星座系列',
        series: '魔法星座系列',
        desc: '魔法星座系列',
        tags: ['会唱歌', '夜光', '换装'],
        img: 'image/fairy2.jpg',
        link: 'gallery.html#fairy'
    },
    {
        name: '星光精灵系列',
        series: '星光精灵系列',
        desc: '星光星座系列',
        tags: ['会唱歌', '夜光', '灵动可爱'],
        img: 'image/lunbo1.jpg',
        link: 'starlight-spirits.html#fairy'
    },
    {
        name: '梦幻公主城堡',
        series: '梦幻精灵系列',
        desc: '童话世界',
        tags: [ "配首饰盒" ,"磁吸换装","丝绸礼服"],
        img: 'image/lunbo2.jpg',
        link: 'starlight-spirits2.html#fairy'
    },
    {
        name: '森林小伙伴系列',
        series: '森林精灵系列',
        desc: '治愈话语',
        tags: [ "会讲故事","毛绒手感","安全材质"],
        img: 'image/lunbo3.jpg',
        link: 'starlight-spirits3.html#fairy'
    },
    {
        name: '皇家公主系列',
        series: '童话精灵系列',
        desc: '音乐享受系列',
        tags: ['会唱歌', '夜光', '灵动可爱'],
        img: 'image/cp6.jpg',
        link: 'music.html#fairy'
    },
    // 添加更多产品数据...
];

// 搜索功能实现
const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.querySelector('.search-suggestions');
const resultsBox = document.querySelector('.search-results');

// 防抖函数
function debounce(func, delay=300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// 高亮文本
function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// 显示搜索结果
function showResults(results, query) {
    resultsBox.innerHTML = '';
    
    if(results.length === 0) {
        resultsBox.innerHTML = `<div class="no-results">没有找到"${query}"相关结果</div>`;
        return;
    }

    results.forEach(product => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div>
                <h4>${highlightText(product.name, query)}</h4>
                <p>系列：${highlightText(product.series, query)}</p>
                <p>${highlightText(product.desc, query)}</p>
            </div>
        `;
        item.addEventListener('click', () => {
            window.location.href = product.link;
        });
        resultsBox.appendChild(item);
    });
}

// 显示搜索建议
function showSuggestions(suggestions) {
    suggestionsBox.innerHTML = suggestions
        .map(s => `<div class="suggestion-item">${s}</div>`)
        .join('');
    
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            searchInput.value = item.textContent;
            performSearch(item.textContent);
        });
    });
}

// 执行搜索
function performSearch(query) {
    const normalizedQuery = query.trim().toLowerCase();
    
    if(normalizedQuery === '') {
        suggestionsBox.innerHTML = '';
        resultsBox.innerHTML = '';
        return;
    }

    // 搜索逻辑
    const results = dollProducts.filter(product => {
        return Object.values(product).some(value => 
            String(value).toLowerCase().includes(normalizedQuery)
        );
    });

    // 获取建议关键词
    const suggestions = Array.from(new Set(
        dollProducts.flatMap(product => {
            // 确保 tags 是一个数组
            if (Array.isArray(product.tags)) {
                return product.tags.filter(tag => 
                    tag.toLowerCase().includes(normalizedQuery)
                );
            } else {
                console.error(`Product with name "${product.name}" has invalid tags property`);
                return [];
            }
        })
    )).slice(0, 5);

    showResults(results, normalizedQuery);
    showSuggestions(suggestions);
}

// 事件监听
searchInput.addEventListener('input', debounce(() => {
    performSearch(searchInput.value);
}));

// 点击外部关闭结果
document.addEventListener('click', (e) => {
    if(!e.target.closest('.search-box')) {
        suggestionsBox.innerHTML = '';
        resultsBox.innerHTML = '';
    }
});
