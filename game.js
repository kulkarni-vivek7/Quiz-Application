const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the full form of HTML?',
        choice1: 'HyperText Machine Language',
        choice2: 'HyperText and links Markup Language',
        choice3: 'HyperText Markup Language',
        choice4: 'None of these',
        answer:3,
    },
    {
        question: 'The correct sequence of HTML tags for starting a webpage is,',
        choice1: 'Head, Title, HTML, Body',
        choice2: 'HTML, Head, Title, Body',
        choice3: 'HTML, Body, Title, Head',
        choice4: 'All of these',
        answer:2,
    },
    {
        question: 'Which of the following tag is used to insert a line-break in HTML?',
        choice1: '<br>',
        choice2: '<a>',
        choice3: '<pre>',
        choice4: '<b>',
        answer:1,
    },
    {
        question: ' How to create a hyperlink in HTML?',
        choice1: '<a> www.javatpoint.com <javaTpoint.com /a>',
        choice2: '<a href = "www.javatpoint.com"> javaTpoint.com </a>',
        choice3: '<a link = "www.javatpoint.com"> javaTpoint.com </a>',
        choice4: '<a url = "www.javatpoint.com" javaTpoint.com /a>',
        answer:2,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('/end.html')
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex,1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click',e => {
        if (!acceptingAnswers) return 

        acceptingAnswers = false

        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':'incorrect'

        if(classToApply ==='correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()