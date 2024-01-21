const linkedList = require('./linked-list');

class HashNode {
  #node;

  constructor() {
    this.#node = new linkedList();
  }

  prepend(key) {
    this.#node.prepend(key, key);
  }

  isEmpty() {
    return this.#node.isEmpty();
  }

  hasKey(key) {
    return this.#node.hasKey(key);
  }

  removeNode(key) {
    return this.#node.removeNode(key);
  }

  get keys() {
    return this.#node.keys;
  }
}

class HashSet {
  #bucketSize;
  #entriesCount = 0;
  #store = [];
  #loadFactor = 0.75;

  constructor(size = 16) {
    this.#bucketSize = this.#getNextPrime(size);
    this.#fillStore();
  }

  #fillStore() {
    this.#store = [];
    this.#entriesCount = 0;

    for (let i = 0; i < this.#bucketSize; i += 1) {
      this.#store.push(new HashNode());
    }
  }

  #isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i = i + 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
  }

  #getNextPrime(current) {
    let next = current + 1;

    while (!this.#isPrime(next)) {
      next += 1;
    }

    return next;
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.#bucketSize;
  }

  #growBucket() {
    const existingKeysArr = this.keys();
    this.#store = [];
    this.#bucketSize = this.#getNextPrime(this.#bucketSize * 2);
    this.#fillStore();
    this.#entriesCount = 0;

    for (let key of existingKeysArr) {
      this.set(key);
    }
  }

  set(key) {
    const hashedIndex = this.#hash(key);

    if (this.#entriesCount / this.#bucketSize >= this.#loadFactor) {
      this.#growBucket();
    }

    if (this.#store[hashedIndex].hasKey(key)) {
      return false;
    } else {
      this.#store[hashedIndex].prepend(key);
      console.log(key)
      this.#entriesCount += 1;
      return true;
    }
  }

  has(key) {
    const hashedIndex = this.#hash(key);

    return this.#store[hashedIndex].hasKey(key);
  }

  remove(key) {
    const hashedIndex = this.#hash(key);

    if (!this.#store[hashedIndex].isEmpty()) {
      const removed = this.#store[hashedIndex].removeNode(key);

      if (removed) {
        this.#entriesCount -= 1;
      }

      return removed;
    }

    return false;
  }

  get length() {
    return this.#entriesCount;
  }

  clear() {
    this.#fillStore();
  }

  keys() {
    const output = [];

    for (let element of this.#store) {
      if (element !== null) {
        const keysArr = element.keys;
        if (keysArr.length !== 0) {
          output.push(...keysArr);
        }
      }
    }

    return output;
  }
}

const hashSet = new HashSet();
hashSet.set('firstKey'); // 1
hashSet.set('secondKey'); // 2
hashSet.set('game2'); // 3
hashSet.set('car2'); // 4
hashSet.set('constellation2'); // 5
hashSet.set('school2'); // 6
hashSet.set('country2'); // 7
hashSet.set('continent2'); // 8
hashSet.set('job3'); // 9
hashSet.set('music3'); // 10
hashSet.set('drink4'); // 11
hashSet.set('animal3'); // 12
hashSet.set('book3'); // 13
hashSet.set('city4'); // 14
hashSet.set('food3'); // 15
hashSet.set('emotion3'); // 16
hashSet.set('element3'); // 17
hashSet.set('team3'); // 18
hashSet.set('movie3'); // 19
hashSet.set('subject4'); // 20
hashSet.set('color3'); // 21
hashSet.set('language3'); // 22
hashSet.set('firstKey');
console.log(hashSet.keys());

console.log(hashSet.length);
console.log(hashSet.has('firstKey3'));
console.log(hashSet.has('firstKey'));
console.log(hashSet.remove('color3'));
console.log(hashSet.remove('color3'));
console.log(hashSet.length);
hashSet.clear();
console.log(hashSet.length);
