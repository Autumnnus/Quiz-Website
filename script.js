const quiz = new Quiz();
const ui = new UI();

let timer;
let timerLine;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
});

function setupEventListeners() {
  // Language Selection
  document.querySelector(".languages").addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-custom");
    if (!btn) return;

    document
      .querySelectorAll(".languages .btn-custom")
      .forEach((b) => b.classList.remove("language_selected"));
    btn.classList.add("language_selected");

    quiz.selectedLanguage = btn.id === "turkish" ? "tr" : "en";
    ui.setLanguage(quiz.selectedLanguage);
    checkQuizReadiness();
  });

  // Category Selection
  document.querySelector(".classes").addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-custom");
    if (!btn) return;

    document
      .querySelectorAll(".classes .btn-custom")
      .forEach((b) => b.classList.remove("class_selected"));
    btn.classList.add("class_selected");

    quiz.selectedCategory = btn.id;
    checkQuizReadiness();
  });

  // Start Quiz
  ui.btn_start.addEventListener("click", () => {
    if (!quiz.selectedCategory) return;

    quiz.setQuestions(QuizDatabase[quiz.selectedCategory]);
    ui.menu_bar.style.display = "none";
    ui.quiz_box.classList.add("active");

    showNextQuestion();
  });

  // Option Selected (Event Delegation)
  ui.option_list.addEventListener("click", (e) => {
    const option = e.target.closest(".option");
    if (!option || option.classList.contains("disabled")) return;

    handleOptionSelection(option);
  });

  // Next Question
  ui.btn_next.addEventListener("click", () => {
    quiz.nextSoru();
    if (quiz.isFinished()) {
      showScore();
    } else {
      showNextQuestion();
    }
  });

  // Replay
  document.querySelector(".btn_replay").addEventListener("click", () => {
    quiz.reset();
    ui.score_box.classList.remove("active");
    ui.quiz_box.classList.add("active");
    showNextQuestion();
  });

  // Quit
  document.querySelector(".btn_quit").addEventListener("click", () => {
    window.location.reload();
  });
}

function checkQuizReadiness() {
  ui.toggleStartButton(!!quiz.selectedLanguage && !!quiz.selectedCategory);
}

function showNextQuestion() {
  const soru = quiz.soruGetir();
  ui.soruGoster(soru, quiz.selectedLanguage);
  ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
  ui.btn_next.classList.remove("show");

  resetTimers();
  startTimers(10);
}

function handleOptionSelection(option) {
  stopTimers();
  const selectedKey = option.getAttribute("data-key");
  const soru = quiz.soruGetir();
  const isCorrect = soru.cevabiKontrolEt(selectedKey);

  if (isCorrect) {
    quiz.dogruCevapSayisi++;
    option.classList.add("correct");
    option.insertAdjacentHTML("beforeend", ui.correctIcon);
  } else {
    option.classList.add("incorrect");
    option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    // Show correct answer
    const correctOption = Array.from(ui.option_list.children).find((opt) =>
      soru.cevabiKontrolEt(opt.getAttribute("data-key")),
    );
    if (correctOption) {
      correctOption.classList.add("correct");
      correctOption.insertAdjacentHTML("beforeend", ui.correctIcon);
    }
  }

  Array.from(ui.option_list.children).forEach((opt) =>
    opt.classList.add("disabled"),
  );
  ui.btn_next.classList.add("show");
}

function showScore() {
  stopTimers();
  ui.quiz_box.classList.remove("active");
  ui.score_box.classList.add("active");
  ui.skoruGoster(
    quiz.sorular.length,
    quiz.dogruCevapSayisi,
    quiz.selectedLanguage,
  );
}

// Timer Logic
function startTimers(time) {
  let timeLeft = time;
  ui.time_second.textContent = timeLeft;
  ui.time_text.textContent = quiz.selectedLanguage === "tr" ? "Süre" : "Time";

  timer = setInterval(() => {
    timeLeft--;
    ui.time_second.textContent = timeLeft;

    if (timeLeft <= 0) {
      handleTimeUp();
    }
  }, 1000);

  let lineWidth = 0;
  timerLine = setInterval(() => {
    lineWidth += 0.2; // roughly 50fps for 10 seconds
    ui.time_line.style.width = lineWidth + "%";
    if (lineWidth >= 100) clearInterval(timerLine);
  }, 20);
}

function stopTimers() {
  clearInterval(timer);
  clearInterval(timerLine);
}

function resetTimers() {
  stopTimers();
  ui.time_line.style.width = "0%";
}

function handleTimeUp() {
  stopTimers();
  ui.time_text.textContent =
    quiz.selectedLanguage === "tr" ? "Süre Bitti" : "Time Up";

  const correctKey = quiz.soruGetir().dogruCevap;
  Array.from(ui.option_list.children).forEach((opt) => {
    if (opt.getAttribute("data-key") === correctKey) {
      opt.classList.add("correct");
      opt.insertAdjacentHTML("beforeend", ui.correctIcon);
    }
    opt.classList.add("disabled");
  });

  ui.btn_next.classList.add("show");
}
