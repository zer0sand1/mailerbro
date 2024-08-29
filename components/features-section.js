async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class FeaturesSection extends HTMLElement {
    async connectedCallback() {
        const content = await loadHTML('components/features-section.html');
        this.innerHTML = content;
        this.initializeComponent();
    }

    initializeComponent() {
        // Add any necessary JavaScript for interactivity here if needed.
        // For this component, we don't need any additional JavaScript functionality.
    }
}

customElements.define('features-section', FeaturesSection);