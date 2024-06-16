// classes 그리고 interfaces 를 활용하여, 아래 API를 위한 '미니' 버전을 구현하세요.

// ✅ LocalStorage API:
// 추상화 클래스와 제네릭을 사용하세요.

interface LocalStorageAPI<T> {
  [key: string]: T;
}

abstract class LocalStorage<T> {
  constructor(protected storage: LocalStorageAPI<T> = {}) {}

  abstract setItem(key: string, value: T): void;
  abstract clearItem(key: string): void;
  abstract clear(): void;

  getItem(key: string): T | undefined {
    return this.storage[key];
  }
}

class MyLocalStorage<T> extends LocalStorage<T> {
  setItem(key: string, value: T): void {
    this.storage[key] = value;
  }

  clearItem(key: string): void {
    delete this.storage[key];
  }
  clear(): void {
    this.storage = {};
  }
}

const myLocalStorage = new MyLocalStorage<string>();

myLocalStorage.setItem('Hello', 'teacher~!');
console.log(myLocalStorage.getItem('Hello'));

myLocalStorage.clearItem('Hello');
console.log(myLocalStorage.getItem('Hello'));

myLocalStorage.setItem('Name', 'Nomadcoders');
myLocalStorage.clear();

/* 
localStorage.setItem(<key>, <value>)
localStorage.getItem(<key>)
localStorage.clearItem(<key>)
localStorage.clear()
*/

////////////////////////////////////////////////////////
// ✅ Geolocation API:
// overloading을 사용하세요

geolocation.getCurrentPosition(successFn);
geolocation.getCurrentPosition(successFn, errorFn);
geolocation.getCurrentPosition(successFn, errorFn, optionsObj);
geolocation.watchPosition(success);
geolocation.watchPosition(success, error);
geolocation.watchPosition(success, error, options);
geolocation.clearWatch(id);

/* "classes 그리고 interfaces 를 활용하여, API를 위한 '미니' 버전을 구현해주세요. overloading을 사용해주세요.
1. GeoLocation에 사용될 필드와 메소드에 적용될 수 있는 타입들을 정의해주세요.
2. overloading을 적용될 수 있도록 GeoLocation API에 있는 기존 메소드의 이름을 쓰되 새로 만든 타입을 중복 시켜 적용해주세요.
3. 사용법에 있는 getCurrentPosition(), watchPosition() 안에 Fn이 붙어 있는 파라미터들은 콜백 함수를 의미하며 나머지들은 전부 객체를 가리킵니다. 이에 유의하여 타입을 설정해주세요.
  
설명은 한글로 부탁드립니다." */
