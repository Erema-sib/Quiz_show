// Все варианты ответа.
const option1 = document.querySelector(".option1"),
  option2 = document.querySelector(".option2"),
  option3 = document.querySelector(".option3"),
  option4 = document.querySelector(".option4");

//Все наши ответы
const optionElement = document.querySelectorAll(".option");

//Вопрос
const question = document.getElementById("question");

//Номер вопроса
const numberOfQuestion = document.getElementById("number-of-question");

//Кол-во всех вопросов
const numberOfAllQuestions = document.getElementById("number-of-all-questions");

let indexOfQuestion, //индекс текущего вопроса
    indexOfPage = 0; //индекс страницы

//обёртка для трекера(круглые метки)
const answersTracker = document.getElementById("answers-tracker");

//кнопка далее
const btnNext = document.getElementById("btn-next");

let score = 0; //итоговый результат

const correctAnswer = document.getElementById("correct-answer"); // количество правильных ответов
const numberOfAllQuestions2 = document.getElementById("number-of-all-questions-2"); // количество всех вопросов в модальном окне
const btnTryAgain = document.getElementById("btn-try-again"); //кнопка "начать снова"


const questions = [
  {
    question: "Столица Австралии ?",
    options: [
      "Сидней", 
      "Дублин", 
      "Канберра", 
      "Оттава"],
    rightAnswer: 2,
  },
  {
    question: "Какой фрукт является объектом раздора ?",
    options: [
      "Банан", 
      "Яблоко", 
      "Апельсин", 
      "Персик"],
    rightAnswer: 1,
  },
  {
    question: "На чём ехали зайчики в стихотворении К.Чуковского ?",
    options: [
      "На велосипеде", 
      "На воздушном шаре", 
      "На медведе", 
      "На трамвае"],
    rightAnswer: 3,
  },
  {
    question: "Как называется автомобиль без крыши ?",
    options: [
      "Кабриолет", 
      "Купе", 
      "Пикап", 
      "Универсал"],
    rightAnswer: 0,
  },
  {
    question: "Кто спас Рим ?",
    options: [
      "Троянский конь", 
      "Юлий Цезарь", 
      "Гуси", 
      "Воины"],
    rightAnswer: 2,
  },
];

numberOfAllQuestions.innerHTML = questions.length; //выводим кол-во вопросов

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; //сам вопрос

  //ответы
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы
  indexOfPage++; //увеличение индекса страницы
};

let completedAnswers = [] //массив для уже заданных вопросов(чтобы не повторялись)

//Случайный вопрос
const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false; //якорь для проверки одинаковых вопросов

  if(indexOfPage == questions.length) {
    quizOver()
  } else {
      if(completedAnswers.length > 0) {
        completedAnswers.forEach(item => {
          if(item == randomNumber) {
            hitDuplicate = true;
          }
        });
        if(hitDuplicate) {
          randomQuestion();
        } else {
          indexOfQuestion = randomNumber;
          load();
        }
      }
      if(completedAnswers.length == 0) {
        indexOfQuestion = randomNumber;
        load();
      }
  }
  completedAnswers.push(indexOfQuestion);
};


//Узнаём куда кликнул пользователь
const checkAnswer = el => {
  if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    el.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
}

for(option of optionElement) {
  option.addEventListener("click", e => checkAnswer(e));
}


const disabledOptions = () => {
  optionElement.forEach(item => {
    item.classList.add("disabled");
    if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  })
}

//Удаление всех классов со всех ответов при переходе на новый вопрос
const enableOptions = () => {
  optionElement.forEach(item => {
    item.classList.remove("disabled", "correct", "wrong");
  })
}

const validate = () => {
  if(!optionElement[0].classList.contains("disabled")) {
     alert("Вам нужно выбрать один из вариантов ответа");
  } else {
    randomQuestion();
    enableOptions();
  }
};

//Трекеры внизу(точки)
const answwerTracker= () => {
  questions.forEach(() => {
    const div = document.createElement("div");
    answersTracker.appendChild(div);
  })
};

//Связываем трекеры с номером вопроса
const updateAnswerTracker = status => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}


//Конец игры и данные в модальном окне
const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
};

//Кнопка "попробовать снова"
const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener("click", tryAgain);


btnNext.addEventListener("click", () => {
  validate();
})



window.addEventListener("load", () => {
  randomQuestion();
  answwerTracker();
});
