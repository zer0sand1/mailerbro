async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class HeaderComponent extends HTMLElement {
    async connectedCallback() {
        const content = await loadHTML('components/header-component.html');
        this.innerHTML = content;
        this.initializeComponent();
    }

    initializeComponent() {
        const mobileMenuButton = document.querySelector('#mobile-menu-button');
        const mobileMenu = document.querySelector('#mobile-menu');
        const header = document.querySelector('header');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 0) {
                    header.classList.add('bg-white', 'shadow-md');
                } else {
                    header.classList.remove('bg-white', 'shadow-md');
                }
            });
        }

        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });
    }
}

customElements.define('header-component', HeaderComponent);