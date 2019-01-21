export default class TransformObject {
  constructor(...args) {
    this._ = [];
    let obj = null;
    let struct = ['key', 'value'];
    let pair = 1;

    const getPair = p => Math.max(1, p) || 1;

    if (args.length === 3) {
      [obj, struct, _pair] = args;
      pair = getPair(_pair);
    } else if (Array.isArray(args[0])) {
      [struct, _pair] = args;
      pair = getPair(_pair);
    } else if (typeof args[0] === 'number') {
      pair = getPair(args[0]);
    } else {
      [obj] = args;
    }

    this.struct = struct;
    this.pair = pair;
    if (obj) this.transform(obj);
  }

  get PAIR() {
    return this.pair;
  }

  set PAIR(newPair) {
    this.pair = newPair;
  }

  get STRUCT() {
    return this.struct;
  }

  set STRUCT(newStruct) {
    this.struct = newStruct;
  }

  transform(object) {
    const [k, v] = this.struct;
    let len = 0;
    let temp = null;
    if (this.pair > 1) {
      temp = [];
    }

    for (const [key, val] of Object.entries(object)) {
      const tempObj = { [k]: key, [v]: val };

      if (this.pair === 1) {
        this._.push(tempObj);
        len++;
      } else {
        temp.push(tempObj);
        if (temp.length === this.pair) {
          this._.push(temp);
          temp = [];
          len++;
        }
      }
    }

    if (tem && temp.length) {
      this._.push(temp);
      len++;
    }

    this.length = len;
  }

  valueOf() {
    return this._;
  }

  *[Symbol.iterator]() {
    let len = 0;

    while (len < this.length) {
      yield this._[len];
      len++;
    }
  }
}
