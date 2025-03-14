import { GenEvent } from './GenEvent.js'

export class Person {
    constructor(person) {
        this._data = person
        this.mon3 = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }

    // Internal data access
    birthObj() { return this._data.birth }
    birthEvent() { return this._data.birth.event }
    data() { return this._data }
    deathObj() { return this._data.death }
    deathEvent() { return this._data.death.event }
    name() { return this._data.name }
    famc() { return this._data.famc }
    famcKey() { return this._data.famc.key }
    famcFamily() { return this._data.famc.family }
    fams() { return this._data.fams }  // Returns an array
    famsKey(idx) { return this._data.fams[idx].key }
    famsFamily(idx) { return this._data.fams[idx].family }  // Returns a Place object

    residenceObj(idx) { return this._data.residences[idx] }
    residenceEvent(idx) { return this._data.residences[idx].event }
    residences() { return this._data.residences }  // Returns an array

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
    fullName() { return ([this.firstName(), this.middleNames(), this.lastNames()].join(' ')).trim() }
    longName() { return ([this.prefixNames(), this.fullName(), this.suffixNames()].join(' ')).trim()}
    label() { return `${this.longName()} (${this.lifeSpan()})` }

    sex() { return this._data.sex }
    lifeSpan() {
        const b = this.birthYear()
        const d = this.deathYear()
        return d ? `${b}-${d}` : `${b}-present`
    }

    birthDate() { return this.birthEvent().date().date() }
    birthDay() { return this.birthEvent().date().d() }
    birthMon3() { return this.birthEvent().date().mon3() }
    birthMonth() { return this.birthEvent().date().m()}
    birthYear() { return this.birthEvent().date().y() }

    birthPlaceIndex() { return this.birthEvent().place().index() }
    birthPlaceStandard() { return this.birthEvent().place().standard() }
    birthPlaceText() { return this.birthEvent().place().text() }

    deathDate() { return this.deathEvent().date().date() }
    deathDay() { return this.deathEvent().date().d() }
    deathMon3() { return this.deathEvent().date().mon3() }
    deathMonth() { return this.deathEvent().date().m()}
    deathYear() { return this.deathEvent().date().y() }

    deathPlaceIndex() { return this.deathEvent().place().index() }
    deathPlaceStandard() { return this.deathEvent().place().standard() }
    deathPlaceText() { return this.deathEvent().place().text() }

    father() { return this.famcRef().fatherRef() }
    mother() { return this.famcRef().motherRef() }

    residenceDate(idx) { return this.residenceEvent(idx).date().date() }
    residenceDay(idx) { return this.residenceEvent(idx).date().d() }
    residenceMon3(idx) { return this.residenceEventidx().date().mon3() }
    residenceMonth(idx) { return this.residenceEvent(idx).date().m()}
    residenceYear(idx) { return this.residenceEvent(idx).date().y() }

    residencePlaceIndex(idx) { return this.residenceEvent(idx).place().index() }
    residencePlaceStandard(idx) { return this.residenceEvent(idx).place().standard() }
    residencePlaceText(idx) { return this.residenceEvent(idx).place().text() }

    setBirthEvent(genEvent) { this._data.birth.event = genEvent }
    setDeathEvent(genEvent) { this._data.death.event = genEvent }
    setResidenceEvent(idx, genEvent) { this._data.residences[idx].event = genEvent }

    setFamcFamily(family) { this._data.famc.family = family }
    setFamsFamily(idx, family) { this._data.fams[idx].family = family }
}