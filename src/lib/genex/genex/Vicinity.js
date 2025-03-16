import { GenEvent } from "./GenEvent.js"

export class Vicinity {
    constructor(vicinity, people) {
        const [key, entry] = vicinity
        const {label, places} = entry
        this._data = {
            key,
            label,
            personEvents: [],   // array of {person, InGenEvent, OutGenEvnt] elements
            places,             // Array of Place keys that lie within this Vicinity
        }
        this._addPeople(people)
    }

    
    _addPeople(people) {
        for(let i=0; i<people.length; i++) {
            const person = people[i]
            const gevents = []
            const others = []
            const matchKey = this._data.key
            let isMember = false
            function _addEvent(person, gevent) {
                const gev = new GenEvent(gevent.type(), gevent.date(), gevent.place())
                const vicKeys = gevent.place().vicKeys()
                gev.isMember = vicKeys.includes(matchKey)
                if (gev.isMember) {
                    isMember = true
                    gev.vicKey = matchKey
                } else {
                    gev.vicKey = vicKeys.length ? vicKeys[0] : ''
                }
                gevents.push(gev)
            }
                    
            _addEvent(person, person.birthEvent())
            _addEvent(person, person.deathEvent())
            for(let i=0; i<person.residences().length; i++) {
                _addEvent(person, person.residenceEvent(i))
            }

            if (isMember) {
                gevents.sort((a, b) => {return a.date().y() - b.date().y()})
                // others.sort((a, b) => {return a.date().y() - b.date().y()})
                this._data.personEvents.push([person, gevents])
            }
        }
    }

    key() { return this._data.key }
    label() { return this._data.label }
    personEvents() { return this._data.personEvents }
    places() { return this._data.places }
}

export class Vicinities {
    constructor(vicinityArray, personArray) {
        this._data = {
            vicMap: new Map()
        }
        for(let i=0; i<vicinityArray.length; i++) {
            const v = new Vicinity(vicinityArray[i], personArray)
            this._data.vicMap.set(v.key(), v)
        }
    }

    vicinityArray() { return Array.from(this._data.vicMap.values()) }
    vicinityMap(vicKey) { return this._data.vicMap.get(vicKey)}
    vicinityKey(vicKey) { return this._data.vicMap.get(vicKey).key()}
    vicinityLabel(vicKey) { return this._data.vicMap.get(vicKey).label()}
    vicinityPersons(vicKey) { return this._data.vicMap.get(vicKey).persons()}
    vicinityPlaces(vicKey) { return this._data.vicMap.get(vicKey).places()}
}