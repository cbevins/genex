import { _family } from './generated/genex/_family.js'
import { _people } from './generated/genex/_people.js'
import { _places } from './generated/genex/_places.js'
import { Family } from '../genex/Family.js'
import { Person } from '../genex/Person.js'

const time1 = new Date()
const progName = (process.argv[1]).split('\\').pop()

const familyMap = new Map()
for (let i=0; i<_family.length; i++) familyMap.set(_family[i].gedKey(), _family[i])

const peopleMap = new Map()
for (let i=0; i<_people.length; i++) peopleMap.set(_people[i].gedKey(), _people[i])

function hydratePerson(person) {
    person.setBirthPlaceRef(_places[person.bPlaceKey()])
    person.setDeathPlaceRef(_places[person.dPlaceKey()])
    for(let j=0; j<person.residences().length; j++) {
        person.setResidencePlaceRef(j, _places[person.rPlaceKey(j)])
    }
    let key = person.famcKey()
    if (key) {
        person.setFamcRef(familyMap.get(key))
    }
    for(let j=0; j<person.fams().length; j++) {
        key = person.famsKey(j)
        person.setFamsRef(j, familyMap.get(key))
    }
    return person
}

// Hydrate all Family references to Person and Place
function hydrateFamily(family) {
    family.setFatherRef(peopleMap.get(family.fatherKey()))
    family.setMotherRef(peopleMap.get(family.motherKey()))
    for(let j=0; j<family.children.length; j++) {
        family.setChildRef(j, peopleMap.get(family.childKey(j)))
    }
}

// Hydrate all Person references to Family and Place
for (let i=0; i<_people.length; i++) hydratePerson(_people[i])
// Hydrate all Family references to Person and Place
for (let i=0; i<_family.length; i++) hydrateFamily(_family[i])

const p = _people[0]
console.log(p.info())

console.log(`\n${progName}`)
console.log(`    1 - hydrated ${_people.length} Person and ${_family.length} Family objects.`)
console.log(`    Successfully completed in ${new Date()-time1} msec`)
