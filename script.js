document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // Countdown Timer
    // ==========================================================================
    
    const weddingDate = new Date('2026-08-29T10:30:00');
    
    function updateCountdown() {
        const now = new Date();
        const diff = weddingDate - now;
        
        if (diff <= 0) {
            document.getElementById('countdown').innerHTML = '<p>Le grand jour est arrivé !</p>';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // ==========================================================================
    // Mobile Navigation
    // ==========================================================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // ==========================================================================
    // Hide/Show Navigation on Scroll
    // ==========================================================================
    
    let lastScroll = 0;
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
    
    // ==========================================================================
    // Smooth Scroll
    // ==========================================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================================================
    // RSVP Form
    // ==========================================================================
    
    const rsvpForm = document.getElementById('rsvp-form');
    const presenceRadios = document.querySelectorAll('input[name="presence"]');
    const conditionalFields = document.querySelectorAll('.conditional-field');
    const formSuccess = document.getElementById('form-success');
    
    // Show/hide conditional fields based on presence selection
    presenceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'oui') {
                conditionalFields.forEach(field => field.classList.add('visible'));
            } else {
                conditionalFields.forEach(field => field.classList.remove('visible'));
            }
        });
    });
    
    // Form submission
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Get checkbox values (events)
        data.events = formData.getAll('events[]');
        
        console.log('Form data:', data);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        
        // Simulate sending data
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Hide form and show success message
            rsvpForm.style.display = 'none';
            formSuccess.classList.remove('hidden');
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    });
    
    // ==========================================================================
    // Scroll Animations
    // ==========================================================================
    
    const animatedElements = document.querySelectorAll('.section-header, .info-card, .timeline-item, .story-content > *');
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // ==========================================================================
    // Active Navigation Link
    // ==========================================================================
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
});
