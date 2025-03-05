/**
 * People is a collection of all Person instances keyed by GEDCOM INDI key, name, or label.
 */
import { EvDate } from './EvDate.js'
import { Person } from './Person.js'

export class People {
    // Creates hydrated Person instances for each GEDCOM INDI reord
    // places: reference to Sylvan.places Map (GedcomPlaceKeys.js)
    constructor(gedcom, places) {
        this._data = {
            gedcom: gedcom,     // Gedcom instance
            gedKeyMap:  null,   // Map of gedKey => Person
            msg: [],            // Processing messages
            nameKeyMap: null,   // Map of nameKey => person
            nameLabelMap: null, // Map of nameLabel => person
            places,             // Map of known PLAC (GedcomPlacKeys.js)
            type: 'INDI'
        }
        this._init()
        this._hydrateAll()
    }

    // ----------------------------------------------------------------------
    // Public data access methods
    // ----------------------------------------------------------------------

    find(key) {
        if (! (typeof key === 'string') && ! (key instanceof String) ) {
            throw new Error('People.find() was passed a non-string arg; is it a Svelte Store?')
        }
        if (key.substring(0,1) === '@') {
            return this.gedKeyMap().get(key)
        } else if (this.nameKeyMap().has(key)) {
            return this.nameKeyMap().get(key)
        }
        return this.nameLabelMap().get(key)
    }

    gedcom() { return this._data.gedcom }

    gedKeyMap() { return this._data.gedKeyMap }

    messages() { return this._data.msg }

    nameKeyMap() { return this._data.nameKeyMap }

    nameLabelMap() { return this._data.nameLabelMap }

    places() { return this._data.places }

    // Returns an array of the following objects:
    // {index: <number>, person: <Person>, label: <string>}
    selectors() {
        let items = []
        let id = 0
        for (const [gedKey, person] of this.gedKeyMap().entries()) {
            items.push({index: id++, person: person, label: person.label()})
        }
        items.sort(function(a, b) {return a.label.localeCompare(b.label)})
        for(let i=0; i<items.length; i++) {
            const item = items[i]
            item.index = i
        }
        return items
    }

    size() { return this.gedKeyMap().size }

    type() { return this._data.type }

    // ----------------------------------------------------------------------
    // Public validation methods
    // ----------------------------------------------------------------------

    // msg must be a 2-element array of [<type>, <text>]
    addMsg(msg) { this._data.msg.push(msg) }

    checkAll() {
        const a = this.checkMultipleParentalFamilies()
        return a
    }

    // ----------------------------------------------------------------------
    // Private methods
    // ----------------------------------------------------------------------

    _hydrate(key, person) {
        const label = this._nameLabel(key)
        person._data.name = {
            key: this._nameKey(key),
            label: label,
            full: this._fullName(key),
            prefix: this._namePrefix(key),
            given: this._givenNames(key),
            nick: this._nickNames(key),
            surnames: this._surNames(key),
            surnamePrefix: this._surNamePrefix(key),
            suffix: this._nameSuffix(key)
        }
        person._data.life = {
            gender: this._gender(key),          // string 'F' or 'M'
            isLiving: this._isLiving(key),      // boolean TRUE or FALSE
            notes: this._notes(key),
            sourceKeys: this._sourceKeysAll(key),
            span: this._lifeSpan(key)           // string like '(1815-1888)'
        }
        person._data.birth = {
            date: new EvDate(this._birthDate(key)),     // EvDate instance
            notes: this._birthNoteAll(key),             // array of notes, which may contain newline separators '/n'
            place: this._birthPlace(key),               // PLAC record content
            sourceKeys: this._birthSourceKeysAll(key)   // array of sources keys like '@S1234@'
        },
        person._data.death = {
            date: new EvDate(this._deathDate(key)),     // EvDate instance
            notes: this._deathNoteAll(key),             // array of notes, which may contain newline separators '/n'
            place: this._deathPlace(key),               // PLAC record content
            sourceKeys: this._deathSourceKeysAll(key)   // array of sources keys like '@S1234@'
        }
        person._data.family = {                         // FAM keys and Family references
            parents: [],                                // array of Family references (filled by Families._hydrate() from 0 FAM recordfs)
            parentKeys: this._parentalFamilyKeys(key),  // array of FAMC '@F123@' keys (filled from INDI-FAMC records)
            spouses: [],                                // array of Family references (filled by Families._hydrate() from 0 FAM records)
            spouseKeys: this._spousalFamilyKeys(key),   // array of FAMS '@F123@' keys (filled from INDI-FAMS records)
        }
        person._data.person = {
            children: [],                               // array of all children Persons by all spouses
            fathers: [],                                // array of all father Person references
            mothers: [],
            siblings: null,                             // filled on first access
            spouses: []                                 // array of spouse Person references
        }
        if (person.isDeceased())
        return person
    }

    _hydrateAll() {
        for(const [key, person] of this.gedKeyMap().entries()) {
            this._hydrate(key, person)
            // Add this Person to the nameKey lookup table, checking for duplicate keys first
            if (this.nameKeyMap().has(person.nameKey())) {
                const current = this.nameKeyMap().get(person.nameKey())
                const newKey = person.nameKey()+person.gedKey()
                this.addMsg(['DUPLICATE NAME KEY', `'${person.nameKey()}' exists for ${current.gedKey()} and now ${person.gedKey()}; reset to '${newKey}'`])
                person._data.name.key = newKey
            }
            this.nameKeyMap().set(person.nameKey(), person)

            // Add this Person to the label lookup table, checking for duplicate keys first
            if (this.nameLabelMap().has(person.label())) {
                const current = this.nameLabelMap().get(person.label())
                const newKey = person.label() + ' ' + person.gedKey()
                this.addMsg(['DUPLICATE LABEL KEY', `'${person.label()}' exists for ${current.gedKey()} and now ${person.gedKey()}; reset to '${newKey}'`])
                person._data.name.label = newKey
            }
            this.nameLabelMap().set(person.label(), person)
        }
    }

    // Initializes the gedKeyMap with dehydrated Persons
    _init() {
        this._data.gedKeyMap = new Map()
        this._data.nameKeyMap = new Map()
        this._data.nameLabelMap = new Map()
        const recsMap = this.gedcom().topLevelRecordsFor(this.type())
        for(const key of recsMap.keys()) this.gedKeyMap().set(key, new Person(key))
    }

    _year(dateText, missing='?') {
        const date = new EvDate(dateText)
        return date.year() ? date.year() : missing
    }

    // ----------------------------------------------------------------------
    // Private methods for accessing GedcomRecords
    // ----------------------------------------------------------------------

    // INDI-BIRT
    _birthDate(key) { return this.gedcom().findFirstContent(key, ['INDI', 'BIRT', 'DATE']) }
    _birthDateAll(key) { return this.gedcom().findAllRecords(key, ['INDI', 'BIRT', 'DATE']) }
    // birthNote(key) { return this.gedcom().findFirstContent(key, ['INDI', 'BIRT', 'NOTE']) }
    _birthNoteAll(key) { return this.gedcom().findAllContent(key, ['INDI', 'BIRT', 'NOTE']) }
    _birthPlace(key) { return this.gedcom().findFirstContent(key, ['INDI', 'BIRT', 'PLAC']) }
    // birthPlaceAll(key) { return this._all(key, ['INDI', 'BIRT', 'PLAC']) }
    // birthSource(key) { return this.gedcom().findFirstContent(key, ['INDI', 'BIRT', 'SOUR']) }
    _birthSourceKeysAll(key) { return this.gedcom().findAllContent(key, ['INDI', 'BIRT', 'SOUR']) }
    _birthYear(key, missing='?') { return this._year(this._birthDate(key), missing) }

    // INDI-DEAT
    _deathDate(key) { return this.gedcom().findFirstContent(key, ['INDI', 'DEAT', 'DATE']) }
    // deathDateAll(key) { return this.gedcom().findAllContent(key, ['INDI', 'DEAT', 'DATE']) }
    // deathNote(key) { return this.gedcom().findFirstContent(key, ['INDI', 'DEAT', 'NOTE']) }
    _deathNoteAll(key) { return this.gedcom().findAllContent(key, ['INDI', 'DEAT', 'NOTE']) }
    _deathPlace(key) { return this.gedcom().findFirstContent(key, ['INDI', 'DEAT', 'PLAC']) }
    // deathPlaceAll(key) { return this._all(key, ['INDI', 'DEAT', 'PLAC']) }
    // _deathSourceKeys(key) { return this.gedcom().findFirstContent(key, ['INDI', 'DEAT', 'SOUR']) }
    _deathSourceKeysAll(key) { return this.gedcom().findAllContent(key, ['INDI', 'DEAT', 'SOUR']) }
    _deathYear(key, missing='?') { return this._year(this._deathDate(key), missing) }

    // INDI-FAMC, INDI-FAMS
    _parentalFamilyKeys(key) { return this.gedcom().findAllContent(key, ['INDI', 'FAMC'])}
    _spousalFamilyKeys(key) { return this.gedcom().findAllContent(key, ['INDI', 'FAMS'])}
    _notes(key) { return this.gedcom().findAllContent(key, ['INDI', 'NOTE']) }
    _sourceKeysAll(key) { return this.gedcom().findAllContent(key, ['INDI', 'SOUR']) }

    // Life
    _gender(key) { return this.gedcom().findFirstContent(key, ['INDI', 'SEX']) }
    _isLiving(key) { return this._lifeStatus(key, true, false) }
    _lifeSpan(key, missing) { return `(${this._birthYear(key, missing)}-${this._deathYear(key, missing)})` }
    _lifeStatus(key, alive='Alive', deceased='Deceased') {
        if (this._deathYear(key, '?') !== '?') return deceased
        const birth = this._birthYear(key, '?')
        if (birth !== '?') if (new Date().getFullYear() - birth > 110 ) return deceased
        return alive
    }

    // Names
    _fullName(key) {
        const name = []
        const npfx = this._namePrefix(key)
        const givn = this._givenNames(key)
        const nick = this._nickNames(key)
        const spfx = this._surNamePrefix(key)
        const surn = this._surNames(key)
        const nsfx = this._nameSuffix(key)
        
        if (npfx !== '') name.push(npfx)
        if (givn !== '') name.push(givn)
        if (nick !== '') name.push('"' + nick + '"')
        if (spfx !== '') name.push(spfx)
        if (surn !== '') name.push(surn.toUpperCase())
        if (nsfx !== '') name.push(nsfx)
        return name.join(' ')
    }
    _givenNames(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME', 'GIVN']) }
    // _givenNamesAll(key) { return this.findAllContent(key, ['INDI', 'NAME', 'GIVN']) }
    _name(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME']) }
    // _nameAll(key) { return this.findAllContent(key, ['INDI', 'NAME']) }
    // Returns the name as a key like 'CollinDouglasBevins1952'
    _nameKey(key) { return (this._givenNames(key) + this._surNames(key)).replace(/\s/g,'') + this._birthYear(key) }
    // Returns the name as a key like 'Collin Douglas Bevins (#BH1) (1952-?)'
    _nameLabel(key) { return this._fullName(key) + ' ' + this._lifeSpan(key) }
    _namePrefix(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME', 'NPFX']) }
    // _namePrefixAll(key) { return this._all(key, ['INDI', 'NAME', 'NPFX']) }
    _nameSuffix(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME', 'NSFX']) }
    // _nameSuffixAll(key) { return this.this.gedcom().findAllContent(key, ['INDI', 'NAME', 'NSFX']) }
    _nickNames(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME', 'NICK']) }
    // _nickNamesAll(key) { return this._all(key, ['INDI', 'NAME', 'NICK']) }
    _surNames(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME', 'SURN']) }
    // _surNamesAll(key) { return this._all(key, ['INDI', 'NAME', 'SURN']) }
    _surNamePrefix(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME', 'SPFX']) }
    // _surNamePrefixAll(key) { return this._all(key, ['INDI', 'NAME', 'SPFX']) }
}