const linkedList = require('./linked-list');

class HashNode {

  constructor() {
    this.node = new linkedList();
  }

  append(value) {
    this.node.append(value);
  }

  prepend(value) {
    this.node.prepend(value);
  }

  isEmpty() {
    return this.node.isEmpty();
  }

  prettyPrint() {
    let node = this.node.head;
    let output = ``;

    while (node !== null) {
      console.log(node.value)
      output += `(${node.value}) -> `;
      node = node.nextNode;
    }

    return (output += 'null');
  }
}

class HashMap {
  #bucketSize;
  #entriesCount = 0;
  #store = [];
  #loadFactor = 0.75;

  constructor(size = 16) {
    this.#bucketSize = this.#getNextPrime(size);
    // this.#store = Array(this.#bucketSize).fill(new HashNode());
    this.#fillStore();
  }

  #fillStore() {
    this.#store = [];

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
    console.log(this.#bucketSize);
    // this.#store = Array(this.#bucketSize).fill(new HashNode);
    this.#entriesCount = 0;

    for (let node of existingNodesArr) {
      const [key, value] = node;
      this.set(key, value);
    }
  }

  set(key, value) {
    const hashedIndex = this.#hash(key);

    if (this.#entriesCount / this.#bucketSize >= this.#loadFactor) {
      // this.#growBucket();
      console.log('bucket need to grow');
    }

    this.#store[hashedIndex].prepend({ key, value });


    // if (this.#store[hashedIndex].isEmpty()) {
    //   this.#entriesCount += 1;
    //   console.log(this.#store[hashedIndex].prettyPrint());
    // } else {
      // if (this.#store[hashedIndex].key === key) {
      //   this.#store[hashedIndex].value = value;
      // }
    // }

    console.log(this.#entriesCount);
    console.log(key, value);
    console.log(hashedIndex);
    console.log(this.#store[hashedIndex].prettyPrint())
  }

  get(key) {
    const hashedIndex = this.#hash(key);

    if (this.#store[hashedIndex] !== null) {
      const { value } = this.#store[hashedIndex];
      return value;
    } else {
      return null;
    }
  }

  has(key) {
    const hashedIndex = this.#hash(key);

    return this.#store[hashedIndex] !== null;
  }

  remove(key) {
    const hashedIndex = this.#hash(key);

    if (this.#store[hashedIndex] !== null) {
      this.#store[hashedIndex] = null;
      return true;
    }

    return false;
  }

  get length() {
    return this.#entriesCount;
  }

  clear() {
    this.#store = Array(this.#bucketSize).fill(null);
  }

  keys() {
    const output = [];

    for (let element of this.#store) {
      if (element !== null) {
        const { key } = element;

        output.push(key);
      }
    }

    return output;
  }

  values() {
    const output = [];

    for (let element of this.#store) {
      if (element !== null) {
        const { value } = element;

        output.push(value);
      }
    }

    return output;
  }

  entries() {
    let output = [];

    for (let element of this.#store) {
      if (element !== null) {
        const { key, value } = element;

        output.push([key, value]);
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
// console.log(hashMap.keys());
// console.log(hashMap.length);
