async function loadHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

class TestimonialsSection extends HTMLElement {
    constructor() {
        super();
        this.currentSlide = 0;
        this.autoPlayInterval = null;
    }

    async connectedCallback() {
        const content = await loadHTML('components/testimonials-section.html');
        this.innerHTML = content;
        this.initializeComponent();
    }

    initializeComponent() {
        this.testimonials = this.querySelectorAll('.testimonial');
        this.prevButton = this.querySelector('#prevButton');
        this.nextButton = this.querySelector('#nextButton');
        this.dotsContainer = this.querySelector('#dotsContainer');

        if (this.testimonials.length > 0) {
            this.createDots();
            this.showSlide(this.currentSlide);
            this.setupEventListeners();
            this.startAutoPlay();
        }
    }

    createDots() {
        if (this.dotsContainer) {
            this.testimonials.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('h-3', 'w-3', 'rounded-full', 'bg-gray-300', 'mx-1', 'focus:outline-none');
                dot.addEventListener('click', () => this.showSlide(index));
                this.dotsContainer.appendChild(dot);
            });
        }
    }

    setupEventListeners() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.changeSlide(-1));
        }
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.changeSlide(1));
        }
        this.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    changeSlide(direction) {
        this.currentSlide = (this.currentSlide + direction + this.testimonials.length) % this.testimonials.length;
        this.showSlide(this.currentSlide);
    }

    showSlide(index) {
        this.testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('hidden', i !== index);
            testimonial.classList.toggle('animate__animated', i === index);
            testimonial.classList.toggle('animate__fadeIn', i === index);
        });

        const dots = this.dotsContainer.querySelectorAll('button');
        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-blue-500', i === index);
            dot.classList.toggle('bg-gray-300', i !== index);
        });
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.changeSlide(1), 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

customElements.define('testimonials-section', TestimonialsSection);