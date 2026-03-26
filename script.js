// ============================================
// Slideshow
// ============================================
(function () {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    if (!slides.length) return;

    let current = 0;
    let autoTimer;

    function showSlide(index) {
        slides[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
    }

    function startAuto() {
        autoTimer = setInterval(function () {
            showSlide(current + 1);
        }, 5000);
    }

    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            showSlide(current - 1);
            resetAuto();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            showSlide(current + 1);
            resetAuto();
        });
    }

    startAuto();
})();

// ============================================
// Mobile Menu
// ============================================
(function () {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
        toggle.classList.toggle('open');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            toggle.classList.remove('open');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
})();

// ============================================
// Lightbox
// ============================================
(function () {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.portfolio-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var imgSrc = this.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightboxImg.alt = this.dataset.title || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
})();

// ============================================
// Scroll Fade-in for Grid Items
// ============================================
(function () {
    var items = document.querySelectorAll('.grid-item');
    if (!items.length) return;

    // Set initial state
    items.forEach(function (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach(function (item) {
        observer.observe(item);
    });
})();
