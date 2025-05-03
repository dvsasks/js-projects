const questions = [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      options: ["<js>", "<scripting>", "<javascript>", "<script>"],
      answer: "<script>"
    },
    // Add more questions here
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  
  const startBtn = document.getElementById('start-btn');
  const quizScreen = document.getElementById('quiz-screen');
  const startScreen = document.getElementById('start-screen');
  const resultScreen = document.getElementById('result-screen');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const nextBtn = document.getElementById('next-btn');
  const questionNumber = document.getElementById('question-number');
  const timerEl = document.getElementById('timer');
  const scoreText = document.getElementById('score-text');
  const retryBtn = document.getElementById('retry-btn');
  
  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  });
  retryBtn.addEventListener('click', () => {
    location.reload();
  });
  
  function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
  }
  
  function loadQuestion() {
    resetState();
    timeLeft = 30;
    startTimer();
  
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    questionNumber.textContent = `${String(currentQuestion + 1).padStart(2, '0')}/${String(questions.length).padStart(2, '0')}`;
    
    q.options.forEach(option => {
      const div = document.createElement('div');
      div.classList.add('option');
      div.textContent = option;
      div.addEventListener('click', () => selectOption(div, q.answer));
      optionsContainer.appendChild(div);
    });
  }
  
  function resetState() {
    clearInterval(timer);
    timerEl.textContent = '00:30';
    optionsContainer.innerHTML = '';
    nextBtn.classList.add('hidden');
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `00:${String(timeLeft).padStart(2, '0')}`;
      if (timeLeft === 0) {
        clearInterval(timer);
        disableOptions();
        nextBtn.classList.remove('hidden');
      }
    }, 1000);
  }
  
  function selectOption(selected, correctAnswer) {
    clearInterval(timer);
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
      option.removeEventListener('click', selectOption);
      if (option.textContent === correctAnswer) {
        option.classList.add('correct');
      } else if (option === selected) {
        option.classList.add('wrong');
      }
    });
    if (selected.textContent === correctAnswer) score++;
    nextBtn.classList.remove('hidden');
  }
  
  function disableOptions() {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.removeEventListener('click', selectOption));
  }
  
  function endQuiz() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreText.textContent = `${score}/${questions.length}`;
    const percentage = (score / questions.length) * 100;
    document.querySelector('.score-bar::after')?.style.setProperty('width', `${percentage}%`);
  }
  