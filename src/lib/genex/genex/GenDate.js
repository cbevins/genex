const _mon3 = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export class GenDate {
    constructor(data) {
        this._data = data // {y: 1952, m: 9, d: 4, q: "abt", y2: 0}
    }

    d() { return this._data.d }
    m() { return this._data.m }
    mon3() { return _mon3[this._data.m] }
    q() { return this._data.q }
    y() { return this._data.y }
    y2() { return this._data.y2 }

    standard() {
        let parts = []
        if (this.q()) parts.push(this.q())

        if (this.y2()) {
            parts.push(this.y())
            parts.push(this.y2())
        } else {
            if (this.d()) parts.push(this.d())
            if (this.m()) parts.push(this.mon3())
            if (this.y()) parts.push(this.y())
        }
        return parts.join(' ')
    }
}