document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    const themeToggle = document.getElementById('theme-toggle');
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = userPrefersDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.addEventListener('click', () => {
        let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // -------------------------------------------------------
    // Contact form -> Google Sheets via Apps Script Web App
    // -------------------------------------------------------
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxyQx0BEll1ANb0y5q4h7MmMRoJWOqkLCjImOSinWhWIgkPUTwJ3JlVSAIAWnz6qJwS/exec';
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formStatus = document.getElementById('form-status');
            formStatus.textContent = 'Sending...';
            formStatus.style.color = '';
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const payload = JSON.stringify({ name, email, message });
            fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: payload
            })
            .then(() => {
                formStatus.textContent = "Message received! We'll be in touch soon.";
                formStatus.style.color = 'var(--color-success, green)';
                contactForm.reset();
            })
            .catch(err => {
                console.error('Form submission error:', err);
                formStatus.textContent = 'Something went wrong. Please email us directly.';
                formStatus.style.color = 'var(--color-error, red)';
            });
        });
    }
});
