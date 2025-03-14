export class Family {
    constructor(family) {
        this._data = family
    }

    childKey(idx) { return this._data.children[idx].key }
    childPerson(idx) { return this._data.children[idx].person }
    children() { return this._data.children }

    fatherPerson() { return this._data.father.person }
    fatherKey() { return this._data.father.key }

    gedKey() { return this._data.gedKey }
    
    unionObj() { return this._data.marr }
    unionEvent() { return this.unionObj() ? this._data.marr.event : null }
    unionDate() { return this.unionEvent() ? this.unionEvent().date().date() : 'Unknown' }
    unionYear() { return this.unionEvent() ? this.unionEvent().date().y() : '?' }
    unionPlaceStandard() { return this.unionEvent().place().standard() }
    unionPlaceText() { return this.unionEvent().place().text() }

    motherPerson() { return this._data.mother.person }
    motherKey() { return this._data.mother.key }

    setChildPerson(idx, person) { this._data.children[idx].person = person }
    setFatherPerson(person) { this._data.father.person = person }
    setMotherPerson(person) { this._data.mother.person = person }
    setUnionEvent(genEvent) { this._data.marr.event = genEvent }
}