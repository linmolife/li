document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // 检查本地存储中是否有记住的用户
    const rememberCheckbox = document.getElementById('remember');
    const usernameInput = document.getElementById('username');
    
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        const userData = JSON.parse(rememberedUser);
        usernameInput.value = userData.username;
        rememberCheckbox.checked = true;
    }
    
    // 登录表单提交
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = rememberCheckbox.checked;
        
        // 从本地存储获取用户数据
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username);
        
        if (!user) {
            Swal.fire({
                icon: 'error',
                title: '登录失败',
                text: '用户名不存在',
                confirmButtonColor: '#ff85a2'
            });
            return;
        }
        
        if (user.password !== password) {
            Swal.fire({
                icon: 'error',
                title: '登录失败',
                text: '密码不正确',
                confirmButtonColor: '#ff85a2'
            });
            return;
        }
        
        // 登录成功
        if (remember) {
            localStorage.setItem('rememberedUser', JSON.stringify({ username }));
        } else {
            localStorage.removeItem('rememberedUser');
        }
        
        // 保存当前登录用户
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // 隐藏注册按钮
        const registerButton = document.querySelector('a[href="register.html"]');
        if (registerButton) {
            registerButton.style.display = 'none';
        }
        
        Swal.fire({
            icon: 'success',
            title: '登录成功',
            text: '欢迎回来！即将跳转到首页...',
            confirmButtonColor: '#ff85a2'
        }).then(() => {
            window.location.href = 'index.html';
        });
    });
});