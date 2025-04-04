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

    motherPerson() { return this._data.mother.person }
    motherKey() { return this._data.mother.key }

    unionObj() { return this._data.marr }
    unionEvent() { return this.unionObj() ? this._data.marr.event : null }
    // UNION date
    unionDate() { return this.unionEvent() ? this.unionEvent().date() : null }
    unionDateStandard() { return this.unionDate() ? this.unionDate().standard() : null }
    unionYear() { return this.unionDate() ? this.unionDate().y() : '?' }
    // UNION place
    unionPlace() { return this.unionEvent() ? this.unionEvent().place() : null }
    unionPlaceStandard() { return this.unionPlace() ? this.unionPlace().standard() : null }
    unionPlaceText() { return this.unionEvent().place().text() }

    setChildPerson(idx, person) { this._data.children[idx].person = person }
    setFatherPerson(person) { this._data.father.person = person }
    setMotherPerson(person) { this._data.mother.person = person }
    setUnionEvent(genEvent) { this._data.marr.event = genEvent }
}