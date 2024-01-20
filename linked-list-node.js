module.exports = class Node {
  constructor(value = null, key = null) {
    this.value = value;
    this.key = key;
    this.nextNode = null;
  }
};
