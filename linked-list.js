const Node = require('./linked-list-node.js');

module.exports = class LinkedList {
  #size = 0;
  #head = null;

  prepend(key, value) {
    if (this.#head === null) {
      this.#head = new Node(key, value);
    } else {
      const temp = this.#head;
      this.#head = new Node(key, value);
      this.#head.nextNode = temp;
    }

    this.#size += 1;
  }

  get size() {
    return this.#size;
  }

  get head() {
    return this.#head;
  }

  isEmpty() {
    return this.#size === 0;
  }

  #at(index) {
    if (index < 0 || index >= this.#size) return null;

    if (this.isEmpty()) return null;

    let count = 0;
    let node = this.#head;

    while (count < index && node.nextNode !== null) {
      count += 1;
      node = node.nextNode;
    }

    return node;
  }

  hasKey(key) {
    if (this.isEmpty()) return false;

    let currentHead = this.#head;

    if (currentHead.key === key) return true;

    while (currentHead.nextNode !== null) {
      let next = currentHead.nextNode;
      if (next.key === key) return true;
      currentHead = next;
    }

    return false;
  }

  findValue(key) {
    if (this.isEmpty()) return null;

    let node = this.#head;

    while (node !== null) {
      if (node.key === key) return node.value;

      node = node.nextNode;
    }

    return null;
  }

  updateValue(key, value) {
    if (this.isEmpty()) return null;

    let node = this.#head;

    while (node !== null) {
      if (node.key === key) {
        node.value = value;
        break;
      }

      node = node.nextNode;
    }
  }

  #findIndexOfKey(key) {
    if (this.isEmpty()) return null;

    let node = this.#head;
    let index = 0;

    while (node !== null) {
      if (node.key === key) return index;

      node = node.nextNode;
      index += 1;
    }

    return null;
  }

  removeNode(key) {
    if (this.isEmpty()) return false;

    const keyIndex = this.#findIndexOfKey(key);

    if (keyIndex === null) {
      return false;
    } else {
      return this.removeAt(keyIndex);
    }
  }

  get keys() {
    let keysArr = [];

    let node = this.#head;

    while (node !== null) {
      keysArr.push(node.key);
      node = node.nextNode;
    }

    return keysArr;
  }

  get values() {
    let valuesArr = [];

    let node = this.#head;

    while (node !== null) {
      valuesArr.push(node.value);
      node = node.nextNode;
    }

    return valuesArr;
  }

  get entries() {
    let entriesArr = [];

    let node = this.#head;

    while (node !== null) {
      entriesArr.push([node.key, node.value]);
      node = node.nextNode;
    }

    return entriesArr;
  }

  removeAt(index) {
    if (index < 0 || index >= this.#size) return false;

    if (index === 0) {
      if (this.#size === 1) {
        this.#head = null;
      } else {
        this.#head.value = this.#head.nextNode.value;
        this.#head.key = this.#head.nextNode.key;
        this.#head.nextNode = this.#head.nextNode.nextNode;
      }
    } else {
      let occupyingNode = this.#at(index);
      let prevNode = this.#at(index - 1);

      if (occupyingNode !== null && prevNode !== null) {
        prevNode.nextNode = occupyingNode.nextNode;
      }
    }

    this.#size -= 1;
    return true;
  }
};
