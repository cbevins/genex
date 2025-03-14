export class GenEvent {
    constructor(type, date, place) {
        this._data = {
            type,       // 'birth', 'death', 'residence',
            date,       // GenDate reference
            place       // Place reference
        }
    }

    date() { return this._data.date }
    place() { return this._data.place }
    type() { return this._data.type }
}
