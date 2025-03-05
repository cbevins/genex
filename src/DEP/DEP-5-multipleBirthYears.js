import { constructGedcom } from './lib/genex/gedcom/constructGedcom.js'
import { EvDate } from './lib/genex/sylvan/EvDate.js'
import { Families } from './lib/genex/sylvan/Families.js'
import { People } from './lib/genex/sylvan/People.js'
import { Places } from './lib/genex/sylvan/Places.js'
import { GedcomPlaceKeys } from './lib/genex/data/saved/GedcomPlaceKeys.js'
import {_gedcom} from './lib/genex/data/tmp/GedcomJson.js'

const time1 = new Date()
const progName = (process.argv[1]).split('\\').pop()
const inputFile = './lib/genex/data/tmp/GedcomJson.js'

const gedcom = constructGedcom(_gedcom)
const places = new Places(GedcomPlaceKeys)
const people = new People(gedcom, places)

const multiple = []
const missing = []
const births2 = []
for(const [key, person] of people.gedKeyMap().entries()) {
    const births = gedcom.findAllRecords(key, ['INDI', 'BIRT', 'DATE'])
    if(births.length > 1) {
        const years = new Set()
        for(let i=0; i<births.length; i++) {
            years.add(new EvDate(births[i].content()).year())
        }
        if (years.size > 1) {
            console.log(person.fullName(), births.length, years)
            multiple.push(person, years)
        }
    }
    if(births.length < 1) missing.push([person, births.length])
}

const time2 = new Date()
console.log( `${progName} ${inputFile} (${time2-time1} msec)`)
console.log(`    There are ${multiple.length} Persons with multiple birth years.`)
console.log(`    There are ${missing.length} Persons with missing birth years.`)
