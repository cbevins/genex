import { GenEvent } from './GenEvent.js'

export class Person {
    constructor(person) {
        this._data = person
    }

    // Internal data access
    data() { return this._data }
    // Client access
    file() { return this.name().file }
    gedKey() { return this.data().gedKey }
    nameKey() { return this.data().nameKey }

    //--------------------------------------------------------------------------
    // FAMILY
    //--------------------------------------------------------------------------
    famc() { return this._data.famc }
    famcKey() { return this._data.famc.key }
    famcFamily() { return this._data.famc.family }
    fams() { return this._data.fams }  // Returns an array
    famsKey(idx) { return this._data.fams[idx].key }
    famsFamily(idx) { return this._data.fams[idx].family }  // Returns a Place object

    //--------------------------------------------------------------------------
    // NAME
    //--------------------------------------------------------------------------
    name() { return this._data.name }

    ancestryName() { return this.name().name }  // GEDCOM NAME content
    firstName() { return this.name().first }
    nickNames() {return this.name().nicks.join(' ') }
    middleNames() {return this.name().middle.join(' ') }
    lastNames() {return this.name().last.join(' ') }
    otherNames() {return this.name().others.join(' ') }
    prefixNames() {return this.name().prefixes.join(' ') }
    suffixNames() {return this.name().suffixes.join(' ') }

    composeName(prefix=0, first=0, middle=0, nicks=0, last=0, others=0, suffix=0, file=0, span=0) {
        const parts = []
        const n = this.name()
        if (prefix) parts.push(...n.prefixes)
        if (first && n.first) parts.push(n.first)
        if (middle && n.middle.length) parts.push(...n.middle)
        if (nicks && n.nicks.length) {
            parts.push( `"${n.nicks.join(', ')}"`)
        }
        if (last && n.last.length) parts.push(...n.last)
        if (others && n.others.length) {
            parts.push( `(${n.others.join(', ')})`)
        }
        if (suffix && n.suffixes.length) parts.push(...n.suffixes)
        if (file && n.file) parts.push(`[${this.name().file}]`)
        if (span) parts.push(`(${this.lifeSpan()})`)
        return parts.join(' ')
    }

    label() { return `${this.composeName(0,1,1,0,1,0,1,0,1)}` }
    
    fullName() { return `${this.composeName(0,1,1,0,1,1,0,0,0)}` }

    longName() { return `${this.composeName(1,1,1,1,1,1,1,1,1)}` }

    lifeSpan() {
        const b = this.birthYear()
        const d = this.deathYear()
        return d ? `${b}-${d}` : `${b}-present`
    }

    sex() { return this._data.sex }

    //--------------------------------------------------------------------------
    // BIRTH
    //--------------------------------------------------------------------------
    birthObj() { return this._data.birth }
    birthEvent() { return this._data.birth.event }
    // Birth date
    birthDate() { return this._data.birth.event.date() }
    birthDateStandard() { return this.birthDate().standard() }
    birthDay() { return this.birthDate().d() }
    birthMon3() { return this.birthDate().mon3() }
    birthMonth() { return this.birthDate().m()}
    birthYear() { return this.birthDate().y() }
    // Birth place
    birthPlace() { return this.birthEvent().place() }
    birthPlaceIndex() { return this.birthPlace().index() }
    birthPlaceStandard() { return this.birthPlace().standard() }
    birthPlaceStandardCountry() { return this.birthPlace().standardCountry() }
    birthPlaceText() { return this.birthPlace().text() }

    //--------------------------------------------------------------------------
    // DEATH
    //--------------------------------------------------------------------------
    deathObj() { return this._data.death }
    deathEvent() { return this._data.death.event }
    // Death date
    deathDate() { return this._data.death.event.date() }
    deathDateStandard() { return this.deathDate().standard() }
    deathDay() { return this.deathDate().d() }
    deathMon3() { return this.deathDate().mon3() }
    deathMonth() { return this.deathDate().m()}
    deathYear() { return this.deathDate().y() }
    // Death place
    deathPlace() { return this._data.death.event.place() }
    deathPlaceIndex() { return this.deathPlace().index() }
    deathPlaceStandard() { return this.deathPlace().standard() }
    deathPlaceStandardCountry() { return this.deathPlace().standardCountry() }
    deathPlaceText() { return this.deathPlace().text() }

    father() { return this.famcFamily() ? this.famcFamily().fatherPerson() : null }
    mother() { return this.famcFamily() ? this.famcFamily().motherPerson() : null }

    //--------------------------------------------------------------------------
    // RESIDENCE
    //--------------------------------------------------------------------------
    residences() { return this._data.residences }  // Returns an array
    residenceObj(idx) { return this._data.residences[idx] }
    residenceEvent(idx) { return this._data.residences[idx].event }
    // Residence date
    residenceDate(idx) { return this._data.residences[idx].event.date() }
    residenceDateStandard(idx) { return this.residenceDate(idx).standard() }
    residenceDay(idx) { return this.residenceDate(idx).d() }
    residenceMon3(idx) { return this.residenceDate(idx).mon3() }
    residenceMonth(idx) { return this.residenceDate(idx).m()}
    residenceYear(idx) { return this.residenceDate(idx).y() }
    // Residence place
    residencePlace(idx) { return this._data.residences[idx].event.place() }
    residencePlaceIndex(idx) { return this.residencePlace(idx).index() }
    residencePlaceStandard(idx) { return this.residencePlace(idx).standard() }
    residencePlaceStandardCountry(idx) { return this.residencePlace(idx).standardCountry() }
    residencePlaceText(idx) { return this.residencePlace(idx).text() }

    //--------------------------------------------------------------------------
    // PRIVATE - used by hyrdatePerson and hydrateFamily methods
    //--------------------------------------------------------------------------
    setBirthEvent(genEvent) { this._data.birth.event = genEvent }
    setDeathEvent(genEvent) { this._data.death.event = genEvent }
    setResidenceEvent(idx, genEvent) { this._data.residences[idx].event = genEvent }
    setFamcFamily(family) { this._data.famc.family = family }
    setFamsFamily(idx, family) { this._data.fams[idx].family = family }
}