export class Person {
    constructor(person) {
        this._data = person
        this.mon3 = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }

    // Internal data access
    birth() { return this._data.birth }
    bDate() { return this._data.birth.date }    // Returns a Date object
    bPlaceKey() { return this._data.birth.place.key }  // Returns a Place object
    bPlaceRef() { return this._data.birth.place.ref }  // Returns a Place object
    data() { return this._data }
    death() { return this._data.death }
    dDate() { return this._data.death.date }    // Returns a Date object
    dPlaceKey() { return this._data.death.place.key }
    dPlaceRef() { return this._data.death.place.ref } // Returns a Place object
    name() { return this._data.name }
    famc() { return this._data.famc }
    famcKey() { return this._data.famc.key }
    famcRef() { return this._data.famc.ref }
    fams() { return this._data.fams }  // Returns an array
    famsKey(idx) { return this._data.fams[idx].key }
    famsRef(idx) { return this._data.fams[idx].ref }  // Returns a Place object
    residences() { return this._data.residences }  // Returns an array
    rPlaceKey(idx) { return this._data.residences[idx].place.key }  // Returns a Place object
    rPlaceRef(idx) { return this._data.residences[idx].place.ref }  // Returns a Place object

    // Client access
    file() { return this.name().file }
    gedKey() { return this.data().gedKey }
    nameKey() { return this.data().nameKey }

    // Name methods
    ancestryName() { return this.name().name }  // GEDCOM NAME content
    firstName() { return this.name().first }
    nickNames() {return this.name().nicks.join(' ') }
    middleNames() {return this.name().middle.join(' ') }
    lastNames() {return this.name().last.join(' ') }
    otherNames() {return this.name().others.join(' ') }
    prefixNames() {return this.name().prefixes.join(' ') }
    suffixNames() {return this.name().suffixes.join(' ') }
    fullName() { return [this.firstName(), this.middleNames(), this.lastNames()].join(' ') }
    label() { return [this.prefixNames(), this.fullName(), this.suffixNames(), this.birthYear(), this.deathYear()].join(' ')}
    
    birthDate() { return `${this.birthDay()} ${this.birthMon3()} ${this.birthYear()}` }
    birthDay() { return this.bDate().d}
    birthMon3() { return this.mon3[this.bDate().m]}
    birthMonth() { return this.bDate().m}
    birthYear() { return this.bDate().y}

    birthPlaceIndex() { return this.bPlaceRef()[1][1] }
    birthPlaceStandard() { return this.bPlaceRef()[1][0] }
    birthPlaceText() { return this.bPlaceRef()[0] }

    deathDate() { return `${this.deathDay()} ${this.deathMon3()} ${this.deathYear()}` }
    deathDay() { return this.dDate().d}
    deathMon3() { return this.mon3[this.dDate().m]}
    deathMonth() { return this.dDate().m}
    deathYear() { return this.dDate().y}

    deathPlaceIndex() { return this.dPlaceRef()[1][1] }
    deathPlaceStandard() { return this.dPlaceRef()[1][0] }
    deathPlaceText() { return this.dPlaceRef()[0] }

    father() { return this.famcRef().fatherRef() }
    mother() { return this.famcRef().motherRef() }

    residences() { return this._data.residences }

    info(person) {
        const lines = []
        lines.push(`Names:`)
        lines.push(`    Key   : ${this.nameKey()}`)
        lines.push(`    First : ${this.firstName()}`)
        lines.push(`    Middle: ${this.middleNames()}`)
        lines.push(`    Last  : ${this.lastNames()}`)
        lines.push(`    Full  : ${this.fullName()}`)
        lines.push(`    Label : ${this.label()}`)
        lines.push(`Birth:`)
        lines.push(`    Year : ${this.birthYear()}`)
        lines.push(`    Month: ${this.birthMonth()}`)
        lines.push(`    Day  : ${this.birthDay()}`)
        lines.push(`    Date : ${this.birthDate()}`)
        lines.push(`    Place Index: ${this.birthPlaceIndex()}`)
        lines.push(`    Place Text : ${this.birthPlaceText()}`)
        lines.push(`    Place Standard: ${this.birthPlaceStandard()}`)
        lines.push(`Death:`)
        lines.push(`    Year : ${this.deathYear()}`)
        lines.push(`    Month: ${this.deathMonth()}`)
        lines.push(`    Day  : ${this.deathDay()}`)
        lines.push(`    Date : ${this.deathDate()}`)
        lines.push(`    Place Index: ${this.deathPlaceIndex()}`)
        lines.push(`    Place Text: ${this.deathPlaceText()}`)
        lines.push(`    Place Standard: ${this.deathPlaceStandard()}`)
        lines.push(`Family:`)
        lines.push(`    Mother: ${this.mother() ? this.mother().fullName() : 'Unknown'}`)
        lines.push(`    Father: ${this.father() ? this.father().fullName() : 'Unknown'}`)
        return lines
    }

    setBirthPlaceRef(ref) { this._data.birth.place.ref = ref }
    setDeathPlaceRef(ref) { this._data.death.place.ref = ref }
    setFamcRef(ref) { this._data.famc.ref = ref }
    setFamsRef(idx, ref) { this._data.fams[idx].ref = ref }
    setResidencePlaceRef(idx, ref) { this._data.residences[idx].place.ref = ref }
}