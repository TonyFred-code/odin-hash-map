class HashMap {
  #mod = 16;
  #store = [];

  constructor(size = 16) {
    this.#mod = size;
    this.#fillStore();
  }

  #fillStore() {
    this.#store = [];

    for (let i = 0; i < this.#mod; i += 1) {
      this.#store.push(null);
    }
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.#mod;
  }

  set(key, value) {
    const hashedIndex = this.#hash(key);

    if (this.#store[hashedIndex] === null) {
      this.#store[hashedIndex] = {
        key,
        value,
      };
    } else {
      if (this.#store[hashedIndex].key === key) {
        this.#store[hashedIndex].value = value;
      }
    }
  }

  get(key) {
    const hashedIndex = this.#hash(key);

    if (this.#store[hashedIndex] !== null) {
        const {value} = this.#store[hashedIndex];
        return value;
    } else {
        return null;
    }
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
    this.#fillStore();
  }

  keys() {
    const output = [];

    for (let element of this.#store) {
        if (element !== null) {
            const {key} = element;

            output.push(key);
        }
    }

    return output;
  }

  values() {
    const output = [];

    for (let element of this.#store) {
        if (element !== null) {
            const {value} = element;

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
console.log(hashMap.entries());
console.log(hashMap.values());
console.log(hashMap.keys());
console.log(hashMap.length);
console.log(hashMap.get('firstKey'))
hashMap.clear()
console.log(hashMap.entries());
console.log(hashMap.values());
console.log(hashMap.keys());
console.log(hashMap.length);
