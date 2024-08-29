async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class FooterComponent extends HTMLElement {
    async connectedCallback() {
        const content = await loadHTML('components/footer-component.html');
        this.innerHTML = content;
        this.initializeComponent();
    }

    initializeComponent() {
        const currentYear = new Date().getFullYear();
        const copyrightElement = this.querySelector('#copyright-year');
        if (copyrightElement) {
            copyrightElement.textContent = currentYear;
        }

        const socialLinks = this.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.classList.add('animate__animated', 'animate__pulse');
            });
            link.addEventListener('animationend', () => {
                link.classList.remove('animate__animated', 'animate__pulse');
            });
        });
    }
}

customElements.define('footer-component', FooterComponent);
