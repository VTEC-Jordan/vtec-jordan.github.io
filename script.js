document.addEventListener('DOMContentLoaded', () => {
    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    const PAGE_AR = document.documentElement.lang === 'ar';

    // -------------------------------------------------------
    // Services Slider
    // Shows 4 cards at a time, slides through all 7 services
    // -------------------------------------------------------
    const slider = document.getElementById('services-slider');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');

    if (slider && prevBtn && nextBtn) {
        const items = Array.from(slider.querySelectorAll('.service-item'));
        const total = items.length;

        // Determine visible count based on screen width
        function getVisible() {
            if (window.innerWidth <= 540) return 1;
            if (window.innerWidth <= 900) return 2;
            return 4;
        }

        let current = 0;

        function totalPages() {
            return Math.ceil(total / getVisible());
        }

        // Build dots
        function buildDots() {
            dotsContainer.innerHTML = '';
            const pages = totalPages();
            for (let i = 0; i < pages; i++) {
                const dot = document.createElement('button');
                dot.className = 'slider-dot' + (i === current ? ' active' : '');
                dot.setAttribute('aria-label', PAGE_AR ? `الانتقال إلى الصفحة ${i + 1}` : `Go to page ${i + 1}`);
                dot.addEventListener('click', () => goToAnimated(i));
                dotsContainer.appendChild(dot);
            }
        }

        // Crossfade the grid during user-triggered page swaps
        function goToAnimated(page) {
            if (page === current || prefersReducedMotion()) { goTo(page); return; }
            slider.classList.add('slider-fading');
            setTimeout(() => {
                goTo(page);
                slider.classList.remove('slider-fading');
            }, 200);
        }

        function goTo(page) {
            const vis = getVisible();
            const pages = totalPages();
            current = Math.max(0, Math.min(page, pages - 1));

            // Hide/show items
            items.forEach((item, idx) => {
                const start = current * vis;
                const end = start + vis;
                item.style.display = (idx >= start && idx < end) ? '' : 'none';
            });

            prevBtn.disabled = current === 0;
            nextBtn.disabled = current >= pages - 1;

            // Update dots
            Array.from(dotsContainer.querySelectorAll('.slider-dot')).forEach((dot, i) => {
                dot.classList.toggle('active', i === current);
            });
        }

        prevBtn.addEventListener('click', () => goToAnimated(current - 1));
        nextBtn.addEventListener('click', () => goToAnimated(current + 1));

        // Rebuild on resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                current = 0;
                // Reset heights before re-measuring
                items.forEach(item => { item.style.height = ''; item.style.display = ''; });
                equaliseHeights();
                buildDots();
                goTo(0);
            }, 150);
        });

        // Measure tallest card (all visible) then lock all to that height
        function equaliseHeights() {
            items.forEach(item => { item.style.height = ''; item.style.display = ''; });
            const maxH = Math.max(...items.map(item => item.offsetHeight));
            items.forEach(item => { item.style.height = maxH + 'px'; });
        }

        equaliseHeights();
        buildDots();
        goTo(0);
    }

    // -------------------------------------------------------
    // Workshop Slider
    // Shows 3 cards at a time, navigates to the 4th
    // -------------------------------------------------------
    const wSlider = document.getElementById('workshop-slider');
    const wPrevBtn = document.getElementById('workshop-slider-prev');
    const wNextBtn = document.getElementById('workshop-slider-next');
    const wDotsContainer = document.getElementById('workshop-slider-dots');

    if (wSlider && wPrevBtn && wNextBtn) {
        const wItems = Array.from(wSlider.querySelectorAll('.workshop-card'));
        const wTotal = wItems.length;
        let wCurrent = 0;

        function wGetVisible() {
            if (window.innerWidth <= 540) return 1;
            if (window.innerWidth <= 900) return 2;
            return 3;
        }

        function wTotalPages() {
            return Math.ceil(wTotal / wGetVisible());
        }

        function wBuildDots() {
            wDotsContainer.innerHTML = '';
            for (let i = 0; i < wTotalPages(); i++) {
                const dot = document.createElement('button');
                dot.className = 'slider-dot' + (i === wCurrent ? ' active' : '');
                dot.setAttribute('aria-label', PAGE_AR ? `الانتقال إلى الصفحة ${i + 1}` : `Go to page ${i + 1}`);
                dot.addEventListener('click', () => wGoToAnimated(i));
                wDotsContainer.appendChild(dot);
            }
        }

        function wGoToAnimated(page) {
            if (page === wCurrent || prefersReducedMotion()) { wGoTo(page); return; }
            wSlider.classList.add('slider-fading');
            setTimeout(() => {
                wGoTo(page);
                wSlider.classList.remove('slider-fading');
            }, 200);
        }

        function wGoTo(page) {
            const vis = wGetVisible();
            wCurrent = Math.max(0, Math.min(page, wTotalPages() - 1));
            wItems.forEach((item, idx) => {
                const start = wCurrent * vis;
                item.style.display = (idx >= start && idx < start + vis) ? '' : 'none';
            });
            wPrevBtn.disabled = wCurrent === 0;
            wNextBtn.disabled = wCurrent >= wTotalPages() - 1;
            Array.from(wDotsContainer.querySelectorAll('.slider-dot')).forEach((dot, i) => {
                dot.classList.toggle('active', i === wCurrent);
            });
        }

        wPrevBtn.addEventListener('click', () => wGoToAnimated(wCurrent - 1));
        wNextBtn.addEventListener('click', () => wGoToAnimated(wCurrent + 1));

        function wEqualiseHeights() {
            wItems.forEach(item => { item.style.height = ''; item.style.display = ''; });
            const maxH = Math.max(...wItems.map(item => item.offsetHeight));
            wItems.forEach(item => { item.style.height = maxH + 'px'; });
        }

        let wResizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(wResizeTimer);
            wResizeTimer = setTimeout(() => {
                wCurrent = 0;
                wItems.forEach(item => { item.style.height = ''; item.style.display = ''; });
                wEqualiseHeights();
                wBuildDots();
                wGoTo(0);
            }, 150);
        });

        wEqualiseHeights();
        wBuildDots();
        wGoTo(0);
    }

    // -------------------------------------------------------
    // Mobile Navigation Toggle
    // Toggles 'active' class on nav menu and manages body scroll lock
    // -------------------------------------------------------
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    function closeMobileMenu() {
        if (!navMenu || !mobileNavToggle) return;
        navMenu.classList.remove('active');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function openMobileMenu() {
        if (!navMenu || !mobileNavToggle) return;
        navMenu.classList.add('active');
        mobileNavToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = navMenu.classList.contains('active');
            if (isExpanded) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        document.addEventListener('click', (event) => {
            if (!navMenu.classList.contains('active')) return;
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = mobileNavToggle.contains(event.target);
            if (!clickedInsideMenu && !clickedToggle) {
                closeMobileMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }

    // Close mobile menu when a navigation link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    });

    // Mark current top-level page in nav for orientation.
    const pagePath = window.location.pathname.replace(/\/$/, '');
    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.includes('/#')) return;
        const normalizedHref = href.startsWith('/') ? href : '/' + href;
        if (normalizedHref.replace(/\/$/, '') === pagePath) {
            link.setAttribute('aria-current', 'page');
        }
    });

    // -------------------------------------------------------
    // Email Button Fallback
    // Copies email to clipboard and shows a toast for users
    // whose browser has no default mail client configured.
    // -------------------------------------------------------
    function showEmailToast(message) {
        const existing = document.getElementById('email-toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.id = 'email-toast';
        toast.textContent = message;
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
        // Trigger animation
        requestAnimationFrame(() => toast.classList.add('email-toast--visible'));
        setTimeout(() => {
            toast.classList.remove('email-toast--visible');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', () => {
            const email = link.href.replace('mailto:', '');
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    showEmailToast('Email copied: ' + email);
                }).catch(() => {});
            }
        });
    });

    // -------------------------------------------------------
    // Header Scroll Behavior
    // Hides header on scroll down, shows on scroll up
    // -------------------------------------------------------
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    function updateHeaderState() {
        const scrollTop = window.scrollY;
        if (header) {
            if (scrollTop > lastScrollTop) {
                header.classList.add('hide');
            } else {
                header.classList.remove('hide');
            }
            header.classList.toggle('scrolled', scrollTop > 12);
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    updateHeaderState();

    // -------------------------------------------------------
    // Theme Toggle (Dark/Light Mode)
    // Persists user preference using localStorage
    // -------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = null;

    try {
        currentTheme = localStorage.getItem('theme');
    } catch (e) {
        currentTheme = null;
    }
    
    // Default to system preference if no stored theme
    if (!currentTheme) {
        currentTheme = userPrefersDark ? 'dark' : 'light';
    }
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', currentTheme === 'dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {
                // Ignore storage failures in strict privacy modes.
            }
            themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
        });
    }

    const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]/g;

    function cleanInput(value, maxLength) {
        if (typeof value !== 'string') return '';
        return value.replace(CONTROL_CHARS_REGEX, '').trim().slice(0, maxLength);
    }

    function isLikelyBotSubmission(formEl) {
        const honeypot = formEl.querySelector('input[name="website"]');
        return Boolean(honeypot && honeypot.value.trim());
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setStatusMessage(statusEl, message, type) {
        if (!statusEl) return;
        statusEl.classList.remove('status-success', 'status-error');
        statusEl.textContent = message;
        if (type === 'success') statusEl.classList.add('status-success');
        if (type === 'error') statusEl.classList.add('status-error');
    }

    function markFieldValidity(fieldEl, isValid) {
        if (!fieldEl) return;
        fieldEl.setAttribute('aria-invalid', String(!isValid));
    }

    function wireValidationFeedback(formEl) {
        if (!formEl) return;
        formEl.querySelectorAll('input, textarea, select').forEach((el) => {
            if (el.name === 'website') return;
            el.addEventListener('blur', () => {
                const valid = el.checkValidity();
                markFieldValidity(el, valid);
            });
            el.addEventListener('input', () => {
                if (el.getAttribute('aria-invalid') === 'true') {
                    markFieldValidity(el, el.checkValidity());
                }
            });
        });
    }

    // -------------------------------------------------------
    // Form Submission Handlers
    // Integrates with Google Apps Script Web App for data persistence
    // -------------------------------------------------------
    // Form status strings follow the page language (Arabic pages set lang="ar")
    const IS_ARABIC = PAGE_AR;
    const FORM_MSG = {
        sending: IS_ARABIC ? 'جارٍ الإرسال...' : 'Sending...',
        contactOk: IS_ARABIC ? 'وصلتنا رسالتك! سنتواصل معك قريباً.' : "Message received! We'll be in touch soon.",
        contactInvalid: IS_ARABIC ? 'يرجى إدخال اسم وبريد إلكتروني ورسالة بشكل صحيح.' : 'Please provide a valid name, email, and message.',
        partnerOk: IS_ARABIC ? 'وصلنا استفسارك! سنتواصل معك خلال يومي عمل.' : "Inquiry received! We'll be in touch within 2 business days.",
        workshopOk: IS_ARABIC ? 'تم استلام تسجيلك! سنوافيك بتفاصيل الورشة قريباً.' : "Registration received! We'll be in touch with workshop details soon.",
        requiredInvalid: IS_ARABIC ? 'يرجى تعبئة جميع الحقول المطلوبة بمعلومات صحيحة.' : 'Please complete all required fields with valid information.',
        fail: IS_ARABIC ? 'تعذّر إرسال النموذج. تحقّق من اتصالك بالإنترنت أو راسلنا مباشرة على info@vtec-jo.com' : 'Form submission failed. Please check your internet connection or email us directly at info@vtec-jo.com'
    };

    const CONTACT_SCRIPT_URL  = 'https://script.google.com/macros/s/AKfycbxyQx0BEll1ANb0y5q4h7MmMRoJWOqkLCjImOSinWhWIgkPUTwJ3JlVSAIAWnz6qJwS/exec';
    const WORKSHOP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxRgBYh-cQKFqSiyp2l9BUxB5HSMnOivuVb-_KoKgSs37p2rHic4pWuqcH8L0yePQbD/exec';
    const PARTNER_SCRIPT_URL  = 'https://script.google.com/macros/s/AKfycbzOjRzvJwkH19gIHoc9BmAtarj8akd21C7OOk0rMErWif1ULISMoi4GEHEbNjRTw4DV/exec';

    /**
     * Contact Form Handler (index.html)
     * Uses CONTACT_SCRIPT_URL with 'no-cors' mode as it doesn't require a response body
     */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        wireValidationFeedback(contactForm);
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formStatus = document.getElementById('form-status');
            setStatusMessage(formStatus, FORM_MSG.sending);

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            if (isLikelyBotSubmission(contactForm)) {
                setStatusMessage(formStatus, FORM_MSG.contactOk, 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            const name = cleanInput(document.getElementById('name').value, 120);
            const email = cleanInput(document.getElementById('email').value, 254).toLowerCase();
            const message = cleanInput(document.getElementById('message').value, 2000);

            markFieldValidity(document.getElementById('name'), Boolean(name));
            markFieldValidity(document.getElementById('email'), isValidEmail(email));
            markFieldValidity(document.getElementById('message'), Boolean(message));

            if (!name || !isValidEmail(email) || !message) {
                setStatusMessage(formStatus, FORM_MSG.contactInvalid, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            const payload = JSON.stringify({ name, email, message });

            fetch(CONTACT_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: payload
            })
            .then(() => {
                setStatusMessage(formStatus, FORM_MSG.contactOk, 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            })
            .catch(() => {
                setStatusMessage(formStatus, FORM_MSG.fail, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
        });
    }

    /**
     * Partner Inquiry Form Handler (partner.html)
     * Uses PARTNER_SCRIPT_URL and expects a JSON response from the Apps Script
     */
    const partnerForm = document.getElementById('partner-form');
    if (partnerForm) {
        wireValidationFeedback(partnerForm);
        partnerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formStatus = document.getElementById('partner-form-status');
            setStatusMessage(formStatus, FORM_MSG.sending);

            const submitBtn = partnerForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            if (isLikelyBotSubmission(partnerForm)) {
                setStatusMessage(formStatus, FORM_MSG.partnerOk, 'success');
                partnerForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            const companyName     = cleanInput(document.getElementById('company-name').value, 150);
            const contactName     = cleanInput(document.getElementById('contact-name').value, 120);
            const email           = cleanInput(document.getElementById('email').value, 254).toLowerCase();
            const phone           = cleanInput(document.getElementById('phone').value, 32);
            const partnershipType = cleanInput(document.getElementById('partnership-type').value, 80);
            const message         = cleanInput(document.getElementById('message').value, 3000);

            markFieldValidity(document.getElementById('company-name'), Boolean(companyName));
            markFieldValidity(document.getElementById('contact-name'), Boolean(contactName));
            markFieldValidity(document.getElementById('email'), isValidEmail(email));
            markFieldValidity(document.getElementById('partnership-type'), Boolean(partnershipType));
            markFieldValidity(document.getElementById('message'), Boolean(message));

            if (!companyName || !contactName || !isValidEmail(email) || !partnershipType || !message) {
                setStatusMessage(formStatus, FORM_MSG.requiredInvalid, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            const payload = JSON.stringify({ companyName, contactName, email, phone, partnershipType, message });

            fetch(PARTNER_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: payload
            })
            .then(res => res.json())
            .then(data => {
                if (data.result === 'success') {
                    setStatusMessage(formStatus, FORM_MSG.partnerOk, 'success');
                    partnerForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                } else {
                    throw new Error(data.error || 'Unknown error');
                }
            })
            .catch(() => {
                setStatusMessage(formStatus, FORM_MSG.fail, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
        });
    }

    /**
     * Workshop Registration Form Handler (workshops.html)
     * Uses WORKSHOP_SCRIPT_URL and expects a JSON response from the Apps Script
     */
    const workshopForm = document.getElementById('workshop-form');
    if (workshopForm) {
        wireValidationFeedback(workshopForm);
        workshopForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formStatus = document.getElementById('workshop-form-status');
            setStatusMessage(formStatus, FORM_MSG.sending);

            const submitBtn = workshopForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            if (isLikelyBotSubmission(workshopForm)) {
                setStatusMessage(formStatus, FORM_MSG.workshopOk, 'success');
                workshopForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            const name              = cleanInput(document.getElementById('workshop-name').value, 120);
            const email             = cleanInput(document.getElementById('workshop-email').value, 254).toLowerCase();
            const phone             = cleanInput(document.getElementById('workshop-phone').value, 32);
            const organization      = cleanInput(document.getElementById('workshop-organization').value, 150);
            const workshopInterest  = cleanInput(document.getElementById('workshop-interest').value, 120);
            const preferredTiming   = cleanInput(document.getElementById('workshop-timing').value, 120);
            const participants      = cleanInput(document.getElementById('workshop-participants').value, 10);
            const message           = cleanInput(document.getElementById('workshop-message').value, 3000);

            markFieldValidity(document.getElementById('workshop-name'), Boolean(name));
            markFieldValidity(document.getElementById('workshop-email'), isValidEmail(email));
            markFieldValidity(document.getElementById('workshop-interest'), Boolean(workshopInterest));

            if (!name || !isValidEmail(email) || !workshopInterest) {
                setStatusMessage(formStatus, FORM_MSG.requiredInvalid, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            const payload = JSON.stringify({ name, email, phone, organization, workshopInterest, preferredTiming, participants, message });

            fetch(WORKSHOP_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: payload
            })
            .then(res => res.json())
            .then(data => {
                if (data.result === 'success') {
                    setStatusMessage(formStatus, FORM_MSG.workshopOk, 'success');
                    workshopForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                } else {
                    throw new Error(data.error || 'Unknown error');
                }
            })
            .catch(() => {
                setStatusMessage(formStatus, FORM_MSG.fail, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
        });
    }

    // -------------------------------------------------------
    // Waves Background
    // Vanilla adaptation of the ReactBits "Waves" component:
    // a perlin-noise line field that bends around the cursor.
    // Replaces the previous WebGL cloud shader.
    // -------------------------------------------------------
    (function initWavesBg() {
        const canvas = document.getElementById('shader-bg');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Perlin noise, ported from the ReactBits Waves component
        class Grad {
            constructor(x, y) { this.x = x; this.y = y; }
            dot2(x, y) { return this.x * x + this.y * y; }
        }
        class Noise {
            constructor(seed) {
                this.grad3 = [
                    new Grad(1, 1), new Grad(-1, 1), new Grad(1, -1), new Grad(-1, -1),
                    new Grad(1, 0), new Grad(-1, 0), new Grad(1, 0), new Grad(-1, 0),
                    new Grad(0, 1), new Grad(0, -1), new Grad(0, 1), new Grad(0, -1)
                ];
                this.p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
                this.perm = new Array(512);
                this.gradP = new Array(512);
                this.seed(seed);
            }
            seed(seed) {
                if (seed > 0 && seed < 1) seed *= 65536;
                seed = Math.floor(seed);
                if (seed < 256) seed |= seed << 8;
                for (let i = 0; i < 256; i++) {
                    const v = i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255);
                    this.perm[i] = this.perm[i + 256] = v;
                    this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
                }
            }
            fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
            lerp(a, b, t) { return (1 - t) * a + t * b; }
            perlin2(x, y) {
                let X = Math.floor(x), Y = Math.floor(y);
                x -= X; y -= Y; X &= 255; Y &= 255;
                const n00 = this.gradP[X + this.perm[Y]].dot2(x, y);
                const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1);
                const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y);
                const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);
                const u = this.fade(x);
                return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y));
            }
        }

        const cfg = {
            waveSpeedX: 0.0125,
            waveSpeedY: 0.005,
            waveAmpX: 28,
            waveAmpY: 14,
            xGap: 24,
            yGap: 42
        };

        const noise = new Noise(Math.random());
        let lines = [];
        let w = 0, h = 0;

        let accent = '#006D77';
        function readAccent() {
            const v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
            if (v) accent = v;
        }
        readAccent();
        new MutationObserver(readAccent).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        function setSize() {
            // Background lines are soft — rendering at 1x keeps the
            // full-viewport clear/stroke cost minimal on retina screens
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }

        function setLines() {
            lines = [];
            const oWidth = w + 200, oHeight = h + 30;
            const totalLines = Math.ceil(oWidth / cfg.xGap);
            const totalPoints = Math.ceil(oHeight / cfg.yGap);
            const xStart = (w - cfg.xGap * totalLines) / 2;
            const yStart = (h - cfg.yGap * totalPoints) / 2;
            for (let i = 0; i <= totalLines; i++) {
                const pts = [];
                for (let j = 0; j <= totalPoints; j++) {
                    pts.push({
                        x: xStart + cfg.xGap * i,
                        y: yStart + cfg.yGap * j,
                        wave: { x: 0, y: 0 }
                    });
                }
                lines.push(pts);
            }
        }

        function movePoints(time) {
            lines.forEach((pts) => {
                pts.forEach((p) => {
                    const move = noise.perlin2((p.x + time * cfg.waveSpeedX) * 0.002, (p.y + time * cfg.waveSpeedY) * 0.0015) * 12;
                    p.wave.x = Math.cos(move) * cfg.waveAmpX;
                    p.wave.y = Math.sin(move) * cfg.waveAmpY;
                });
            });
        }

        function moved(point) {
            const x = point.x + point.wave.x;
            const y = point.y + point.wave.y;
            return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
        }

        function drawLines() {
            ctx.clearRect(0, 0, w, h);
            ctx.beginPath();
            ctx.strokeStyle = accent;
            ctx.globalAlpha = 0.6;
            ctx.lineWidth = 1;
            lines.forEach((points) => {
                let p1 = moved(points[0]);
                ctx.moveTo(p1.x, p1.y);
                points.forEach((p, idx) => {
                    const isLast = idx === points.length - 1;
                    p1 = moved(p);
                    const p2 = moved(points[idx + 1] || points[points.length - 1]);
                    ctx.lineTo(p1.x, p1.y);
                    if (isLast) ctx.moveTo(p2.x, p2.y);
                });
            });
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        setSize();
        setLines();
        window.addEventListener('resize', () => { setSize(); setLines(); }, { passive: true });

        if (prefersReducedMotion()) {
            // Static line field: draw one calm frame, no animation loop
            movePoints(0);
            drawLines();
            return;
        }

        // The field drifts slowly, so 30fps is visually identical to 60
        // and halves the main-thread cost of the full-screen redraw.
        let raf;
        let lastFrame = 0;
        function tick(t) {
            raf = requestAnimationFrame(tick);
            if (t - lastFrame < 31) return;
            lastFrame = t;
            movePoints(t);
            drawLines();
        }
        raf = requestAnimationFrame(tick);

        // Pause when page is hidden to save battery
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) { cancelAnimationFrame(raf); }
            else { raf = requestAnimationFrame(tick); }
        });
    })();

    // -------------------------------------------------------
    // Hero Entrance Animation
    // Replaces split-character text animation with a cleaner premium reveal.
    // -------------------------------------------------------
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const revealItems = Array.from(heroContent.querySelectorAll('.hero-title, .hero-description, .hero-btns, .section-label, .hero-hint'));
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced) {
            heroContent.classList.add('hero-reveal-ready');
            revealItems.forEach((item) => {
                item.style.transitionDelay = '0ms';
            });
        } else {
            revealItems.forEach((item, index) => {
                item.style.transitionDelay = `${260 + index * 190}ms`;
            });

            requestAnimationFrame(() => {
                heroContent.classList.add('hero-reveal-ready');
            });
        }
    }


    // -------------------------------------------------------
    // Type Marquee: pause the CSS animation while off-screen so it
    // doesn't cost compositor work for something nobody can see.
    // -------------------------------------------------------
    if ('IntersectionObserver' in window) {
        document.querySelectorAll('.type-marquee').forEach((band) => {
            new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    band.classList.toggle('type-marquee--offscreen', !entry.isIntersecting);
                });
            }).observe(band);
        });
    }

    // -------------------------------------------------------
    // Interactive Hero Object
    // A wireframe solid rendered on a plain 2D canvas — slow
    // ambient rotation, tilts toward the cursor, spins on click
    // or arrow keys. Each page picks its shape via data-shape:
    // icosahedron (default), octahedron, cube, or torus.
    // -------------------------------------------------------
    (function initHeroObject() {
        const canvas = document.getElementById('hero-object');
        if (!canvas || prefersReducedMotion()) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        function normalizeVerts(verts, targetRadius) {
            const maxR = Math.max(...verts.map((v) => Math.hypot(v[0], v[1], v[2])));
            const k = targetRadius / maxR;
            return verts.map((v) => [v[0] * k, v[1] * k, v[2] * k]);
        }

        function edgesByDistance(verts, distSq) {
            const edges = [];
            for (let i = 0; i < verts.length; i++) {
                for (let j = i + 1; j < verts.length; j++) {
                    const dx = verts[i][0] - verts[j][0];
                    const dy = verts[i][1] - verts[j][1];
                    const dz = verts[i][2] - verts[j][2];
                    if (Math.abs(dx * dx + dy * dy + dz * dz - distSq) < 0.01) edges.push([i, j]);
                }
            }
            return edges;
        }

        const SHAPES = {
            icosahedron() {
                const PHI = (1 + Math.sqrt(5)) / 2;
                const verts = [];
                [-1, 1].forEach((s1) => [-PHI, PHI].forEach((s2) => {
                    verts.push([0, s1, s2], [s1, s2, 0], [s2, 0, s1]);
                }));
                return { verts: normalizeVerts(verts, 1.9), edges: edgesByDistance(verts, 4) };
            },
            octahedron() {
                const verts = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
                return { verts: normalizeVerts(verts, 1.9), edges: edgesByDistance(verts, 2) };
            },
            cube() {
                const verts = [];
                [-1, 1].forEach((x) => [-1, 1].forEach((y) => [-1, 1].forEach((z) => verts.push([x, y, z]))));
                return { verts: normalizeVerts(verts, 1.75), edges: edgesByDistance(verts, 4) };
            },
            torus() {
                const R = 1.3, r = 0.55, MAJ = 14, MIN = 7;
                const verts = [], edges = [];
                for (let i = 0; i < MAJ; i++) {
                    const a = (i / MAJ) * Math.PI * 2;
                    for (let j = 0; j < MIN; j++) {
                        const b = (j / MIN) * Math.PI * 2;
                        verts.push([
                            (R + r * Math.cos(b)) * Math.cos(a),
                            r * Math.sin(b),
                            (R + r * Math.cos(b)) * Math.sin(a)
                        ]);
                        const idx = i * MIN + j;
                        edges.push([idx, i * MIN + ((j + 1) % MIN)]);
                        edges.push([idx, ((i + 1) % MAJ) * MIN + j]);
                    }
                }
                return { verts: normalizeVerts(verts, 1.9), edges };
            },
            // OrbitBook: an orbit ring, a tilted inner orbit, and one
            // luminous booking dot riding the outer ring
            orbit() {
                const verts = [], edges = [];
                const N = 26;
                for (let i = 0; i < N; i++) {
                    const a = (i / N) * Math.PI * 2;
                    verts.push([Math.cos(a) * 1.9, 0, Math.sin(a) * 1.9]);
                    edges.push([i, (i + 1) % N]);
                }
                const M = 18;
                for (let j = 0; j < M; j++) {
                    const a = (j / M) * Math.PI * 2;
                    verts.push([Math.cos(a) * 1.15, Math.sin(a) * 0.95, Math.sin(a) * 0.55]);
                    edges.push([N + j, N + ((j + 1) % M)]);
                }
                verts.push([Math.cos(0.9) * 1.9, 0, Math.sin(0.9) * 1.9]);
                return { verts, edges, feature: N + M };
            }
        };

        const make = SHAPES[canvas.dataset.shape] || SHAPES.icosahedron;
        const { verts, edges, feature } = make();
        const dotRadius = verts.length > 20 ? 1.7 : 2.4;

        let accent = '#006D77';
        function readAccent() {
            const v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
            if (v) accent = v;
        }
        readAccent();
        new MutationObserver(readAccent).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        let w = 0, h = 0, dpr = 1;
        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();
        window.addEventListener('resize', resize, { passive: true });

        // Cursor tilt target (normalized -0.5..0.5 across the viewport)
        let targetTX = 0, targetTY = 0, tiltX = 0, tiltY = 0;
        window.addEventListener('pointermove', (e) => {
            targetTY = (e.clientX / window.innerWidth - 0.5) * 1.1;
            targetTX = (e.clientY / window.innerHeight - 0.5) * 0.8;
        }, { passive: true });

        // Spin impulses: click the hero or press arrow keys to fling the object
        let spinVX = 0, spinVY = 0, spinAX = 0, spinAY = 0;
        const hero = canvas.closest('.hero');
        if (hero) {
            hero.addEventListener('click', (e) => {
                if (e.target.closest('a, button, input, textarea, select')) return;
                spinVY += 0.28;
                spinVX += 0.12;
            });
        }

        // Run state: draw only while the hero is on screen and the tab visible
        let heroInView = true;
        let running = false;
        let raf = null;

        window.addEventListener('keydown', (e) => {
            if (!running) return;
            if (e.key === 'ArrowLeft') spinVY -= 0.14;
            else if (e.key === 'ArrowRight') spinVY += 0.14;
            else if (e.key === 'ArrowUp') spinVX -= 0.12;
            else if (e.key === 'ArrowDown') spinVX += 0.12;
        });

        function draw(now) {
            if (!running) return;
            const t = now * 0.0001;
            tiltX += (targetTX - tiltX) * 0.045;
            tiltY += (targetTY - tiltY) * 0.045;
            spinAX += spinVX;
            spinAY += spinVY;
            spinVX *= 0.95;
            spinVY *= 0.95;

            const rx = t * 2.1 + tiltX + spinAX;
            const ry = t * 3.4 + tiltY + spinAY;
            const cx = Math.cos(rx), sx = Math.sin(rx);
            const cy = Math.cos(ry), sy = Math.sin(ry);

            const size = Math.min(w, h);
            const scale = size * 0.27;
            const persp = 4.2;

            const pts = verts.map(([x, y, z]) => {
                // Rotate around Y, then X
                const x1 = x * cy + z * sy;
                const z1 = -x * sy + z * cy;
                const y2 = y * cx - z1 * sx;
                const z2 = y * sx + z1 * cx;
                const f = persp / (persp - z2 * 0.55);
                return [w / 2 + x1 * scale * f, h / 2 + y2 * scale * f, z2];
            });

            ctx.clearRect(0, 0, w, h);
            ctx.lineWidth = 1.25;
            ctx.strokeStyle = accent;
            ctx.fillStyle = accent;
            edges.forEach(([i, j]) => {
                const depth = (pts[i][2] + pts[j][2]) / 2; // roughly -2..2
                ctx.globalAlpha = 0.16 + (depth + 2) * 0.14;
                ctx.beginPath();
                ctx.moveTo(pts[i][0], pts[i][1]);
                ctx.lineTo(pts[j][0], pts[j][1]);
                ctx.stroke();
            });
            pts.forEach(([x, y, z], i) => {
                const isFeature = i === feature;
                ctx.globalAlpha = isFeature ? 0.55 + (z + 2) * 0.2 : 0.25 + (z + 2) * 0.16;
                ctx.beginPath();
                ctx.arc(x, y, isFeature ? dotRadius * 3.4 : dotRadius, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            raf = requestAnimationFrame(draw);
        }

        function syncRun() {
            const shouldRun = heroInView && !document.hidden;
            if (shouldRun && !running) {
                running = true;
                raf = requestAnimationFrame(draw);
            } else if (!shouldRun && running) {
                running = false;
                if (raf) cancelAnimationFrame(raf);
            }
        }

        if ('IntersectionObserver' in window) {
            new IntersectionObserver((entries) => {
                entries.forEach((entry) => { heroInView = entry.isIntersecting; });
                syncRun();
            }).observe(canvas);
        }
        document.addEventListener('visibilitychange', syncRun);
        syncRun();
    })();

    // -------------------------------------------------------
    // Scroll Reveal System
    // Sections and cards arrive with the same blur-up language
    // as the hero. Hidden state is applied here (not in HTML),
    // so content stays visible without JS. Skipped entirely
    // under prefers-reduced-motion.
    // -------------------------------------------------------
    (function initScrollReveal() {
        if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

        const revealSelectors = [
            '.section-header',
            '.section-body',
            '.section-subtitle',
            '.tracks-intro',
            '.service-item',
            '.grid-card',
            '.workshop-card',
            '.track-card',
            '.comparison-item',
            '.process-step',
            '.process-line',
            '.cta-card',
            '.partner-form-wrapper',
            '.policy-section',
            '.logo-loop-wrapper'
        ];
        const combined = revealSelectors.join(', ');
        const els = Array.from(document.querySelectorAll(combined));
        if (!els.length) return;

        // Stagger siblings: each revealable element is delayed by its
        // position among revealable elements sharing the same parent.
        // On desktop the process strip narrates a horizontal sequence
        // (step → line → step) and gets a wider stagger; on mobile it
        // stacks vertically (lines hidden), so normal card timing.
        const wideProcess = window.matchMedia('(min-width: 769px)').matches;
        els.forEach((el) => {
            const parent = el.parentElement;
            const revealSiblings = parent
                ? Array.from(parent.children).filter((child) => child.matches(combined))
                : [el];
            const idx = Math.max(0, revealSiblings.indexOf(el));
            const inProcessStrip = parent && parent.classList.contains('process-strip');
            const delay = inProcessStrip && wideProcess ? idx * 230 : Math.min(idx, 7) * 90;
            el.style.setProperty('--reveal-delay', `${delay}ms`);
            el.classList.add('reveal');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.classList.add('is-revealed');
                observer.unobserve(el);
                // Once the entrance finishes, hand transitions back to the
                // element's own styles (hover lifts, etc.) by removing the
                // reveal classes — computed styles are identical, so no jump.
                const delay = parseInt(el.style.getPropertyValue('--reveal-delay'), 10) || 0;
                setTimeout(() => {
                    el.classList.remove('reveal', 'is-revealed');
                    el.style.removeProperty('--reveal-delay');
                }, 700 + delay);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

        els.forEach((el) => observer.observe(el));
    })();
});
