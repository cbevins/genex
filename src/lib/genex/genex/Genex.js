import { _family } from '../data/generated/genex/_family.js'
import { _people } from '../data/generated/genex/_people.js'
import { _places } from '../data/generated/genex/_places.js'
import { Channels } from './Channels.js'
import { Family } from './Family.js'
import { GenDate } from './GenDate.js'
import { GenEvent } from './GenEvent.js'
import { Person } from './Person.js'
import { PersonInfo } from './PersonInfo.js'
import { Place } from './Place.js'

export class Genex {
    constructor() {
        this._data = {
            _family,
            _familyMap: new Map(),  // gedKey => Family
            _lineageBH: null,       // Channel instance
            _lineageRT: null,       // Channel instance
            _namesMap: new Map(),   // Person.nameKey => Person
            _people,
            _peopleMap: new Map(),  // Person.gedKey => Person
            _places,
            _placesArr: [],
        }

        // Create array of Place instances
        for (let i=0; i<_places.length; i++) {
            const [text, entry] = _places[i]
            const [standard, index, vicKeys] = entry
            this._data._placesArr.push(new Place(text, standard, vicKeys, index))
        }

        // Create Map() of Family.gedKey => family
        for (let i=0; i<_family.length; i++)
            this._data._familyMap.set(_family[i].gedKey(), _family[i])

        // Create Map() of Person.gedKey => Person
        for (let i=0; i<_people.length; i++) {
            this._data._peopleMap.set(_people[i].gedKey(), _people[i])
            this._data._namesMap.set(_people[i].nameKey(), _people[i])
        }

        this._hydratePeople()
        this._hydrateFamilies()
        this._data._lineageBH = this.addLineage('Collin Douglas Bevins 1952', 'Bevins-Heddens', 'BH')
        this._data._lineageRT = this.addLineage("Barbara Jeanne Riley 1953", 'Riley-Trombley', 'RT')
    }

    //--------------------------------------------------------------------------
    // Convenience methods
    //--------------------------------------------------------------------------

    lineageBH() { return this._data._lineageBH }
    lineageRT() { return this._data._lineageRT }

    // Returns Person instance given a gedKey, nameKey, or Person instance argument
    person(key) {
        if (this._data._peopleMap.has(key)) return this._data._peopleMap.get(key)
        if (this._data._namesMap.has(key)) return this._data._namesMap.get(key)
        if (key instanceof Person) return key
        return null
    }

    getFamily(gedKey) { return this._data._familyMap.get(gedKey) }
    getPerson(gedKey) { return this._data._peopleMap.get(gedKey) }
    getPlace(idx) { return this._data._placesArr[idx] }

    //--------------------------------------------------------------------------
    // Data access methods
    //--------------------------------------------------------------------------
    family() { return this._data._family }
    familyMap() { return this._data._familyMap }
    people() { return this._data._people }
    peopleMap() { return this._data._peopleMap }
    places() { return this._data._places }

    addLineage(nameKey, name, prefix) {
        const person = this.person(nameKey)
        const lineage = new Channels(person)
        // Add lineage data to each Person
        const nodes = lineage.nodes()
        for(let i=0; i<nodes.length; i++) {
            const node = nodes[i]
            const p = node.person
            p._data.lineage = {type : 1,
                mother: node.mother ? node.mother.person : null,
                father: node.father ? node.father.person : null,
                child: node.child ? node.child.person : null,
                tree: name,
                gen: node.gen,
                seq: node.seq,
                channel: node.channel,
                ancestors: node.ancestors,
                file: `#${prefix}${node.seq}`}
        }
        return lineage
    }

    // Adds a new key to the nameMap()
    // Used by clients to add, for example, 'cdb' or 'bjr' as a Person key
    addPerson(person, key) { this._data._namesMap.set(key, person) }

    // Hydrate all Person references to Family and Place
    _hydratePeople() {
        for (let i=0; i<_people.length; i++) this._hydratePerson(_people[i])
    }

    // Hydrate all Family references to Person and Place
    _hydrateFamilies() {
        for (let i=0; i<_family.length; i++) this._hydrateFamily(_family[i])
    }
    
    _hydratePerson(person) {
        person.setBirthEvent(new GenEvent('birth',
            new GenDate(person.birthObj().date),
            this.getPlace(person.birthObj().placeIndex)))

        person.setDeathEvent(new GenEvent('death',
            new GenDate(person.deathObj().date),
            this.getPlace(person.deathObj().placeIndex)))

        for(let j=0; j<person.residences().length; j++) {
            person.setResidenceEvent(j, new GenEvent('residence',
                new GenDate(person.residenceObj(j).date),
                this.getPlace(person.residenceObj(j).placeIndex)))
        }

        let key = person.famcKey()
        if (key) person.setFamcFamily(this.getFamily(key))

        for(let j=0; j<person.fams().length; j++) {
            key = person.famsKey(j)
            if (key) person.setFamsFamily(j, this.getFamily(key))
        }
        return person
    }
    
    // Hydrate all Family references to Person and Place
    _hydrateFamily(family) {
        family.setFatherPerson(this.getPerson(family.fatherKey()))
        family.setMotherPerson(this.getPerson(family.motherKey()))
        for(let j=0; j<family.children().length; j++) {
            family.setChildPerson(j, this.getPerson(family.childKey(j)))
        }
        family.setUnionEvent(new GenEvent('union',
            new GenDate(family.unionObj().date),
            this.getPlace(family.unionObj().placeIndex)))
    }
}
