document.addEventListener('DOMContentLoaded', () => {
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
                dot.setAttribute('aria-label', `Go to page ${i + 1}`);
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            }
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

        prevBtn.addEventListener('click', () => goTo(current - 1));
        nextBtn.addEventListener('click', () => goTo(current + 1));

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
                dot.setAttribute('aria-label', `Go to page ${i + 1}`);
                dot.addEventListener('click', () => wGoTo(i));
                wDotsContainer.appendChild(dot);
            }
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

        wPrevBtn.addEventListener('click', () => wGoTo(wCurrent - 1));
        wNextBtn.addEventListener('click', () => wGoTo(wCurrent + 1));

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
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        if (header) {
            if (scrollTop > lastScrollTop) {
                header.classList.add('hide');
            } else {
                header.classList.remove('hide');
            }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });

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
            setStatusMessage(formStatus, 'Sending...');

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            if (isLikelyBotSubmission(contactForm)) {
                setStatusMessage(formStatus, "Message received! We'll be in touch soon.", 'success');
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
                setStatusMessage(formStatus, 'Please provide a valid name, email, and message.', 'error');
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
                setStatusMessage(formStatus, "Message received! We'll be in touch soon.", 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            })
            .catch(() => {
                setStatusMessage(formStatus, 'Form submission failed. Please check your internet connection or email us directly at info@vtec-jo.com', 'error');
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
            setStatusMessage(formStatus, 'Sending...');

            const submitBtn = partnerForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            if (isLikelyBotSubmission(partnerForm)) {
                setStatusMessage(formStatus, 'Inquiry received! We\'ll be in touch within 2 business days.', 'success');
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
                setStatusMessage(formStatus, 'Please complete all required fields with valid information.', 'error');
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
                    setStatusMessage(formStatus, 'Inquiry received! We\'ll be in touch within 2 business days.', 'success');
                    partnerForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                } else {
                    throw new Error(data.error || 'Unknown error');
                }
            })
            .catch(() => {
                setStatusMessage(formStatus, 'Form submission failed. Please check your internet connection or email us directly at info@vtec-jo.com', 'error');
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
            setStatusMessage(formStatus, 'Sending...');

            const submitBtn = workshopForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            if (isLikelyBotSubmission(workshopForm)) {
                setStatusMessage(formStatus, 'Registration received! We\'ll be in touch with workshop details soon.', 'success');
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
                setStatusMessage(formStatus, 'Please complete all required fields with valid information.', 'error');
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
                    setStatusMessage(formStatus, 'Registration received! We\'ll be in touch with workshop details soon.', 'success');
                    workshopForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                } else {
                    throw new Error(data.error || 'Unknown error');
                }
            })
            .catch(() => {
                setStatusMessage(formStatus, 'Form submission failed. Please check your internet connection or email us directly at info@vtec-jo.com', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
        });
    }

    // -------------------------------------------------------
    // Animated Shader Background
    // Vanilla JS/WebGL2 adaptation of 21st.dev/r/ravikatiyar162/animated-shader-hero
    // Shader by Matthias Hurrle (@atzedent) — tinted to VTEC accent palette.
    // -------------------------------------------------------
    (function initShaderBg() {
        const canvas = document.getElementById('shader-bg');
        if (!canvas) return;

        const gl = canvas.getContext('webgl2');
        if (!gl) { canvas.style.display = 'none'; return; }

        const vertSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`;

        const fragSrc = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(in vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;}
float clouds(vec2 p){float d=1.,t=.0;for(float i=.0;i<3.;i++){float a=d*fbm(i*10.+p*.2+.2*(1.+i)*p.y+d+i*i+p);t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;}
void main(void){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    // VTEC teal: accent #006D77 = vec3(0.0, 0.427, 0.467)
    col+=.00125/d*(cos(sin(i)*vec3(0.0,0.427,0.467))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.0,bg*.137,bg*.12),d);
  }
  O=vec4(col,1);
}`;

        function compile(shader, src) {
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
        }

        const vs = gl.createShader(gl.VERTEX_SHADER);
        const fs = gl.createShader(gl.FRAGMENT_SHADER);
        compile(vs, vertSrc);
        compile(fs, fragSrc);

        const prog = gl.createProgram();
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);

        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.warn('Shader link failed:', gl.getProgramInfoLog(prog));
            canvas.style.display = 'none';
            return;
        }

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);

        const pos = gl.getAttribLocation(prog, 'position');
        gl.enableVertexAttribArray(pos);
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

        const uRes  = gl.getUniformLocation(prog, 'resolution');
        const uTime = gl.getUniformLocation(prog, 'time');

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width  = window.innerWidth  * dpr;
            canvas.height = window.innerHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        }

        resize();
        window.addEventListener('resize', resize, { passive: true });

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) { canvas.style.display = 'none'; return; }

        let raf;
        function loop(now) {
            gl.useProgram(prog);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, now * 1e-3);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            raf = requestAnimationFrame(loop);
        }

        raf = requestAnimationFrame(loop);

        // Pause when page is hidden to save battery
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) { cancelAnimationFrame(raf); }
            else { raf = requestAnimationFrame(loop); }
        });
    })();

    // -------------------------------------------------------
    // Hero Entrance Animation
    // Replaces split-character text animation with a cleaner premium reveal.
    // -------------------------------------------------------
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const revealItems = Array.from(heroContent.querySelectorAll('.hero-title, .hero-description, .hero-btns, .section-label'));
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
    // StarBorder: animated radial-gradient streak on card borders
    // Applies to all card/bordered elements
    // -------------------------------------------------------
    function applyStarBorder(el) {
        el.classList.add('star-border-container');

        // Wrap existing children in .star-inner so they sit above the gradients
        const inner = document.createElement('div');
        inner.className = 'star-inner';
        while (el.firstChild) inner.appendChild(el.firstChild);

        const color = 'var(--accent)';
        const speed = '6s';

        const gradBottom = document.createElement('div');
        gradBottom.className = 'border-gradient-bottom';
        gradBottom.style.background = `radial-gradient(circle, ${color}, transparent 10%)`;
        gradBottom.style.animationDuration = speed;

        const gradTop = document.createElement('div');
        gradTop.className = 'border-gradient-top';
        gradTop.style.background = `radial-gradient(circle, ${color}, transparent 10%)`;
        gradTop.style.animationDuration = speed;

        el.appendChild(gradBottom);
        el.appendChild(gradTop);
        el.appendChild(inner);
    }

    ['.logo-item-placeholder'].forEach(selector => {
        document.querySelectorAll(selector).forEach(applyStarBorder);
    });

    // Non-destructive variant: only prepends the gradient overlays without
    // restructuring DOM (safe for forms and complex layouts)
    function applyStarBorderSafe(el) {
        el.classList.add('star-border-container');
        const color = 'var(--accent)';
        const speed = '6s';

        const gradBottom = document.createElement('div');
        gradBottom.className = 'border-gradient-bottom';
        gradBottom.style.cssText = `background:radial-gradient(circle,${color},transparent 10%);animation-duration:${speed};pointer-events:none;`;

        const gradTop = document.createElement('div');
        gradTop.className = 'border-gradient-top';
        gradTop.style.cssText = `background:radial-gradient(circle,${color},transparent 10%);animation-duration:${speed};pointer-events:none;`;

        el.insertBefore(gradBottom, el.firstChild);
        el.insertBefore(gradTop, el.firstChild);
    }

    ['.partner-form-wrapper', '.cta-card'].forEach(selector => {
        document.querySelectorAll(selector).forEach(applyStarBorderSafe);
    });
});
