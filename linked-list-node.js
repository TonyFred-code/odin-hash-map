module.exports = class Node {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
};
