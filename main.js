document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#fff';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your inquiry! One of our engineers will contact you shortly.');
            contactForm.reset();
        });
    }

    // Impact Meter Animation
    const animateNumbers = () => {
        const counters = document.querySelectorAll('.count-up');
        const speed = 200; // Animation speed

        counters.forEach(counter => {
            const updateCount = () => {
                const target = parseFloat(counter.getAttribute('data-target'));
                const count = parseFloat(counter.innerText) || 0;

                // For smaller numbers like 8, we need a larger increment step so it doesn't get stuck
                const inc = Math.max(target / speed, 0.1);

                if (count < target) {
                    const nextCount = count + inc;
                    counter.innerText = nextCount >= target ? target : nextCount.toFixed(1).replace(/\.0$/, '');
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger animation when impact section is in view
    const impactSection = document.querySelector('.impact');
    if (impactSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateNumbers();
                observer.unobserve(impactSection);
            }
        }, { threshold: 0.5 });
        observer.observe(impactSection);
    }
});
