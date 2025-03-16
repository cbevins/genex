export class Place {
    constructor(text, standard, vicKeys, index=0) {
        this._data = {text, standard, vicKeys, index}
    }

    standardPrefix() {
        const std = this._data.standard
        const country = std.substring(0, 3)
        let len = 2
        if (['USA','CAN', 'ENG'].includes(country)) len = 3
        // else if (std.substring(0, 7) === 'CAN,QC') len = 3
        return this.standardParts(len)
    }
    standardCountry() { return this.standardPart(0) }
    standardCounty() { return this.standardPart(2) }
    standardState() { return this.standardPart(1) }
    standardPart(idx) {
        const parts = this._data.standard.split(',')
        return (parts.length > idx) ? parts[idx] : null
    }
    standardParts(nparts) {  // 0=country, 1-state, 2=county
        const parts = this._data.standard.split(',')
        const n = Math.min(parts.length, nparts)
        const results = []
        for(let i=0; i<n; i++) results.push(parts[i])
        return results.join(',')
    }
    standard1() { return this.standardPart(0) } // "USA"
    standard1() { return this.standardPart(0) } // "USA,MN"
    standard1() { return this.standardPart(0) } // "USA,MN,Itasca"

    index() { return this._data.index }
    standard() { return this._data.standard }
    text() { return this._data.text }
    vicKeys() { return this._data.vicKeys }
}