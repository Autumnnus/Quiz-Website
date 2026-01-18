function Soru(tr, en, dogruCevap) {
  this.tr = tr;
  this.en = en;
  this.dogruCevap = dogruCevap;
}

Soru.prototype.getContent = function (lang) {
  return this[lang] || this.tr;
};

Soru.prototype.cevabiKontrolEt = function (cevap) {
  return cevap === this.dogruCevap;
};

const QuizDatabase = {
  javascript: [
    new Soru(
      {
        text: "Javascript paket yönetim uygulaması hangisidir?",
        options: { a: "Node.js", b: "Typescript", c: "Npm", d: "Webpack" },
      },
      {
        text: "Which one is a Javascript package management application?",
        options: { a: "Node.js", b: "Typescript", c: "Npm", d: "Webpack" },
      },
      "c",
    ),
    new Soru(
      {
        text: "Javascript'te sabit değişken tanımlamak için hangisi kullanılır?",
        options: { a: "var", b: "let", c: "const", d: "define" },
      },
      {
        text: "Which keyword is used to define a constant in Javascript?",
        options: { a: "var", b: "let", c: "const", d: "define" },
      },
      "c",
    ),
    new Soru(
      {
        text: "Hangisi bir JS kütüphanesi veya framework'ü değildir?",
        options: { a: "React", b: "Laravel", c: "Vue", d: "Svelte" },
      },
      {
        text: "Which one is NOT a JS library or framework?",
        options: { a: "React", b: "Laravel", c: "Vue", d: "Svelte" },
      },
      "b",
    ),
    new Soru(
      {
        text: "Javascript hangi yıl piyasaya sürülmüştür?",
        options: { a: "1994", b: "1995", c: "1996", d: "2000" },
      },
      {
        text: "In which year was Javascript released?",
        options: { a: "1994", b: "1995", c: "1996", d: "2000" },
      },
      "b",
    ),
    new Soru(
      {
        text: "DOM'un açılımı nedir?",
        options: {
          a: "Document Object Model",
          b: "Data Object Management",
          c: "Digital Output Mode",
          d: "Desktop Optimized Mod",
        },
      },
      {
        text: "What does DOM stand for?",
        options: {
          a: "Document Object Model",
          b: "Data Object Management",
          c: "Digital Output Mode",
          d: "Desktop Optimized Mod",
        },
      },
      "a",
    ),
  ],
  math: [
    new Soru(
      {
        text: "2 + 2 * 2 işleminin sonucu nedir?",
        options: { a: "8", b: "6", c: "4", d: "10" },
      },
      {
        text: "What is the result of 2 + 2 * 2?",
        options: { a: "8", b: "6", c: "4", d: "10" },
      },
      "b",
    ),
    new Soru(
      {
        text: "Karekök 144 kaçtır?",
        options: { a: "10", b: "11", c: "12", d: "13" },
      },
      {
        text: "What is the square root of 144?",
        options: { a: "10", b: "11", c: "12", d: "13" },
      },
      "c",
    ),
    new Soru(
      {
        text: "Hangisi bir asal sayıdır?",
        options: { a: "9", b: "1", c: "2", d: "15" },
      },
      {
        text: "Which one is a prime number?",
        options: { a: "9", b: "1", c: "2", d: "15" },
      },
      "c",
    ),
    new Soru(
      {
        text: "Bir üçgenin iç açıları toplamı kaçtır?",
        options: { a: "90", b: "180", c: "270", d: "360" },
      },
      {
        text: "What is the sum of internal angles of a triangle?",
        options: { a: "90", b: "180", c: "270", d: "360" },
      },
      "b",
    ),
  ],
  history: [
    new Soru(
      {
        text: "İstanbul hangi yıl fethedilmiştir?",
        options: { a: "1453", b: "1299", c: "1923", d: "1071" },
      },
      {
        text: "In which year was Istanbul conquered?",
        options: { a: "1453", b: "1299", c: "1923", d: "1071" },
      },
      "a",
    ),
    new Soru(
      {
        text: "Mona Lisa tablosu kime aittir?",
        options: {
          a: "Picasso",
          b: "Leonardo da Vinci",
          c: "Van Gogh",
          d: "Dali",
        },
      },
      {
        text: "Who painted the Mona Lisa?",
        options: {
          a: "Picasso",
          b: "Leonardo da Vinci",
          c: "Van Gogh",
          d: "Dali",
        },
      },
      "b",
    ),
    new Soru(
      {
        text: "Cumhuriyet kaç yılında ilan edilmiştir?",
        options: { a: "1920", b: "1923", c: "1924", d: "1938" },
      },
      {
        text: "In which year was the Republic of Turkey proclaimed?",
        options: { a: "1920", b: "1923", c: "1924", d: "1938" },
      },
      "b",
    ),
  ],
  geo: [
    new Soru(
      {
        text: "Dünyanın en yüksek dağı hangisidir?",
        options: { a: "Everest", b: "K2", c: "Kilimanjaro", d: "Ağrı Dağı" },
      },
      {
        text: "What is the highest mountain in the world?",
        options: { a: "Everest", b: "K2", c: "Kilimanjaro", d: "Ararat" },
      },
      "a",
    ),
    new Soru(
      {
        text: "Güneşe en yakın gezegen hangisidir?",
        options: { a: "Dünya", b: "Mars", c: "Merkür", d: "Venüs" },
      },
      {
        text: "Which planet is closest to the Sun?",
        options: { a: "Earth", b: "Mars", c: "Mercury", d: "Venus" },
      },
      "c",
    ),
  ],
  mix: [],
};

// Populate mix
QuizDatabase.mix = [
  ...QuizDatabase.javascript,
  ...QuizDatabase.math,
  ...QuizDatabase.history,
  ...QuizDatabase.geo,
].sort(() => Math.random() - 0.5);
