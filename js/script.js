document.addEventListener('DOMContentLoaded', () => {
    // Particle animation removed significantly for minimal redesign

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Hamburger animation toggle
        hamburger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    /* About Section Image Slider */
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };
        setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    /* Floating Soft Skills Animation */
    const skillsContainer = document.getElementById('floatingSkillsConfig');
    if (skillsContainer) {
        const skills = ["Self-learner", "Adaptable", "Curious", "Problem Solver", "Detail-oriented", "Consistent"];
        // Defined safe zones percentages (X, Y) relative to container
        // Avoid center (30-70% X, 30-70% Y roughly)
        const positions = [
            { top: '15%', left: '20%' },
            { top: '15%', left: '80%' },
            { top: '85%', left: '20%' },
            { top: '85%', left: '80%' },
            { top: '50%', left: '10%' },
            { top: '50%', left: '90%' }
        ];

        const spawnSkill = () => {
            // Pick random skill
            const text = skills[Math.floor(Math.random() * skills.length)];
            // Pick random position
            const pos = positions[Math.floor(Math.random() * positions.length)];

            const skillEl = document.createElement('div');
            skillEl.classList.add('floating-skill');
            skillEl.textContent = text;
            skillEl.style.top = pos.top;
            skillEl.style.left = pos.left;

            // Randomize color slightly (blue/purple/white tint) from CSS vars if possible, or just keep default
            // Add animation duration variance
            const duration = 4000 + Math.random() * 2000; // 4-6s
            skillEl.style.animation = `floatFade ${duration}ms ease-in-out forwards`;

            skillsContainer.appendChild(skillEl);

            // Remove after animation
            setTimeout(() => {
                skillEl.remove();
            }, duration);
        };

        // Spawn first one immediately
        spawnSkill();
        // Spawn subsequent ones every 2.5 seconds
        setInterval(spawnSkill, 2500);
    }
});
