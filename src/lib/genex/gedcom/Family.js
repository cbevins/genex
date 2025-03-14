export class Family {
    constructor(family) {
        this._data = family
    }

    child(idx) { return this._data.children(idx) }
    childKey(idx) { return this._data.children[idx].key }
    childRef(idx) { return this._data.children[idx].ref }
    children() { return this._data.children() }

    fatherRef() { return this._data.father.ref }
    fatherKey() { return this._data.father.key }
    gedKey() { return this._data.gedKey }
    motherRef() { return this._data.mother.ref }
    motherKey() { return this._data.mother.key }

    setChildRef(idx, ref) { this._data.children[idx].ref = ref }
    setFatherRef(ref) { this._data.father.ref = ref }
    setMotherRef(ref) { this._data.mother.ref = ref }
}