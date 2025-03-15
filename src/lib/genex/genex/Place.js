export class Place {
    constructor(text, standard, index=0) {
        this._data = {text, standard, index}
    }

    standardCountry() { return this._data.standard.split(',')[0] }
    index() { return this._data.index }
    standard() { return this._data.standard }
    text() { return this._data.text }
}