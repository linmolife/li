document.addEventListener('DOMContentLoaded', function() {
    // 密码强度检测
    document.getElementById('reg-password').addEventListener('input', function() {
        const password = this.value;
        const strengthBar = document.getElementById('passwordStrength');
        
        // 重置样式
        strengthBar.className = 'password-strength';
        
        if (password.length === 0) return;
        
        // 评估密码强度
        let strength = 0;
        
        // 长度评估
        if (password.length > 6) strength++;
        if (password.length > 10) strength++;
        
        // 包含数字
        if (/\d/.test(password)) strength++;
        
        // 包含小写字母
        if (/[a-z]/.test(password)) strength++;
        
        // 包含大写字母
        if (/[A-Z]/.test(password)) strength++;
        
        // 包含特殊字符
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        // 根据强度设置样式
        if (strength <= 2) {
            strengthBar.classList.add('weak');
        } else if (strength <= 4) {
            strengthBar.classList.add('medium');
        } else {
            strengthBar.classList.add('strong');
        }
    });
    
    // 表单验证
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const phone = document.getElementById('reg-phone').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;
        const termsChecked = document.getElementById('terms').checked;
        
        // 验证密码是否匹配
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: '哎呀...',
                text: '两次输入的密码不一致哦~',
                confirmButtonColor: '#ff85a2'
            });
            return;
        }
        
        // 验证是否同意条款
        if (!termsChecked) {
            Swal.fire({
                icon: 'error',
                title: '哎呀...',
                text: '请先同意我们的服务条款和隐私政策~',
                confirmButtonColor: '#ff85a2'
            });
            return;
        }
        
        // 检查用户名是否已存在
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.username === username)) {
            Swal.fire({
                icon: 'error',
                title: '注册失败',
                text: '该用户名已被使用，请尝试其他用户名',
                confirmButtonColor: '#ff85a2'
            });
            return;
        }
        
        // 检查邮箱是否已注册
        if (users.some(user => user.email === email)) {
            Swal.fire({
                icon: 'error',
                title: '注册失败',
                text: '该邮箱已被注册，请使用其他邮箱或尝试登录',
                confirmButtonColor: '#ff85a2'
            });
            return;
        }
        
        // 模拟注册成功
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 注册中...';
        submitBtn.disabled = true;
        
        // 创建新用户
        const newUser = {
            username,
            email,
            phone,
            password,
            registerDate: new Date().toISOString()
        };
        
        // 保存用户数据到本地存储
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // 模拟异步请求
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: '✨ 注册成功 ✨',
                html: '<div class="success-message">' +
                      '<i class="fas fa-check-circle"></i>' +
                      '<p>欢迎加入梦幻玩偶家族！</p>' +
                      '</div>',
                confirmButtonColor: '#ff85a2',
                customClass: {
                    popup: 'custom-swal-popup',
                    title: 'custom-swal-title'
                }
            }).then(() => {
                // 跳转到登录页面
                window.location.href = 'login.html';
            });
        }, 1500);
    });
});