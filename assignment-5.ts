type Words = {
  [key: string]: string;
};

class Dict {
  private words: Words;
  constructor() {
    this.words = {};
  }
  // 단어 추가 메소드
  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
  // 단어 정의
  def(term: string) {
    return this.words[term];
  }
  // 단어 삭제
  delete(word: Word) {
    delete this.words[word.term];
  }
  // 단어 업데이트
  update(word: Word) {
    if (this.words[word.term] !== undefined) {
      this.words[word.term] = word.def;
    }
  }
  // 사전 단어를 모두 보여줌
  showAll() {
    Object.keys(this.words).forEach((term) => {
      console.log(`${term}: ${this.words[term]}`);
    });
  }
  // 사전 단어들의 총 갯수를 리턴함
  count(): number {
    return Object.keys(this.words).length;
  }
  // 단어를 업데이트 함. 존재하지 않을시. 이를 추가함. (update + insert = upsert)
  upsert(word: Word) {
    this.words[word.term] = word.def;
  }
  // 해당 단어가 사전에 존재하는지 여부를 알려줌.
  exists(term: string): boolean {
    return this.words[term] !== undefined;
  }
  //  다음과 같은 방식으로. 여러개의 단어를 한번에 추가할 수 있게 해줌.
  // [{term:"김치", definition:"대박이네~"}, {term:"아파트", definition:"비싸네~"}]
  bulkAdd(word: Word[]) {
    word.forEach((word) => {
      this.add(word);
    });
  }
  // 다음과 같은 방식으로. 여러개의 단어를 한번에 삭제할 수 있게 해줌. ["김치", "아파트"]
  bulkDelete(terms: string[]) {
    terms.forEach((term) => {
      delete this.words[term];
    });
  }
}

class Word {
  constructor(public term: string, public def: string) {}
}

const kimchi = new Word('kimchi', '한국의 배추 발효 식품');
const bibimbap = new Word('bibimbap', '한국의 밥 요리');
const updateWord = new Word('bibimbap', '한국의 밥 요리. 만들기 쉽다.');
const makgeolli = new Word('makgeolli', '한국의 전통 발효 술');
const bulkAddWords = [
  new Word('dongchimi', '한국의 채소 무 발효 식품'),
  new Word('yakgwa', '한국의 전통 과자'),
];
const bulkDeleteWords = ['dongchimi', 'yakgwa'];

const dict = new Dict();

dict.add(kimchi);
dict.add(bibimbap);
dict.def('kimchi');
console.log(`정의 : ${dict.def('kimchi')}`);
console.log(`정의 : ${dict.def('bibimbap')}`);
dict.delete(kimchi);
console.log(`삭제 : ${dict.def('kimchi')}`);
dict.update(updateWord);
console.log(`업데이트 : ${dict.def('bibimbap')}`);
dict.upsert(makgeolli);
console.log(`존재 여부 : ${dict.exists('makgeolli')}`);
dict.bulkAdd(bulkAddWords);
dict.bulkDelete(bulkDeleteWords);
console.log(`총개수 : ${dict.count()}`);
dict.showAll();
