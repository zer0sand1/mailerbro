async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class CTASection extends HTMLElement {
    async connectedCallback() {
        const content = await loadHTML('components/cta-section.html');
        this.innerHTML = content;
        this.initializeComponent();
    }

    initializeComponent() {
        const ctaButton = this.querySelector('#cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('mouseenter', () => {
                ctaButton.classList.add('animate__animated', 'animate__pulse');
            });
            ctaButton.addEventListener('mouseleave', () => {
                ctaButton.classList.remove('animate__animated', 'animate__pulse');
            });
        }

        this.startCountdown();
    }

    startCountdown() {
        const countdownElement = this.querySelector('#countdown');
        if (countdownElement) {
            let timeLeft = 24 * 60 * 60; // 24 hours in seconds

            const updateCountdown = () => {
                const hours = Math.floor(timeLeft / 3600);
                const minutes = Math.floor((timeLeft % 3600) / 60);
                const seconds = timeLeft % 60;

                countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                if (timeLeft > 0) {
                    timeLeft--;
                    setTimeout(updateCountdown, 1000);
                }
            };

            updateCountdown();
        }
    }
}

customElements.define('cta-section', CTASection);