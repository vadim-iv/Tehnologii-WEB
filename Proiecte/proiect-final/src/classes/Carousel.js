export default class Carousel {
    constructor(
        wrapper,
        container,
        slides,
        prevButton,
        nextButton,
        {
            slidesPerView = 1,
            slidesPerNav = 1,
            loop = false,
            draggable = true
        } = {}
    ) {
        this.wrapper = wrapper
        this.container = container
        this.slides = slides
        this.prevButton = prevButton
        this.nextButton = nextButton

        this.slidesPerView = slidesPerView
        this.slidesPerNav = slidesPerNav
        this.loop = loop
        this.draggable = draggable

        this.currentSlide = 0
        this.isDragging = false
        this.startX = 0
        this.currentTranslate = 0
        this.prevTranslate = 0

        this.init()
    }

    init() {
        this.setSlideWidth()
        this.attachEvents()
    }

    updateSlidesPerView(newSlidesPerView) {
        this.slidesPerView = newSlidesPerView;
        this.setSlideWidth();
        this.updateSlidePosition();
    }

    getGap() {
        const containerStyles = window.getComputedStyle(this.container)
        return parseFloat(containerStyles.gap) || 0;
    }

    setSlideWidth() {
        const gap = this.getGap()
        const totalGapWidth = gap * (this.slidesPerView - 1)

        const containerWidth = this.container.clientWidth;
        const gapPercentage = (totalGapWidth / containerWidth) * 100

        const slideWidth = (100 - gapPercentage) / this.slidesPerView

        this.slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}%`
        });
    }

    attachEvents(){
        window.addEventListener('resize', () => this.setSlideWidth())

        this.prevButton.addEventListener('click', () => this.prevSlide())
        this.nextButton.addEventListener('click', () => this.nextSlide())

        if (this.draggable) {
            this.wrapper.addEventListener("mousedown", (e) => this.startDrag(e));
            this.wrapper.addEventListener("touchstart", (e) => this.startDrag(e));
            this.wrapper.addEventListener("mousemove", (e) => this.drag(e));
            this.wrapper.addEventListener("touchmove", (e) => this.drag(e));
            window.addEventListener("mouseup", () => this.endDrag());
            window.addEventListener("touchend", () => this.endDrag());
        }
    }

    nextSlide(){
        if (this.currentSlide < this.slides.length - this.slidesPerView) {
            this.currentSlide += this.slidesPerNav;
            
            if (this.currentSlide > this.slides.length - this.slidesPerView) {
                this.currentSlide = this.slides.length - this.slidesPerView;
            }
        } else if (this.loop) {
            this.currentSlide = 0
        }

        this.updateSlidePosition();
    }

    prevSlide() {
        if (this.currentSlide > 0) {
          this.currentSlide--;
        } else if (this.loop) {
          this.currentSlide = this.slides.length - this.slidesPerView;
        }
        this.updateSlidePosition();
    }

    updateSlidePosition() {
        const gap = this.getGap();
        const containerWidth = this.container.clientWidth;
        const gapPercentage = (gap / containerWidth) * 100;

        const translatePercentage = this.currentSlide * ((100 + gapPercentage) / this.slidesPerView);
        this.currentTranslate = -(translatePercentage / 100) * containerWidth;

        this.container.style.transition = "transform 0.5s ease-in-out";
        this.container.style.transform = `translateX(${this.currentTranslate}px)`;
    }

    startDrag(event) {
        event.preventDefault();

        const style = window.getComputedStyle(this.container);
        const matrix = style.transform;
        if (matrix && matrix !== 'none') {
            const values = matrix.split('(')[1].split(')')[0].split(',');
            const offsetX = parseFloat(values[4]) || 0;
            this.currentTranslate = offsetX;
        }

        this.container.style.transform = `translateX(${this.currentTranslate}px)`;

        this.container.style.transition = "none";

        this.isDragging = true;
        this.startX = event.touches ? event.touches[0].clientX : event.clientX;
        this.prevTranslate = this.currentTranslate;

    }

    drag(event) {
        event.preventDefault()
        if (!this.isDragging) return;

        const currentX = event.touches ? event.touches[0].clientX : event.clientX;
        const moveX = currentX - this.startX;

        // translate based on the drag distance
        let proposedTranslate = this.prevTranslate + moveX;

        // the max negative offset
        const containerWidth = this.container.clientWidth;
        const gap = this.getGap();
        const gapPercentage = (gap / containerWidth) * 100;

        const maxSlideIndex = this.slides.length - this.slidesPerView;
        const maxSlideTranslatePercent = maxSlideIndex * ((100 + gapPercentage) / this.slidesPerView);
        const maxNegativeOffset = -(maxSlideTranslatePercent / 100) * containerWidth;

        // overdrag
        const factor = 0.1; // stiffness

        if (proposedTranslate > 0) {
            const overdrag = proposedTranslate; 
            proposedTranslate = overdrag * factor;
        } else if (proposedTranslate < maxNegativeOffset) {
            const overdrag = proposedTranslate - maxNegativeOffset;
            proposedTranslate = maxNegativeOffset + overdrag * factor;
        }

        this.currentTranslate = proposedTranslate;
        this.container.style.transform = `translateX(${this.currentTranslate}px)`;
    }

    endDrag() {
        if(this.isDragging === false) return;
        this.isDragging = false;
        this.container.style.transition = "transform 0.3s ease-in-out";

        const movedBy = this.currentTranslate - this.prevTranslate;

        const containerWidth = this.container.clientWidth;
        const gap = this.getGap();
        const slideWidth = (containerWidth - gap * (this.slidesPerView - 1)) / this.slidesPerView;

        const targetSlide = Math.round(this.currentSlide + movedBy / -slideWidth);
        this.currentSlide = Math.max(0, Math.min(targetSlide, this.slides.length - this.slidesPerView));
        this.updateSlidePosition();

        const gapPercentage = (gap / containerWidth) * 100;
        const translatePercentage = this.currentSlide * ((100 + gapPercentage) / this.slidesPerView);
        this.currentTranslate = -(translatePercentage / 100) * containerWidth;
    }
}