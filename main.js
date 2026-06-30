document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animation has triggered
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that need to animate in
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Handle form submission for the demo
    const form = document.querySelector('.lead-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            // Visual feedback
            btn.textContent = 'Sending Details...';
            btn.style.opacity = '0.8';
            
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });
                const result = await response.json();
                
                if (response.status == 200) {
                    btn.textContent = 'Demo Requested Successfully!';
                    btn.style.backgroundColor = '#27C93F'; // Success green
                    btn.style.boxShadow = '0 4px 14px 0 rgba(39, 201, 63, 0.39)';
                    form.reset();
                } else {
                    console.log(result);
                    btn.textContent = 'Error. Please try again.';
                    btn.style.backgroundColor = '#ef4444'; 
                }
            } catch (error) {
                console.log(error);
                btn.textContent = 'Error. Please check connection.';
                btn.style.backgroundColor = '#ef4444'; 
            }
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.boxShadow = '';
                btn.style.opacity = '1';
            }, 4000);
        });
    }


});
