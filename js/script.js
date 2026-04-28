// Accordion functionality for Course Modules
function toggleModule(element) {
    const body = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    if (body.style.display === 'none' || body.style.display === '') {
        body.style.display = 'block';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        body.style.display = 'none';
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if(target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Login Form Handler to simulate advanced routing
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const btn = loginForm.querySelector('button');
            
            // Loading state
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Authenticating...';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                if(email === 'rvacademyxm@gmail.com' && password === 'Prashan2002') {
                    window.location.href = 'admin-dashboard.html';
                } else if(email.includes('@') && password.length > 0 && email !== 'rvacademyxm@gmail.com') {
                    // Assume valid student login
                    window.location.href = 'student-dashboard.html';
                } else {
                    alert('Invalid credentials!');
                    btn.innerHTML = originalText;
                    btn.style.opacity = '1';
                }
            }, 800);
        });
    }

    // Chart.js Initialization for Admin Dashboard
    const chartCanvas = document.getElementById('revenueChart');
    if(chartCanvas && typeof Chart !== 'undefined') {
        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Revenue (LKR)',
                    data: [150000, 280000, 210000, 420000, 390000, 580000, 850000],
                    borderColor: '#00ff88',
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { color: '#8b9bb4' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#8b9bb4' }
                    }
                }
            }
        });
    }
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    const rootEl = document.documentElement;
    // Check saved theme
    if(localStorage.getItem('theme') === 'light') {
        rootEl.setAttribute('data-theme', 'light');
        if(themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if(rootEl.getAttribute('data-theme') === 'light') {
                rootEl.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                rootEl.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // Right-Click & Copy Protection
    // Toggleable from admin, but active globally for students
    document.addEventListener('contextmenu', event => {
        // Allow right click if admin (mock check)
        if(!window.location.href.includes('admin')) {
            event.preventDefault();
        }
    });
    // Add text selection protection to body if not admin
    if(!window.location.href.includes('admin')) {
        document.body.classList.add('no-select');
    }

    // Terms of Service Popup
    const tosModal = document.getElementById('tosModal');
    if(tosModal && !localStorage.getItem('tos_accepted')) {
        setTimeout(() => {
            tosModal.classList.add('active');
        }, 1000);
    }
    const acceptTosBtn = document.getElementById('acceptTosBtn');
    if(acceptTosBtn) {
        acceptTosBtn.addEventListener('click', () => {
            localStorage.setItem('tos_accepted', 'true');
            tosModal.classList.remove('active');
        });
    }

    // Dynamic Video Watermarking
    const videoContainers = document.querySelectorAll('.video-container');
    if(videoContainers.length > 0) {
        // Get user email from local storage or mock
        const userEmail = "student@gmail.com";
        videoContainers.forEach(container => {
            const watermark = document.createElement('div');
            watermark.className = 'watermark-overlay';
            watermark.textContent = userEmail;
            container.appendChild(watermark);

            // Move watermark every 5 seconds to prevent static removal
            setInterval(() => {
                const top = Math.floor(Math.random() * 80) + 10; // 10% to 90%
                const left = Math.floor(Math.random() * 80) + 10;
                watermark.style.top = `${top}%`;
                watermark.style.left = `${left}%`;
            }, 5000);
        });
    }

    // Session Timers Logic
    const nyTimeEl = document.getElementById('nyTime');
    const lonTimeEl = document.getElementById('lonTime');
    const tokTimeEl = document.getElementById('tokTime');
    
    if(nyTimeEl && lonTimeEl && tokTimeEl) {
        function updateTimers() {
            // Simplified mock countdowns
            const now = new Date();
            const formatTime = (hours, mins) => {
                return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')} h`;
            };
            nyTimeEl.textContent = formatTime((24 - now.getUTCHours() + 13) % 24, 60 - now.getUTCMinutes());
            lonTimeEl.textContent = formatTime((24 - now.getUTCHours() + 8) % 24, 60 - now.getUTCMinutes());
            tokTimeEl.textContent = formatTime((24 - now.getUTCHours() + 0) % 24, 60 - now.getUTCMinutes());
        }
        setInterval(updateTimers, 60000);
        updateTimers();
    }
});
