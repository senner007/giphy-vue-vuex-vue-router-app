export default class Throttle<T> {

    private _total : number;
    private _current : number = 0;
    private _array : T[];
    private _inputs : T[];
    private _isDone : boolean = false;

    constructor (inputs : T[], array : T[]) {
      this._total = inputs.length;
      this._inputs = inputs;
      this._array = array;
      this.updateArray();
    }

    public increase(): void {
      this._current++;
      if (this._current % 4 === 0 || this._current === this._total) {
        if (this._current === this._total) { this._isDone = true; }
          this.updateArray();
      }
    }

    private updateArray(): void {
      for (let i : number = this._current; i < this._current + 4; i++) {
        if (!this._inputs[i]) { return; }
        this._array.push(this._inputs[i]);
      }
    }

    public get isDone (): boolean {
      return this._isDone;
    }

  }