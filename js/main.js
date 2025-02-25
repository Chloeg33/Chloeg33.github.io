/**
 * Chloe的课堂空间站 - 主要JavaScript文件
 * 该文件处理整个网站通用的功能和交互
 */

// 当DOM完全加载后执行初始化函数
document.addEventListener('DOMContentLoaded', function () {
    console.log('Chloe的课堂空间站已加载');

    // 初始化所有功能
    initApp();
});

/**
 * 应用程序初始化 - 调用所有需要在页面加载时执行的函数
 */
function initApp() {
    // 激活当前页面的导航链接
    activateCurrentNavLink();

    // 添加滚动动画效果
    initScrollAnimations();

    // 初始化响应式行为
    initResponsiveBehavior();

    // 添加页面过渡效果
    addPageTransitions();

    // 检测系统深色/浅色模式
    detectColorScheme();
}

/**
 * 激活当前页面导航链接 - 根据当前URL为对应导航项添加active类
 */
function activateCurrentNavLink() {
    // 获取当前页面URL的最后部分
    const currentPage = window.location.pathname.split('/').pop();

    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // 移除所有active类
    navLinks.forEach(link => {
        link.classList.remove('active');

        // 如果链接的href属性与当前页面匹配，添加active类
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 如果是首页或空路径，激活首页链接
    if (currentPage === '' || currentPage === '/' || currentPage === 'index.html') {
        const homeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

/**
 * 初始化滚动动画 - 为滚动事件添加视差效果和元素动画
 */
function initScrollAnimations() {
    // 获取需要动画的元素
    const cards = document.querySelectorAll('.card');
    const sections = document.querySelectorAll('section');

    // 监听滚动事件
    window.addEventListener('scroll', function () {
        // 当前滚动位置
        const scrollPosition = window.scrollY;

        // 为卡片添加滚动时的渐入效果
        cards.forEach(card => {
            // 获取卡片在页面中的位置
            const cardPosition = card.getBoundingClientRect().top + window.scrollY;
            // 当卡片即将进入视口时添加动画类
            if (scrollPosition > cardPosition - window.innerHeight * 0.9) {
                card.classList.add('card-visible');
            }
        });

        // 为章节添加视差滚动效果
        sections.forEach(section => {
            // 仅对背景为浅色的章节应用视差效果
            if (section.classList.contains('bg-light')) {
                const offset = (section.getBoundingClientRect().top) * 0.1;
                section.style.backgroundPositionY = offset + 'px';
            }
        });
    });

    // 触发一次滚动事件以初始化可见元素的状态
    window.dispatchEvent(new Event('scroll'));
}

/**
 * 初始化响应式行为 - 处理不同屏幕尺寸下的特定行为
 */
function initResponsiveBehavior() {
    // 导航栏滚动行为（小屏幕上滚动时收起导航）
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // 如果页面存在这些元素
    if (navbar && navbarCollapse && navbarToggler) {
        // 页面滚动时收起已展开的导航菜单
        window.addEventListener('scroll', function () {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });

        // 点击导航链接后自动收起菜单（在小屏幕上）
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                // 仅在小屏幕且导航已展开时执行
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // 调整页面顶部内边距，以适应固定导航栏的高度
    adjustTopPadding();
    window.addEventListener('resize', adjustTopPadding);
}

/**
 * 调整页面顶部内边距 - 确保固定导航栏不遮挡内容
 */
function adjustTopPadding() {
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    if (navbar) {
        // 获取导航栏高度并设置页面顶部内边距
        const navbarHeight = navbar.offsetHeight;
        body.style.paddingTop = navbarHeight + 'px';
    }
}

/**
 * 添加页面过渡效果 - 为页面切换添加平滑过渡
 */
function addPageTransitions() {
    // 为所有内部链接添加过渡效果
    const internalLinks = document.querySelectorAll('a[href^="index"], a[href^="quizzes"], a[href^="games"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // 仅对内部链接应用过渡
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const targetUrl = this.href;

                // 先淡出当前页面
                document.body.classList.add('page-transition-out');

                // 页面淡出后导航到新页面
                setTimeout(function () {
                    window.location.href = targetUrl;
                }, 300);
            }
        });
    });

    // 页面加载时的淡入效果
    document.body.classList.add('page-transition-in');
}

/**
 * 检测系统颜色模式 - 适配系统深色/浅色模式
 */
function detectColorScheme() {
    // 检查系统是否支持深色模式偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // 系统偏好深色模式
        document.body.classList.add('dark-mode');
    }

    // 监听系统颜色模式变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            // 切换到深色模式
            document.body.classList.add('dark-mode');
        } else {
            // 切换到浅色模式
            document.body.classList.remove('dark-mode');
        }
    });
}

/**
 * 格式化日期 - 将日期对象转换为友好的显示格式
 * @param {Date} date - 需要格式化的日期对象
 * @return {string} 格式化后的日期字符串
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}年${month}月${day}日`;
}

/**
 * 显示通知 - 在页面顶部显示一个临时通知
 * @param {string} message - 通知内容
 * @param {string} type - 通知类型 (success, error, info)
 * @param {number} duration - 显示时长(毫秒)
 */
function showNotification(message, type = 'info', duration = 3000) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // 添加到页面
    document.body.appendChild(notification);

    // 显示动画
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // 自动关闭
    setTimeout(() => {
        notification.classList.remove('show');

        // 移除元素
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}
