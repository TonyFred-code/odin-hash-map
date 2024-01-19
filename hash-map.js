class HashMap {
  #bucketSize = 16;
  #entriesCount = 0;
  #store = [];
  #loadFactor = 0.75;

  constructor(size = 16) {
    this.#bucketSize = size;
    this.#store = Array(this.#bucketSize).fill(null);
  }

  #isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (n % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i = i + 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
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
    this.#bucketSize = this.#bucketSize * 2;
    // this.#fillStore();
    this.#store = Array(this.#bucketSize).fill(null);

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

    if (this.#store[hashedIndex] === null) {
      this.#store[hashedIndex] = {
        key,
        value,
      };
      this.#entriesCount += 1;
    } else {
      console.log(this.#store[hashedIndex]);
      console.log(key, value);
      if (this.#store[hashedIndex].key === key) {
        this.#store[hashedIndex].value = value;
      }
    }
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
    let keysCount = 0;

    for (let element of this.#store) {
      if (element !== null) {
        keysCount += 1;
      }
    }

    return keysCount;
  }

  clear() {
    // this.#fillStore();
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
hashMap.set('firstKey', 'firstValue');
hashMap.set('secondKey', 'secondValue');
hashMap.set('game2', 'Monopoly');
hashMap.set('car2', 'Ford');
hashMap.set('constellation2', 'Ursa Major');
hashMap.set('school2', 'Harvard');
hashMap.set('country2', 'Australia');
hashMap.set('continent2', 'Antarctica');
hashMap.set('job3', 'Doctor');
hashMap.set('music3', 'Hip Hop');
hashMap.set('drink4', 'Coca Cola');
hashMap.set('animal3', 'Kangaroo');
hashMap.set('book3', '1984');
hashMap.set('city4', 'Tokyo');
hashMap.set('food3', 'Pasta');
hashMap.set('emotion3', 'Excited');
hashMap.set('element3', 'Platinum');
hashMap.set('team3', 'Red Sox');
hashMap.set('movie3', 'The Godfather');
hashMap.set('subject4', 'Chemistry');
hashMap.set('color3', 'Purple');
hashMap.set('language3', 'Java');
// console.log(hashMap.entries());
// console.log(hashMap.values());
console.log(hashMap.keys());
console.log(hashMap.length);
