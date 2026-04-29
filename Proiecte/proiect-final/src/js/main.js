import Carousel from "../classes/Carousel"
import Accordion from "../classes/Accordion"

// MARK: Quick Book
let scrollProgress = 0

const handleScroll = () => {
    scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    if (scrollProgress > 0.8) {
        quickBookBox.classList.add('hidden')
    } else {
        quickBookBox.classList.remove('hidden')
    }
}

window.addEventListener('scroll', handleScroll)

const quickBookBox = document.querySelector('#quickBook')

// MARK: Movies carousel

const createSlide = (movie) => {
    const slide = document.createElement('div')
    slide.classList.add('slide')

    slide.innerHTML = `
        <img src="${movie.image_url}" alt="movie_slide" draggable="false">
    `

    return slide
}

async function initializeCarousel() {
    try {
        const response = await fetch('/api/movies.php');
        const result = await response.json()
        const movies = result.data

        const moviesWrapper = document.querySelector('#moviesSliderWrapper')
        const moviesContainer = document.querySelector('#moviesSliderTrack')

        movies.forEach(movie => {
            const slide = createSlide(movie)
            moviesContainer.appendChild(slide)
        })

        const moviesSlides = Array.from(moviesContainer.children)
        const moviesPrevButton = document.querySelector('#moviesPrev')
        const moviesNextButton = document.querySelector('#moviesNext')

        const carousel = new Carousel(
            moviesWrapper,
            moviesContainer,
            moviesSlides,
            moviesPrevButton,
            moviesNextButton,
            {
                slidesPerView: 4,
                slidesPerNav: 1,
                loop: true,
                draggable: true
            }
        )

        const breakpoints = [
            { maxWidth: 768, slidesPerView: 1 },
            { maxWidth: 832, slidesPerView: 2 },
            { maxWidth: 1200, slidesPerView: 3 },
            { maxWidth: Infinity, slidesPerView: 4 },
        ];

        const updateSlidesPerView = () => {
            const screenWidth = window.innerWidth;
            const matchingBreakpoint = breakpoints.find(bp => screenWidth <= bp.maxWidth);
            if (matchingBreakpoint) {
                carousel.updateSlidesPerView(matchingBreakpoint.slidesPerView);
            }
        };

        window.addEventListener('resize', updateSlidesPerView);
        updateSlidesPerView();

    } catch (error) {
        console.error('Error fetching or initializing carousel:', error);
    }
}

initializeCarousel()

// MARK: FAQ accordion

const questions = document.querySelectorAll('.question')
const answers = document.querySelectorAll('.answer')
const buttons = document.querySelectorAll('.faq-arrow')

questions.forEach((question, index) => {
    const button = buttons[index]
    const answer = answers[index]
    const accordion = new Accordion(question, button, answer)
})