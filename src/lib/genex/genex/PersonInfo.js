export class PersonInfo {
    constructor(person) {
        this._person = person
        this._lines = []
        this.addNames(person)
        this.addBirth(person)
        this.addDeath(person)
        for(let i=0; i<person.residences().length; i++)
            this.addResidence(person, i)
        this.addChildhoodFamily(person)
        for(let i=0; i<person.fams().length; i++)
            this.addAdulthoodFamily(person, i)
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
    addChildhoodFamily(p) {
        this._lines.push(`Childhood Family:`)
        if (p.famcKey()) {
            const family = p.famcFamily()
            const mother = family.motherPerson()
            this._lines.push(`    Mother  : ${mother ? mother.fullName() : 'Unknown'}`)
            const father = family.fatherPerson()
            this._lines.push(`    Father  : ${father ? father.fullName() : 'Unknown'}`)
            this._lines.push(`    Siblings: ${family.children().length}`)
            for(let i=0; i<family.children().length; i++) {
                const child = family.childPerson(i)
                this._lines.push(`        ${i+1} : ${child.fullName()}`)
            }
        }
    }
    addAdulthoodFamily(p, idx) {
        this._lines.push(`Adulthood Family: ${idx+1}`)
        if (p.famsKey(idx)) {
            const family = p.famsFamily(idx)
            const mother = family.motherPerson()
            this._lines.push(`    Mother  : ${mother ? mother.fullName() : 'Unknown'}`)
            const father = family.fatherPerson()
            this._lines.push(`    Father  : ${father ? father.fullName() : 'Unknown'}`)
            this._lines.push(`    Children: ${family.children().length}`)
            for(let i=0; i<family.children().length; i++) {
                const child = family.childPerson(i)
                this._lines.push(`        ${i+1} : ${child.fullName()}`)
            }
        }
    }
    getLines() { return this._lines }
}