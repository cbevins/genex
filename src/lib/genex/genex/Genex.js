import { _family } from '../data/generated/genex/_family.js'
import { _people } from '../data/generated/genex/_people.js'
import { _places } from '../data/generated/genex/_places.js'
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
            _people,
            _peopleMap: new Map(),  // gedKey => Person
            _places,
            _placesArr: []
        }

        for (let i=0; i<_places.length; i++) {
            const [text, entry] = _places[i]
            const [standard, index] = entry
            this._data._placesArr.push(new Place(text, standard, index))
        }

        for (let i=0; i<_family.length; i++)
            this._data._familyMap.set(_family[i].gedKey(), _family[i])

        for (let i=0; i<_people.length; i++) 
            this._data._peopleMap.set(_people[i].gedKey(), _people[i])

        this._hydratePeople()
        this._hydrateFamilies()
    }

    family() { return this._data._family }
    familyMap() { return this._data._familyMap }
    people() { return this._data._people }
    peopleMap() { return this._data._peopleMap }
    places() { return this._data._places }

    getFamily(gedKey) { return this._data._familyMap.get(gedKey) }

    getPerson(gedKey) { return this._data._peopleMap.get(gedKey) }

    getPlace(idx) { return this._data._placesArr[idx] }

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
        for(let j=0; j<family.children.length; j++) {
            family.setChildPerson(j, this.getPerson(family.childKey(j)))
        }
    }
}
