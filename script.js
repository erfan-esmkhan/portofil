// Initialize circular progress bars
document.addEventListener('DOMContentLoaded', function() {
    // Initialize circular progress bars
    initCircularProgress();
    
    // Navbar active link highlighting
    highlightActiveNavLink();
    
    // Form submission handler
    setupFormSubmission();
    
    // Theme toggle functionality
    setupThemeToggle();
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
});

// Circular progress bars functionality
function initCircularProgress() {
    const circularProgressBars = document.querySelectorAll('.circular-progress');
    
    circularProgressBars.forEach(progressBar => {
        const percent = parseInt(progressBar.getAttribute('data-percent'));
        const progressValue = progressBar.querySelector('.progress-value');
        
        // Set initial value
        progressValue.textContent = '0%';
        
        // Animate progress after a short delay
        setTimeout(() => {
            let currentPercent = 0;
            const increment = percent / 100;
            const timer = setInterval(() => {
                currentPercent += increment;
                if (currentPercent >= percent) {
                    currentPercent = percent;
                    clearInterval(timer);
                }
                
                progressValue.textContent = `${Math.floor(currentPercent)}%`;
                progressBar.style.background = `conic-gradient(var(--primary-color) ${currentPercent * 3.6}deg, var(--secondary-dark) 0deg)`;
            }, 20);
        }, 500);
    });
}

// Highlight active nav link based on scroll position
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('ul li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
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
}

// Form submission handler
function setupFormSubmission() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon.`);
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.querySelector('.mode i');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Toggle between light and dark mode
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                this.classList.remove('bxs-moon');
                this.classList.add('bxs-sun');
                document.body.style.backgroundColor = '#f5f5f5';
                document.body.style.color = '#333';
                
                // Update CSS variables for light mode
                document.documentElement.style.setProperty('--primary-dark', '#f5f5f5');
                document.documentElement.style.setProperty('--secondary-dark', '#e0e0e0');
                document.documentElement.style.setProperty('--text-color', '#333');
                document.documentElement.style.setProperty('--text-secondary', '#666');
                
                // Update header background
                document.querySelector('header').style.backgroundColor = '#f5f5f5';
                document.querySelector('header').style.boxShadow = '0 4px 17px rgba(0, 0, 0, 0.1)';
                
                // Update sections background
                document.querySelectorAll('#about, #skills, #contact, footer').forEach(section => {
                    section.style.backgroundColor = '#e0e0e0';
                });
                
                // Update skill items
                document.querySelectorAll('.skill-item').forEach(item => {
                    item.style.backgroundColor = '#f0f0f0';
                });
                
                // Update circular progress backgrounds
                document.querySelectorAll('.circular-progress::before').forEach(circle => {
                    circle.style.backgroundColor = '#f5f5f5';
                });
                
                // Update about text background
                document.querySelectorAll('.about-text, .contact-form').forEach(element => {
                    element.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                });
            } else {
                this.classList.remove('bxs-sun');
                this.classList.add('bxs-moon');
                
                // Reset CSS variables to dark mode
                document.documentElement.style.setProperty('--primary-dark', '#1F252E');
                document.documentElement.style.setProperty('--secondary-dark', '#2a313d');
                document.documentElement.style.setProperty('--text-color', '#ffffff');
                document.documentElement.style.setProperty('--text-secondary', '#cccccc');
                
                // Reset styles
                document.body.style.backgroundColor = '';
                document.body.style.color = '';
                document.querySelector('header').style.backgroundColor = '';
                document.querySelector('header').style.boxShadow = '';
                
                // Reset sections background
                document.querySelectorAll('#about, #skills, #contact, footer').forEach(section => {
                    section.style.backgroundColor = '';
                });
                
                // Reset skill items
                document.querySelectorAll('.skill-item').forEach(item => {
                    item.style.backgroundColor = '';
                });
                
                // Reset circular progress backgrounds
                document.querySelectorAll('.circular-progress::before').forEach(circle => {
                    circle.style.backgroundColor = '';
                });
                
                // Reset about text background
                document.querySelectorAll('.about-text, .contact-form').forEach(element => {
                    element.style.backgroundColor = '';
                });
            }
        });
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const clickCheckbox = document.getElementById('click');
                if (clickCheckbox && clickCheckbox.checked) {
                    clickCheckbox.checked = false;
                }
            }
        });
    });
}

// Mobile menu close on link click
document.querySelectorAll('ul li a').forEach(link => {
    link.addEventListener('click', function() {
        const clickCheckbox = document.getElementById('click');
        if (window.innerWidth <= 768 && clickCheckbox.checked) {
            clickCheckbox.checked = false;
        }
    });
});