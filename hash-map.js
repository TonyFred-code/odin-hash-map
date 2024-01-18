class HashMap {
  #mod;
  #store = [];

  constructor(size = 16) {
    this.#mod = size;
    this.#fillStore();
  }

  #fillStore() {
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
}
