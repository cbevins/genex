export class Place {
    // location: reference to GedcomPlaceLocationsJson Map() entry
    constructor(place) {
        const country = parts.length > 0 ? parts.pop() : ''
        const state = parts.length > 0 ? parts.pop() : ''
        const locale = parts.length > 0 ? parts.join(', ') : ''
        this._data = {
            place,
            count: 0,
            country,
            locale,
            location,   // reference to a GedcomPlaceLocationsJson Map() entry
            messages,
            parts,
            state,
            text
        }
    }

    coords() {
        if (this.location()) {
            const [keys, names, lat, lng] = this.location()
            return [lat, lng]
        }
        return [0, 0]
    }

    count() { return this._data.count }

    country() {
        if (this.location()) {
            const [keys, names, lat, lng] = this.location()
            if (names.length) return names[0]
        }
        return this._data.country
    }
    
    county() {
        if (this.location()) {
            const [keys, names, lat, lng] = this.location()
            return (names.length > 2) ? names[2] : ''
        }
        return this._data.locale
    }

    fullName(countryFirst=false, sep=', ') {
        if (this.location()) {
            const parts = []
            const [keys, names, lat, lng] = this.location()
            for(let i=0; i<names.length; i++) parts.push(names[i])
            if (! countryFirst) parts.reverse()
            return parts.join(sep)
        }
        return this._data.parts.join(',')
    }

    // Returns an array of all the *search* GEDKEY record keys,
    keys() {
        if (this.location()) {
            const [keys, names, lat, lng] = this.location()
            return keys
        }
        return []
    }

    lat() {
        if (this.location()) {
            const [keys, names, lat, lng] = this.location()
            return lat
        }
        return 0
    }

    lng() {
        if (this.location()) {
            const [keys, names, lat, lng] = this.location()
            return lng
        }
        return 0
    }
    
    locale() { return this._data.locale }
    
    // Returns reference to a 
    // ["USA,MN,Itasca,Grand Rapids", [47.2380, -93.5327, "Grand Rapids"]],
    location() { return this._data.location }
    
    messages() { return this._data.messages }

    // Returns an array of all the *found* key location names,
    // which may be fewer than the *search* keys
    names() {
        if (this.location()) {
            const [keys, names, lat, lng] = this.location()
            return names
        }
        return []
    }

    standard() { return this.fullName() }
    
    state() {
        if (this.location()) {
            const [keys, names, lat, lng] = this.location()
            return (names.length > 1) ? names[1] : ''
        }
        return this._data.state
    }

    text() { return this._data.text }

    increment() { this._data.count++ }
}
