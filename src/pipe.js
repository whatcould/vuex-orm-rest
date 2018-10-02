export default class Pipe {
  static queue = [];
  static parallel = [];

  static async exec(start) {
    const res = await Promise.all(
      [this.queue.reduce((result, nextStep) => result.then(nextStep), Promise.resolve(start))],
      ...this.parallel.map(p => new Promise(r => r(p())))
    )

    this.queue = [];
    this.parallel = [];

    return res;
  }

  static seq(part) {
    this.queue.push(part);
    return this;
  }

  static par(part) {
    this.parallel.push(part);
    return this;
  }
}
