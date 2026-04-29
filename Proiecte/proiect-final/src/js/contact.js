import Accordion from "../classes/Accordion"

// MARK: FAQ accordion

const questions = document.querySelectorAll('.question')
const answers = document.querySelectorAll('.answer')
const buttons = document.querySelectorAll('.faq-arrow')

questions.forEach((question, index) => {
    const button = buttons[index]
    const answer = answers[index]
    const accordion = new Accordion(question, button, answer)
})