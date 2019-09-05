let score = 0;
let questionNumber = 0;
const totalQuestions = 5;


// before the quiz loads the first question, store the correct answer for each question into memory
function init() {
    sessionStorage.setItem('a1', 'b');
    sessionStorage.setItem('a2', 'd');
    sessionStorage.setItem('a3', 'c');
    sessionStorage.setItem('a4', 'a');
    sessionStorage.setItem('a5', 'b');
}


// increase the question counter by 1 each time a user gets to the next question
function questionAndScoreCounter() {
    if (questionNumber < totalQuestions) {
        questionNumber++;
        $('.pull-right').text(`Question: ${questionNumber} out of ${totalQuestions}`);
        $('.total-score').text(`Score: ${score} out of ${totalQuestions}`);
    } else {
        $('.pull-right').text(`Questions Completed: ${questionNumber} out of ${totalQuestions}`);
        $('.total-score').text('Thank you for visiting www.MyExampleQuiz.com');
    }
}


// cycles through each question when "SUBMIT" button is clicked
$(function() {
    questionAndScoreCounter();
    $('.question-form').hide();
    $('#q1').show();

    $('.question-form #submit').on('click', function() {
            let current = $(this).parents('form:first').data('question');
            let next = $(this).parents('form:first').data('question')+1;
        process(`q${current}`);
        questionAndScoreCounter();
        $('.question-form').hide();
        $(`#q${next}`).fadeIn(300);
        return false;
    });
});


// checks user input is right or wrong for the answer that was just submitted. If the question number is the same as the total number of questions, then the results page gets loaded
function process(currentQuestion) {
    if (currentQuestion === `q${questionNumber}`) {
        let userSubmitted = $(`input[name=q${questionNumber}]:checked`).val();
        if (userSubmitted === sessionStorage.getItem(`a${questionNumber}`)) {
            updateScore();
        }
    } 
    
    if (questionNumber === totalQuestions) {
        $('#results').html(`<h3 class="final-results">Your score is: ${score} out of ${totalQuestions}!</h3><button class="restart"><a href="index.html">TAKE IT AGAIN?</a></button>`);
    }
    return false;
}


// increase the score by 1 every time the user answers a question correctly
function updateScore() {
    score++;
}


// prior to the window loading the first question, run the init method to store all the questions' answers to the memory 
window.addEventListener('load', init, false);