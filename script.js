/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navbar = document.getElementById('navbar');
    const skillBars = document.querySelectorAll('.skill-bar');

    // Dark/Light Mode Toggle
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        html.classList.add('dark');
        updateThemeToggleIcon(true);
    } else {
        updateThemeToggleIcon(false);
    }

    function updateThemeToggleIcon(isDark) {
        const iconClass = isDark ? 'fas fa-sun' : 'fas fa-moon';
        const toggleButtons = [themeToggle, themeToggleMobile];
        toggleButtons.forEach(button => {
            if (button) {
                const icon = button.querySelector('i');
                if (icon) {
                    icon.className = `${iconClass} text-xl text-slate-700 dark:text-slate-300`;
                }
            }
        });
    }

    function toggleTheme() {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeToggleIcon(isDark);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }

    // Hamburger Menu Toggle
    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('-translate-x-full');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('-translate-x-full');
            });
        });
    }

    // Navbar Scroll Effect (Glassmorphism)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Skill bar animation on scroll
    const animateSkillBars = () => {
        skillBars.forEach(skillBar => {
            const skillItem = skillBar.closest('.skill-item');
            const rect = skillItem.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && !skillItem.classList.contains('animated')) {
                skillItem.classList.add('animated');
                skillBar.style.setProperty('--target-width', skillBar.dataset.width);
            }
        });
    };

    window.addEventListener('scroll', animateSkillBars);
    // Initial check for skills in view on page load
    animateSkillBars();
});
