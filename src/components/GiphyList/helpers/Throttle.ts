export default class Throttle<T> {

    _total : number;
    _current : number = 0;
    _array : T[];
    _inputs : T[];
    _isDone : boolean = false;

    constructor (inputs : T[], array : T[]) {
      this._total = inputs.length;
      this._inputs = inputs;
      this._array = array;
      this.updateArray();
    }

    increase(): void {
      this._current++;
      if (this._current % 4 === 0 || this._current === this._total) {
        if (this._current === this._total) { this._isDone = true; }
          this.updateArray();
      }
    }

    updateArray(): void {
      for (let i : number = this._current; i < this._current + 4; i++) {
        if (!this._inputs[i]) { return; } 
        this._array.push(this._inputs[i]);
      }
    }

  }