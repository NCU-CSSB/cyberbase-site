function updateTime() {
    const timeElement = document.querySelector('.bar1');
    if (timeElement) {
        const now = new Date();
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        
        const timeString = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日${weekdays[now.getDay()]}${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        
        timeElement.textContent = timeString;
    }
}

// 滚动监听函数
function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// 轮播功能
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // 检查必要的元素是否存在
    if (!slides.length || !indicators.length || !prevBtn || !nextBtn) {
        console.error('轮播元素未找到，请检查HTML结构');
        return;
    }
    
    console.log('轮播初始化成功，找到', slides.length, '张幻灯片');
    
    let currentSlide = 0;
    let interval;
    
    // 显示指定幻灯片
    function showSlide(index) {
        console.log('切换到幻灯片:', index);
        
        // 停止当前视频播放
        const currentVideo = slides[currentSlide].querySelector('video');
        if (currentVideo) {
            currentVideo.pause();
            currentVideo.currentTime = 0;
        }
        
        // 重置当前图片大小
        const currentImg = slides[currentSlide].querySelector('img');
        if (currentImg) {
            currentImg.style.transform = 'scale(1)';
        }
        
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
        
        // 播放新幻灯片的视频
        const newVideo = slides[index].querySelector('video');
        if (newVideo) {
            newVideo.play();
        }
        
        // 延迟一帧后开始图片放大动画
        requestAnimationFrame(() => {
            if (newImg) {
                console.log('开始图片放大动画');
                newImg.style.transform = 'scale(1.2)';
            }
        });
    }
    
    // 下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // 自动播放
    function startAutoPlay() {
        const currentSlideElement = slides[currentSlide];
        const hasVideo = currentSlideElement.querySelector('video');
        
        if (hasVideo) {
            // 视频：播放完毕后自动切换
            const video = currentSlideElement.querySelector('video');
            video.addEventListener('ended', nextSlide, { once: true });
        } else {
            // 图片：6秒后切换
            interval = setTimeout(nextSlide, 4000);
        }
    }
    
    function stopAutoPlay() {
        if (interval) {
            clearTimeout(interval);
            interval = null;
        }
    }
    
    // 事件监听
    prevBtn.addEventListener('click', () => {
        console.log('点击上一张');
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
        console.log('点击下一张');
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('点击指示器:', index);
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });
    
    // 初始化第一张图片的放大动画
    function initFirstSlideAnimation() {
        const firstImg = slides[0].querySelector('img');
        if (firstImg) {
            console.log('初始化第一张图片放大动画');
            // 确保第一张图片从初始大小开始
            firstImg.style.transform = 'scale(1)';
            
            // 延迟一帧后开始放大动画
            requestAnimationFrame(() => {
                firstImg.style.transform = 'scale(1.2)';
            });
        }
    }
    
    // 开始自动播放
    startAutoPlay();
    
    // 初始化第一张图片的放大动画
    initFirstSlideAnimation();
    
    console.log('轮播自动播放已启动，第一张图片放大动画已初始化');
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);
    
    // 添加滚动监听
    window.addEventListener('scroll', handleScroll);
    
    // 初始化轮播
    initCarousel();
});