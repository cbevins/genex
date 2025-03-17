import { Place } from './Place.js'

export class Places {
    constructor(placeMap) {
        this._data = {
            placeMap  // PLAC content => placeKey
        }
    }

    // ----------------------------------------------------------------------
    // Public data access methods
    // ----------------------------------------------------------------------

    // Returns an array of all country keys in the GEDCOM PLAC records
    countries() {
        const country = new Set()
        for(const [text, place] of this.map().entries()) {
            country.add(place.country())
        }
        return Array.from(country).sort()
    }

    get(text) {
        if (this.map().has(text))
            return this.map().get(text)
        return this.map().get("")
    }

    has(text) { return this.map().has(text) }

    map() { return this._data.placeMap }

    size() { return this.map().size }
}