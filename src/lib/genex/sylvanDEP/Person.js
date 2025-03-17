/**
 * People are top level GEDCOM 'SOUR' records stored in a Map
 */
import { dateDiff } from './EvDate.js'

export class Person {
    constructor(gedKey) {
        this._data = {gedKey: gedKey, messages: []}
    }

    // Returns [years, months, days] between birth and current/death dates.
    age() {
        let a = dateDiff(this.birthDate(), (this.isLiving() ? null : this.deathDate()))
        if (a[0]<0 || a[0] === null) a[0] = 0
        if (a[1]<0 || a[1] === null) a[1] = 0
        if (a[2]<0 || a[2] === null) a[2] = 0
        return a
    }
    ageString() {
        const a = this.age()
        const y = a[0] ? a[0] : '?'
        const m = a[1] // ? a[1] : '?'
        const d = a[2] ? a[2] : '?'
        return `${y}y, ${m}m, ${d}d`
    }

    //---------------------------------------------------------------------------------
    // Birth status access and update methods
    //---------------------------------------------------------------------------------
    birthCountry() { return this.birthPlace().country() }
    birthDate() { return this._data.birth.date }
    birthDateDecimal() { return this.birthDate().yearDecimal() }
    birthLine() { return `on ${this.birthDate().str()} at ${this.birthPlace().text()}`}
    birthNotes() { return this._data.birth.notes }
    birthPlace() { return this._data.birth.place }
    birthSourceKeys() { return this._data.birth.sourceKeys }
    birthState() { return this.birthPlace().state() }
    birthYear() { return this.birthDate().year() }

    //---------------------------------------------------------------------------------
    // Death status access and update methods
    //---------------------------------------------------------------------------------
    
    deathCountry() { return this.deathPlace().country() }
    deathDate() { return this._data.death.date }
    deathLine() {
        return this.isLiving() ? `currently ${this.ageString()}`
            : `on ${this.deathDate().str()} at ${this.deathPlace().text()} (aged ${this.ageString()})`
    }
    deathNotes() { return this._data.death.notes }
    deathPlace() { return this._data.death.place }
    deathSourceKeys() { return this._data.death.sourceKeys }
    deathState() { return this.deathPlace().state() }
    deathYear() { return this.deathDate().year() }

    //---------------------------------------------------------------------------------
    // Family instance access and update methods
    //---------------------------------------------------------------------------------

    familyParent(idx) { return this._data.family.parents[idx] }         // Family *reference* for this Person's parent idx
    familyParents() { return this._data.family.parents }                // array of Family *references* for all this Person's parents
    familyParentKey(idx) { return this._data.family.parentKeys[idx] }   // FAM '@F123@' key for parent idx
    familyParentKeys() { return this._data.family.parentKeys }          // array of FAM '@F123@' keys for all this Person's parents
    familySpouse(idx) { return this._data.family.spouses[idx] }         // Family *references* for this Person's spouse idx
    familySpouses() { return this._data.family.spouses } //.sort(function(a, b) {return a.unionDate().year() - b.unionDate().year()})}                // array of Family *references* for all this Person's spouses
    familySpouseKey(idx) { return this._data.family.spouseKeys[idx] }   // FAM '@F123@' key for spouse idx
    familySpouseKeys() { return this._data.family.spouseKeys }          // array of FAM '@F123@' keys for all this Person's spouses

    //---------------------------------------------------------------------------------
    // Life status access and update methods
    //---------------------------------------------------------------------------------

    fileId() {
        let pos = this.nameSuffix().indexOf('(#')
        return (pos > -1) ? this.nameSuffix().slice(pos) : ''
    }

    // Returns string 'F' or 'M'
    gender() { return this._data.life.gender }

    // Returns boolean TRUE or FALSE
    isDeceased() { return ! this.isLiving() }

    // Returns boolean TRUE or FALSE
    isFemale() { return this.gender() === 'F'}
    
    // Returns boolena TRUE or FALSE
    isImmigrant() {
        return this.isDeceased() && this.birthPlace().country() && this.deathPlace().country()
            && this.birthPlace().country() != this.deathPlace().country()
    }

    // Returns boolena TRUE or FALSE
    isLiving() { return this._data.life.isLiving }

    // Returns boolena TRUE or FALSE
    isMale() { return this.gender() === 'M'}

    // Returns a string like '(1815-1888)'
    lifeSpan() { return this._data.life.span }

    messages() { return this._data.messages }

    notes() { return this._data.life.notes }

    sourceKeys() { return this._data.life.sourceKeys }

    //---------------------------------------------------------------------------------
    // Name access and update methods
    //---------------------------------------------------------------------------------
    
    fullName() { return this.nameFull() }           // same as nameFull()
    gedKey() { return this._data.gedKey }           // INDI GEDCOM key like '@I123@'
    label() { return this._data.name.label }        // same as nameLabel()
    nameFull() { return this._data.name.full }      // same as fullName()
    nameKey() { return this._data.name.key }
    nameLabel() { return this._data.name.label }
    namePrefix() { return this._data.name.prefix }
    nameGiven() { return this._data.name.given }
    nameNick() { return this._data.name.nick }
    nameSuffix() { return this._data.name.suffix.trim() }
    nameSurnames() { return this._data.name.surnames.trim() }
    nameSurnamePrefix() { return this._data.name.surnamePrefix }
    nameSuffixNoSeq() {
        let idx = this.nameSuffix().search("#")
        return (idx >= 0) ? (this.nameSuffix().slice(0, idx-1)) : this.nameSuffix()
    }
    
    //---------------------------------------------------------------------------------
    // Person access and update methods
    //---------------------------------------------------------------------------------

    child(idx) { return this.children().length ? this.children()[idx] : null }
    children() { return this._data.person.children }
    father(idx=0) { return this.fathers().length ? this.fathers()[idx] : null }
    fathers() { return this._data.person.fathers }
    mother(idx=0) { return this.mothers().length ? this.mothers()[idx] : null }
    mothers() { return this._data.person.mothers }
    parents() { return this.mothers().concat(this.fathers()) }
    sibling(idx=0) { return this.siblings().length ? this.siblings()[idx] : null }

    // Returns an array of Person references to all this Person's siblings
    // Creates a siblings list on first request
    siblings() {
        if (! this._data.person.siblings ) {
            const siblings = new Set()
            const parents = this.parents()
            for (let i=0; i<parents.length; i++) {
                for (let j=0; j<parents[i].children().length; j++) {
                    const child = parents[i].child(j)
                    if (child !== this) siblings.add(child)
                }
            }
            this._data.person.siblings = Array.from(siblings)
                .sort(function(a, b) {return a.birthYear() - b.birthYear()})
        }
        return this._data.person.siblings
    }

    spouse(idx=0) { return this.spouses().length ? this.spouses()[idx] : null }
    spouses() { return this._data.person.spouses }

    // Update methods called by Families.hydrate()
    addChild(person) { if (! this.children().includes(person)) this.children().push(person)}
    addFather(person) { if (! this.fathers().includes(person)) this.fathers().push(person) }
    addMessage(msg) { this._data.messages.push(msg) }
    addMother(person) { if (! this.mothers().includes(person)) this.mothers().push(person) }
    addSibling(person) { if (! this.siblings().includes(person)) this.siblings().push(person) }
    addSpouse(person) { if (! this.spouses().includes(person)) this.spouses().push(person) }
    // Also called by Families._hydrate() to update Family references
    addParentFamily(family) { if (! this.familyParents().includes(family)) this.familyParents().push(family) }
    addSpouseFamily(family) { if (! this.familySpouses().includes(family)) this.familySpouses().push(family) }

    // Returns an array of warning or error message [type, text]
    review() {
        const msg = []
        // if (id) {
        //     // Test 1: Ancestors must have a correct file id in its name suffix
        //     if (! person.name.suffix || person.name.suffix === '') msg.push(`Add ancestor id '${id}'`)
        //     else if (! person.name.suffix.includes(id)) msg.push(`Change ancestor id from '${person.name.suffix}' to '${id}'`)
        // }

        // Test 1: Persons must have a gender
        if (this.gender() !== 'M' && this.gender() !== 'F') msg.push(['Gender Unknown', `[${this.gender()}]`])

        // Test 1: should have a birth year and country
        if (! this.birthYear()) msg.push(['Birth Year Missing', ''])
        if (this.birthCountry() === 'unknown country') msg.push(['Birth Country Missing', `[${this.birthPlace().text()}]`])
        if (this.birthState() === 'unknown state') msg.push(['Birth State Missing', `[${this.birthPlace().text()}]`])

        // Test 3: Ancestors must have a death year and country
        if (! this.isLiving() ) {
            if (! this.deathYear()) msg.push(['Death Year Missing', ''])
            if (this.deathCountry() === 'unknown country') msg.push(['Death Country Missing', `[${this.deathPlace().text()}]`])
            if (this.deathState() === 'unknown state') msg.push(['Death State Missing', `[${this.deathPlace().text()}]`])
        }
        return msg
    }
}
