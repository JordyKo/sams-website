document.addEventListener('DOMContentLoaded', () => {

    // ─── Mobile Nav Toggle ────────────────────────────────────────────
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isOpen ? 'none' : 'flex';
            if (!isOpen) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#fff';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }
        });
    }

    // ─── Header Shadow on Scroll ──────────────────────────────────────
    const header = document.querySelector('header');
    const onScroll = () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 10);
        }
        // Show/hide back-to-top
        if (backToTop) {
            backToTop.classList.toggle('show', window.scrollY > 300);
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ─── Back to Top Button ───────────────────────────────────────────
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTop);
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── Scroll Fade-in Animations ────────────────────────────────────
    const fadeTargets = document.querySelectorAll(
        '.card, .stat-item, .testimonial-card, .pillar-card, .carousel-header, .policy-statement, .policy-intro'
    );
    fadeTargets.forEach((el, i) => {
        el.classList.add('fade-in');
        // Stagger cards in the same grid
        const delay = (i % 3) + 1;
        if (delay <= 3) el.classList.add(`delay-${delay}`);
    });

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeTargets.forEach(el => fadeObserver.observe(el));

    // ─── Count-Up Animation (triggered on scroll) ─────────────────────
    const animateNumbers = () => {
        const counters = document.querySelectorAll('.count-up');
        const speed = 200;
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            let count = 0;
            const inc = Math.max(target / speed, 0.1);
            const tick = () => {
                count += inc;
                if (count < target) {
                    counter.innerText = count.toFixed(1).replace(/\.0$/, '');
                    requestAnimationFrame(tick);
                } else {
                    counter.innerText = target;
                }
            };
            tick();
        });
    };

    const impactSection = document.querySelector('.impact');
    if (impactSection) {
        const impactObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateNumbers();
                impactObserver.unobserve(impactSection);
            }
        }, { threshold: 0.5 });
        impactObserver.observe(impactSection);
    }

    // ─── Contact Form — Styled Success State ─────────────────────────
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Inject success message div after the form
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <strong>Enquiry Received!</strong>
            <p>One of our senior engineers will get back to you within one business day.</p>
        `;
        contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.style.display = 'none';
            successMsg.classList.add('show');
        });
    }

});
