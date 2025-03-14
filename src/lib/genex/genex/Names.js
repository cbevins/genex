export class Names {
    constructor(data) {
        this._data = data
    }

    data() { return this._data }

    ancestryName() { return this._data.name }  // GEDCOM NAME content
    firstName() { return this._data.first }
    
    nickNames() {return this._data.nicks }
    nickNamesJoined(sep=' ') {return this._data.nicks.join(sep) }

    middleNames() {return this._data.middle }
    middleNamesJoined(sep=' ') {return this._data.middle.join(sep) }
    
    lastNames() {return this._data.last }
    lastNamesJoined(sep=' ') {return this._data.last.join(sep) }
    
    otherNames() {return this._data.others.join(' ') }
    otherNamesJoined(sep=' ') {return this._data.others.join(sep) }

    prefixNames() {return this._data.prefixes }
    prefixNamesJoined(sep=' ') {return this._data.prefixes.join(sep) }

    suffixNames() {return this._data.suffixes }
    suffixNamesJoined(sep=' ') { return this._data.suffixes.join(sep) }

    fullName() { return ([this.firstName(), this.middleNames(), this.lastNames()].join(' ')).trim() }

    longName() { return ([this.prefixNames(), this.fullName(), this.suffixNames()].join(' ')).trim()}

    // label() { return `${this.longName()} (${this.lifeSpan()})` }
}