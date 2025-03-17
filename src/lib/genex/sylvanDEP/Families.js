/**
 * Families is a catalog of Family instances
 */
import { EvDate } from './EvDate.js'
import { Family } from './Family.js'

export class Families {
    // people: reference to Sylvan.people() Map
    // places: reference to Sylvan.places() Map
    constructor(gedcom, people, locations, places) {
        this._data = {
            famKeyMap: null,    // Map of famKey => Family
            gedcom: gedcom,     // Gedcom instance
            people,             // People instance
            places,             // Map of known PLAC (GedcomPlacKeys.js)
            type: 'FAM'
        }
        this._init()
    }

    famKeyMap() { return this._data.famKeyMap }

    // Returns a Family *reference*
    find(famKey) { return this._data.famKeyMap.get(famKey) }

    gedcom() { return this._data.gedcom }

    people() { return this._data.people }

    // key may be a GEDCOM INDI key, a nameKey, or a labelKey
    person(key) { return this._data.people.find(key) }

    places() { return this._data.places }

    size() { return this.famKeyMap().size }

    type() { return this._data.type }

    // ----------------------------------------------------------------------
    // Private methods
    // ----------------------------------------------------------------------

    _init() {
        this._data.famKeyMap = new Map()
        const recsMap = this.gedcom().topLevelRecordsFor(this.type())
        for(const famKey of recsMap.keys()) {
            const family = new Family(famKey)
            this._hydrate(famKey, family)
            this.famKeyMap().set(famKey, family)
        }
    }

    _hydrate(famKey, family) {
        // Convert all Person keys to references
        family._data.xParent = this.person(this.gedcom().findFirstContent(famKey, ['FAM', 'WIFE']))
        family._data.yParent = this.person(this.gedcom().findFirstContent(famKey, ['FAM', 'HUSB']))
        family._data.children = []
        const ar = this.gedcom().findAllContent(famKey, ['FAM', 'CHIL'])
        for(let i=0; i<ar.length; i++) family.children().push(this.person(ar[i]))
        
        // Add this Family to each of the parents' spousal family array
        if (family.xParent() && family.yParent()) {
            family.xParent().addSpouseFamily(family)
            family.yParent().addSpouseFamily(family)
        }
        // Add this spouse to each of the other's spousal Person array
        if (family.xParent() && family.yParent()) {
            family.xParent().addSpouse(family.yParent())
            family.yParent().addSpouse(family.xParent())
        }
        // Add this Family to each of the children's parental Family array
        for(let i=0; i<family.children().length; i++) {
            const child = family.child(i)
            if (! child) {
                console.log(`*** Family ${family.gedKey()} has unknown child ${ar[i]}`)
                if (family.xParent()) console.log('  - xParent', family.xParent().label())
                if (family.yParent()) console.log('  - yParent', family.xParent().label())
            } else {
            child.addParentFamily(family)
            if (family.xParent()) {
                child.addMother(family.xParent())
                family.xParent().addChild(child)
            }
            if (family.yParent()) {
                child.addFather(family.yParent())
                family.yParent().addChild(child)
            }
        }
        }

        family._data.union = {
            date: new EvDate(this._marrDate(famKey)),   // EvDate instance
            notes: this._marrNoteAll(famKey),           // array of notes, which may contain newline separators '/n'
            place: this._marrPlace(famKey),             // PLAC record content
            sourceKeys: this._marrSourceAll(famKey)     // array of sources keys like '@S1234@'
        }

        family._data.disunion = {
            date: new EvDate(this._divDate(famKey)),    // EvDate instance
            notes: this._divNoteAll(famKey),            // array of notes, which may contain newline separators '/n'
            place: this._marrPlace(famKey),             // PLAC record content
            sourceKeys: this._divSourceAll(famKey)      // array of sources keys like '@S1234@'
        }
    }

    // ----------------------------------------------------------------------
    // Private methods for accessing GedcomRecords
    // ----------------------------------------------------------------------

    _divDate(key) { return this.gedcom().findFirstContent(key, ['FAM', 'DIV', 'DATE']) }
    _divNoteAll(key) { return this.gedcom().findAllContent(key, ['FAM', 'DIV', 'NOTE']) }
    _divPlace(key) { return this.gedcom().findFirstContent(key, ['FAM', 'DIV', 'PLAC']) }
    _divSourceAll(key) { return this.gedcom().findAllContent(key, ['FAM', 'DIV', 'SOUR']) }

    _marrDate(key) { return this.gedcom().findFirstContent(key, ['FAM', 'MARR', 'DATE']) }
    _marrNoteAll(key) { return this.gedcom().findAllContent(key, ['FAM', 'MARR', 'NOTE']) }
    _marrPlace(key) { return this.gedcom().findFirstContent(key, ['FAM', 'MARR', 'PLAC']) }
    _marrSourceAll(key) { return this.gedcom().findAllContent(key, ['FAM', 'MARR', 'SOUR']) }
}
