function Quiz(sorular = []) {
  this.sorular = sorular;
  this.soruIndex = 0;
  this.dogruCevapSayisi = 0;
  this.selectedLanguage = null;
  this.selectedCategory = null;
}

Quiz.prototype.soruGetir = function () {
  return this.sorular[this.soruIndex];
};

Quiz.prototype.isFinished = function () {
  return this.soruIndex >= this.sorular.length;
};

Quiz.prototype.nextSoru = function () {
  this.soruIndex++;
};

Quiz.prototype.reset = function () {
  this.soruIndex = 0;
  this.dogruCevapSayisi = 0;
};

Quiz.prototype.setQuestions = function (newQuestions) {
  this.sorular = [...newQuestions];
  this.reset();
};
