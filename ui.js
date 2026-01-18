function UI() {
  this.btn_start_container = document.querySelector(".btn_start");
  this.btn_start = document.querySelector(".btn_quiz_start");
  this.btn_next = document.querySelector(".next_btn");
  this.quiz_box = document.querySelector(".quiz_box");
  this.score_box = document.querySelector(".score_box");
  this.menu_bar = document.querySelector(".menu_bar");
  this.option_list = document.querySelector(".option_list");
  this.time_text = document.querySelector(".time_text");
  this.time_second = document.querySelector(".time_second");
  this.time_line = document.querySelector(".time_line");
  this.question_text = document.querySelector(".question_text");
  this.question_index = document.querySelector(".question_index");
  this.score_text = document.querySelector(".score_text");

  this.correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
  this.incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';

  this.translations = {
    tr: {
      math: "Matematik",
      history: "Tarih",
      geo: "Coğrafya",
      mix: "Karışık",
      start: "Meydan Okumayı Başlat",
      next: "Sonraki Soru",
      timeLeft: "Süre",
      timeUp: "Süre Bitti",
      scoreTitle: "Quiz Tamamlandı",
      replay: "Tekrar Başlat",
      quit: "Bitir",
      congrats: (total, correct) =>
        `Tebrikler! ${total} sorudan ${correct} doğru cevap verdiniz.`,
    },
    en: {
      math: "Math",
      history: "History",
      geo: "Geography",
      mix: "Mixed",
      start: "Start Challenge",
      next: "Next Question",
      timeLeft: "Time",
      timeUp: "Time Up",
      scoreTitle: "Quiz Completed",
      replay: "Replay",
      quit: "Quit",
      congrats: (total, correct) =>
        `Congratulations! You got ${correct} out of ${total} correct.`,
    },
  };
}

UI.prototype.soruGoster = function (soru, lang = "tr") {
  const content = soru.getContent(lang);
  this.question_text.innerHTML = `<span>${content.text}</span>`;
  this.option_list.innerHTML = Object.entries(content.options)
    .map(
      ([key, value]) => `
      <div class="option" data-key="${key}"> 
        <span><b>${key}</b>: ${value}</span>
      </div>
    `,
    )
    .join("");
};

UI.prototype.soruSayisiniGoster = function (current, total) {
  this.question_index.innerHTML = `<span class="badge">${current} / ${total}</span>`;
};

UI.prototype.skoruGoster = function (total, correct, lang = "tr") {
  this.score_text.innerText = this.translations[lang].congrats(total, correct);
};

UI.prototype.setLanguage = function (lang) {
  const t = this.translations[lang];
  document.querySelector("#math").innerText = t.math;
  document.querySelector("#history").innerText = t.history;
  document.querySelector("#geo").innerText = t.geo;
  document.querySelector("#mix").innerText = t.mix;
  this.btn_start.innerText = t.start;
  this.btn_next.innerHTML = `${t.next} <i class="fas fa-arrow-right"></i>`;
};

UI.prototype.toggleStartButton = function (isEnabled) {
  this.btn_start_container.classList.toggle("btn_quiz_disabled", !isEnabled);
};
