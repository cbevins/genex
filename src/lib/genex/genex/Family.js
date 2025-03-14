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

    setChildPerson(idx, person) { this._data.children[idx].person = person }
    setFatherPerson(person) { this._data.father.person = person }
    setMotherPerson(person) { this._data.mother.person = person }
}