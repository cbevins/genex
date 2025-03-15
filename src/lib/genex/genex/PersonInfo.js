/**
 * Demonstrates how to access ALL Genex Person, Place, and Family information
 */
export class PersonInfo {
    constructor(person=null) {
        if (person) this.setPerson(person)
    }

    setPerson(person) {
        this._person = person
        this._info = []
        this.addNames(person)
        this.addBirth(person)
        this.addDeath(person)
        let n = person.residences().length
        for(let i=0; i<n; i++) this.addResidence(person, i, n)
        this.addChildhoodFamily(person)
        n = person.fams().length
        for(let i=0; i<n; i++) this.addAdulthoodFamily(person, i, n)
    }

    addNames(p) {
        this._info.push([0, `Names`, null])
        this._info.push([1, `GedKey`,p.gedKey()])
        this._info.push([1, `Key`, p.nameKey()])
        this._info.push([1, `First`, p.firstName()])
        this._info.push([1, `Middle`, p.middleNames()])
        this._info.push([1, `Last`, p.lastNames()])
        this._info.push([1, `Full`, p.fullName()])
        this._info.push([1, `Long`, p.longName()])
        this._info.push([1, `Label`, p.label()])
        this._info.push([1, `Life`, p.lifeSpan()])
        this._info.push([1, `Sex`, p.sex()])
    }

    addBirth(p) {
        this._info.push([0, `Birth`, null])
        this._info.push([1, `Year`, p.birthYear()])
        this._info.push([1, `Month`, p.birthMonth()])
        this._info.push([1, `Day`, p.birthDay()])
        this._info.push([1, `Date`, p.birthDateStandard()])
        this._info.push([1, `Place Index`, p.birthPlaceIndex()])
        this._info.push([1, `Place Text`, p.birthPlaceText()])
        this._info.push([1, `Place Standard`, p.birthPlaceStandard()])
        this._info.push([1, `Place Std Country`, p.birthPlaceStandardCountry()])
    }

    addDeath(p) {
        this._info.push([0, `Death`, null])
        this._info.push([1, `Year`, p.deathYear()])
        this._info.push([1, `Month`, p.deathMonth()])
        this._info.push([1, `Day`, p.deathDay()])
        this._info.push([1, `Date`, p.deathDateStandard()])
        this._info.push([1, `Place Index`, p.deathPlaceIndex()])
        this._info.push([1, `Place Text`, p.deathPlaceText()])
        this._info.push([1, `Place Standard`, p.deathPlaceStandard()])
    }

    addResidence(p, i, n) {
        this._info.push([0, `Residence ${i+1} of ${n}`, null])
        this._info.push([1, `Year`, p.residenceYear(i)])
        this._info.push([1, `Month`, p.residenceMonth(i)])
        this._info.push([1, `Day`, p.residenceDay(i)])
        this._info.push([1, `Date`, p.residenceDateStandard(i)])
        this._info.push([1, `Place Index`, p.residencePlaceIndex(i)])
        this._info.push([1, `Place Text`, p.residencePlaceText(i)])
        this._info.push([1, `Place Standard`, p.residencePlaceStandard(i)])
    }

    addChildhoodFamily(p) {
        this._info.push([0, `Childhood Family`, null])
        if (p.famcKey()) {
            const family = p.famcFamily()
            this._addFamily(family)
        }
    }

    _addFamily(family) {
        const mother = family.motherPerson()
        this._info.push([1, `Mother`, mother ? mother.label() : 'Unknown'])
        const father = family.fatherPerson()
        this._info.push([1, `Father`, father ? father.label() : 'Unknown'])

        if (family.unionEvent()) {
            this._info.push([1, `Union Date`, family.unionDateStandard()])
            this._info.push([1, `Union Place Standard`, family.unionPlaceStandard()])
        }

        this._info.push([1, `Siblings`, family.children().length])
        for(let i=0; i<family.children().length; i++) {
            const child = family.childPerson(i)
            this._info.push([2, `${i+1}`, child.label()])
        }
    }

    addAdulthoodFamily(p, idx, n) {
        this._info.push([0, `Adulthood Family ${idx+1} of ${n}`])
        if (p.famsKey(idx)) {
            const family = p.famsFamily(idx)
            this._addFamily(family)
        }
    }

    // Returns an array of lines formatted for ASCII devices
    getLines() {
        const lines = []
        for(let i=0; i<this._info.length; i++) {
            let [level, label, value] = this._info[i]
            if (! level) {
                lines.push(`${label}:`)
            } else {
                lines.push(`${''.padStart(4*level)} ${label.padEnd(28-level*4)}: '${value}'`)
            }
        }
        return lines
    }
}