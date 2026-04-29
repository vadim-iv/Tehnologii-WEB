export default class Accordion {
    constructor(
        question,
        arrow,
        answer
    ) {
        this.question = question
        this.arrow = arrow
        this.answer = answer
        this.init();
    }

    init() {
        this.question.addEventListener('click', () => {
            this.toggleAccordion()
        });
    }

    toggleAccordion() {
        this.answer.classList.toggle('open');
        this.arrow.classList.toggle('open');
    }
}