export class Vicinity {
    constructor(key, label, places) {
        this._data = {key, label, places, persons: new Map()}
    }
    key() { return this._data.key }
    label() { return this._data.label }
    persons() { return this._data.persons }
    places() { return this._data.places }
}

export class Vicinities {
    constructor(vicinityDefs, peopleArray) {
        this._data = {
            missing: [],
            vicMap: new Map()
        }
        const gevents = this._compileEvents(peopleArray, vicinityDefs)
        this._createVicinities(gevents)
    }

    missing() { return this._data.missing }
    vicinity(vicKey) { return this._data.vicMap.get(vicKey) }
    vicinityArray() { return Array.from(this._data.vicMap.values()) }
    vicinityKey(vicKey) { return this.vicinity().key()}
    vicinityLabel(vicKey) { return this.vicinity().label()}
    vicinityPersonEvents(vicKey) { return this.vicinity().personEvents() }
        
    _compileEvents(people, vicinities) {
        const gevents = []
        // Loop for each person...
        for(let i=0; i<people.length; i++) {
            
            // Adds the [person, gevent] to all Vicinity instances in which it occurs
            function _addEvent(person, gevent) {
                let n = 0
                const ePlace = gevent.place().standard()
                // Loop for evey Vicinity
                for(let j=0; j<vicinities.length; j++) {
                    const vicinity = vicinities[j]
                    const [vkey, ventry] = vicinity
                    const {label, places} = ventry
                    // Loop for every Vicinity Place
                    for(let k=0; k<places.length; k++) {
                        if (ePlace.startsWith(places[k])) {
                            gevents.push([vicinity, person, gevent])
                            n++
                            break
                        }
                    }
                }
                return n
            }
                    
            // Add BIRT, DEAT, and RESI events for this Person
            const person = people[i]
            if (! _addEvent(person, person.birthEvent())) this._data.missing.push(person)
            _addEvent(person, person.deathEvent())
            for(let i=0; i<person.residences().length; i++) {
                _addEvent(person, person.residenceEvent(i))
            }
        }
        return gevents
    }

    _createVicinities(gevents) {
        const map = new Map()
        for(let i=0; i<gevents.length; i++) {
            const [vicDef, person, gevent] = gevents[i]
            const [key, entry] = vicDef
            const {label, places} = entry

            // Add the Person to the Vicinity, creating Vicinity first if needed
            if (! map.has(key)) {
                const v = new Vicinity(key, label, places)
                map.set(key, v)
            }
            const v = map.get(key)

            // Add the GenEvent to the Person, creating Person first if needed
            if (! v.persons().has(person)) {
                v.persons().set(person, [])
            }
            const pevents = v.persons().get(person)
            pevents.push(gevent)
        }
        this._data.vicMap = map
    }
}
