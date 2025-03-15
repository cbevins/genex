export class Place {
    constructor(text, standard, index=0) {
        this._data = {text, standard, index}
    }

    standardCountry() { return this.standardPart(0) }
    standardState() { return this.standardPart(1) }
    standardCounty() { return this.standardPart(2) }
    standardPart(idx) {
        const parts = this._data.standard.split(',')
        if (parts.length > idx) return parts[idx]
    }
    index() { return this._data.index }
    standard() { return this._data.standard }
    text() { return this._data.text }
}