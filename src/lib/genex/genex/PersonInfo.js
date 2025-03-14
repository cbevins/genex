export class PersonInfo {
    constructor(person) {
        this._person = person
        this._lines = []
        this.addNames(person)
        this.addBirth(person)
        this.addDeath(person)
        this.addResidence(person, 0)
        this.addFamily(person)
    }

    addNames(p) {
        this._lines.push(`Names:`)
        this._lines.push(`    GedKey: ${p.gedKey()}`)
        this._lines.push(`    Key   : ${p.nameKey()}`)
        this._lines.push(`    First : ${p.firstName()}`)
        this._lines.push(`    Middle: ${p.middleNames()}`)
        this._lines.push(`    Last  : ${p.lastNames()}`)
        this._lines.push(`    Full  : ${p.fullName()}`)
        this._lines.push(`    Long  : ${p.longName()}`)
        this._lines.push(`    Label : ${p.label()}`)
        this._lines.push(`    Life  : ${p.lifeSpan()}`)
        this._lines.push(`    Sex   : ${p.sex()}`)
    }
    addBirth(p) {
        this._lines.push(`Birth:`)
        this._lines.push(`    Year : ${p.birthYear()}`)
        this._lines.push(`    Month: ${p.birthMonth()}`)
        this._lines.push(`    Day  : ${p.birthDay()}`)
        this._lines.push(`    Date : ${p.birthDate()}`)
        this._lines.push(`    Place Index: ${p.birthPlaceIndex()}`)
        this._lines.push(`    Place Text : ${p.birthPlaceText()}`)
        this._lines.push(`    Place Standard: ${p.birthPlaceStandard()}`)
    }
    addDeath(p) {
        this._lines.push(`Death:`)
        this._lines.push(`    Year : ${p.deathYear()}`)
        this._lines.push(`    Month: ${p.deathMonth()}`)
        this._lines.push(`    Day  : ${p.deathDay()}`)
        this._lines.push(`    Date : ${p.deathDate()}`)
        this._lines.push(`    Place Index: ${p.deathPlaceIndex()}`)
        this._lines.push(`    Place Text : ${p.deathPlaceText()}`)
        this._lines.push(`    Place Standard: ${p.deathPlaceStandard()}`)
    }
    addResidence(p, i) {
        this._lines.push(`Residence ${i+1}:`)
        this._lines.push(`    Year : ${p.residenceYear(i)}`)
        this._lines.push(`    Month: ${p.residenceMonth(i)}`)
        this._lines.push(`    Day  : ${p.residenceDay(i)}`)
        this._lines.push(`    Date : ${p.residenceDate(i)}`)
        this._lines.push(`    Place Index: ${p.residencePlaceIndex(i)}`)
        this._lines.push(`    Place Text : ${p.residencePlaceText(i)}`)
        this._lines.push(`    Place Standard: ${p.residencePlaceStandard(i)}`)
    }
    addFamily(p) {
        this._lines.push(`Childhood Family:`)
        const mother = p.famcFamily().motherPerson()
        this._lines.push(`    Mother: ${mother ? mother.fullName() : 'Unknown'}`)
        const father = p.famcFamily().fatherPerson()
        this._lines.push(`    Father: ${father ? father.fullName() : 'Unknown'}`)

    }
    getLines() { return this._lines }
}