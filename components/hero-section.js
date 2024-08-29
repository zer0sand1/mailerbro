async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class HeroSection extends HTMLElement {
    async connectedCallback() {
        const content = await loadHTML('components/hero-section.html');
        this.innerHTML = content;
        this.initializeComponent();
    }

    initializeComponent() {
        const ctaButton = this.querySelector('#hero-cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                // Handle CTA button click (e.g., scroll to signup form or open modal)
                console.log('CTA button clicked');
            });
        }
    }
}

customElements.define('hero-section', HeroSection);