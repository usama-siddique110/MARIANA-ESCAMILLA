document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Animation (Reveal Elements)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn)');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Form submission handling (prevent default for demo)
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.style.opacity = '0.8';
            
            // Simulate API call
            setTimeout(() => {
                btn.innerText = 'Message Sent Successfully!';
                btn.style.background = '#10B981'; // Success green
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // --- Premium Upgrades ---

    // 1. Custom Tech Cursor
    const cursorCenter = document.getElementById('cursor-center');
    const cursorTrio = document.getElementById('cursor-trio');
    
    if (cursorCenter && cursorTrio) {
        let mouseX = 0;
        let mouseY = 0;
        let trioX = 0;
        let trioY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Center dot follows instantly
            cursorCenter.style.left = `${mouseX}px`;
            cursorCenter.style.top = `${mouseY}px`;
        });

        // Smooth follow for the trio
        const renderCursor = () => {
            trioX += (mouseX - trioX) * 0.15;
            trioY += (mouseY - trioY) * 0.15;
            
            cursorTrio.style.left = `${trioX}px`;
            cursorTrio.style.top = `${trioY}px`;
            
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Hover effects for links and buttons
        const interactables = document.querySelectorAll('a, button, input, select, textarea, .tech-item');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorTrio.classList.add('hovered');
                cursorCenter.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorTrio.classList.remove('hovered');
                cursorCenter.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // 2. 3D Tilt Effect
    const tiltElements = document.querySelectorAll('.service-card, .tech-item');
    
    tiltElements.forEach(el => {
        el.classList.add('tilt-card');
        // Wrap content in tilt-inner
        const innerHTML = el.innerHTML;
        el.innerHTML = `<div class="tilt-inner" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">${innerHTML}</div>`;

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // 3. Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.magnetic');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const h = rect.width / 2;
            
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - (rect.height / 2);

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

});
