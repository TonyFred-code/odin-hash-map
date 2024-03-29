const linkedList = require('./linked-list');

class HashNode {
  #node;

  constructor() {
    this.#node = new linkedList();
  }

  prepend(key, value) {
    this.#node.prepend(key, value);
  }

  isEmpty() {
    return this.#node.isEmpty();
  }

  hasKey(key) {
    return this.#node.hasKey(key);
  }

  updateValue(key, value) {
    this.#node.updateValue(key, value);
  }

  findValue(key) {
    return this.#node.findValue(key);
  }

  removeNode(key) {
    return this.#node.removeNode(key);
  }

  get keys() {
    return this.#node.keys;
  }

  get values() {
    return this.#node.values;
  }

  get entries() {
    return this.#node.entries;
  }
}

class HashMap {
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
    const existingNodesArr = this.entries();
    this.#store = [];
    this.#bucketSize = this.#getNextPrime(this.#bucketSize * 2);
    this.#fillStore();
    this.#entriesCount = 0;

    for (let node of existingNodesArr) {
      const [key, value] = node;
      this.set(key, value);
    }
  }

  set(key, value) {
    const hashedIndex = this.#hash(key);

    if (this.#entriesCount / this.#bucketSize >= this.#loadFactor) {
      this.#growBucket();
    }

    if (this.#store[hashedIndex].hasKey(key)) {
      this.#store[hashedIndex].updateValue(key, value);
    } else {
      this.#store[hashedIndex].prepend(key, value);
      this.#entriesCount += 1;
    }
  }

  get(key) {
    const hashedIndex = this.#hash(key);

    if (this.#store[hashedIndex] !== null) {
      const value = this.#store[hashedIndex].findValue(key);
      return value;
    } else {
      return null;
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

  values() {
    const output = [];

    for (let element of this.#store) {
      if (element !== null) {
        const valuesArr = element.values;
        if (valuesArr.length !== 0) {
          output.push(...valuesArr);
        }
      }
    }

    return output;
  }

  entries() {
    const output = [];

    for (let element of this.#store) {
      if (element !== null) {
        const entriesArr = element.entries;
        if (entriesArr.length !== 0) {
          output.push(...entriesArr);
        }
      }
    }

    return output;
  }
}

const hashMap = new HashMap();
hashMap.set('firstKey', 'firstValue'); // 1
hashMap.set('secondKey', 'secondValue'); // 2
hashMap.set('game2', 'Monopoly'); // 3
hashMap.set('car2', 'Ford'); // 4
hashMap.set('constellation2', 'Ursa Major'); // 5
hashMap.set('school2', 'Harvard'); // 6
hashMap.set('country2', 'Australia'); // 7
hashMap.set('continent2', 'Antarctica'); // 8
hashMap.set('job3', 'Doctor'); // 9
hashMap.set('music3', 'Hip Hop'); // 10
hashMap.set('drink4', 'Coca Cola'); // 11
hashMap.set('animal3', 'Kangaroo'); // 12
hashMap.set('book3', '1984'); // 13
hashMap.set('city4', 'Tokyo'); // 14
hashMap.set('food3', 'Pasta'); // 15
hashMap.set('emotion3', 'Excited'); // 16
hashMap.set('element3', 'Platinum'); // 17
hashMap.set('team3', 'Red Sox'); // 18
hashMap.set('movie3', 'The Godfather'); // 19
hashMap.set('subject4', 'Chemistry'); // 20
hashMap.set('color3', 'Purple'); // 21
hashMap.set('language3', 'Java'); // 22
hashMap.set('firstKey', 'updatedFirstKey');
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());

console.log(hashMap.length);
console.log(hashMap.get('color3'));
console.log(hashMap.has('firstKey3'));
console.log(hashMap.has('firstKey'));
console.log(hashMap.remove('color3'));
console.log(hashMap.remove('color3'));
console.log(hashMap.length);
hashMap.clear();
console.log(hashMap.length);
