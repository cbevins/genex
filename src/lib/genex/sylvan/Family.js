/**
 * Families are top level GEDCOM 'FAM' records stored in a Map
 */

export class Family {
    constructor(gedKey) {
        this._data = {
            gedKey: gedKey
        }
    }
    
    // Returns a Person *reference*
    child(idx) { return this._data.children[idx] }
    
    // Returns an array of children Person *references*
    children() { return this._data.children }

    disunionDate() { return this._data.disunion.date }
    disunionLine() { return `on ${this.disunionDate().str()} at ${this.disunionPlace().text()}`}
    disunionNotes() { return this._data.disunion.notes }
    disunionPlace() { return this._data.disunion.place }
    disunionSourceKeys() { return this._data.disunion.sourceKeys }

    gedKey() { return this._data.gedKey }

    // Returns the spouse Person reference, given the subject
    spouse(subject) { return (subject === this.xParent()) ? this.yParent() : this.xParent()}

    unionDate() { return this._data.union.date }
    unionLine() { return `on ${this.unionDate().str()} at ${this.unionPlace().text()}`}
    unionNotes() { return this._data.union.notes }
    unionPlace() { return this._data.union.place }
    unionSourceKeys() { return this._data.union.sourceKeys }

    // Returns a Person *reference*
    xParent() { return this._data.xParent }
    
    // Returns a Person *reference*
    yParent() { return this._data.yParent }
}
