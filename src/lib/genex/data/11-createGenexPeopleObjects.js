// Modules
import fs from 'fs'
import { GedcomNameParser } from '../gedcom/GedcomNameParser.js'
// Data
import { _gedcomIndiObjects } from './generated/gedcom/_gedcomIndiObjects.js'
import { _gedcomFamObjects } from './generated/gedcom/_gedcomFamObjects.js'
import { _gedcomKnownNamePrefixes } from './customized/_gedcomKnownNamePrefixes.js'

const time1 = new Date()
const progName = (process.argv[1]).split('\\').pop()
const indiName = '_gedcomIndiObjects'
const indiFile = `./generated/gedcom/${indiName}.js`
const famName = '_gedcomFamObjects'
const famFile = `./generated/gedcom/${famName}.js`
const peopleName = '_genexPeople'
const peopleFile = `./generated/genex/${peopleName}.js`

const nameParser = new GedcomNameParser(_gedcomKnownNamePrefixes)

for(let i=0; i<_gedcomIndiObjects.length; i++) {
    const [indiKey, indi] = _gedcomIndiObjects[i]
    const n = indi.name
    const genexNames = nameParser.parse(n.name, n.givn, n.surn, n.nsfx)
    const js = JSON.stringify(genexNames)
    // console.log(js)
}

console.log(`\n${progName}`)
console.log(`    1 - read ${_gedcomIndiObjects.length} [<GEDCOM INDI>] elements from '${indiFile}'.`)
console.log(`    2 - read ${_gedcomFamObjects.length} [<GEDCOM FAM>] elements from '${famFile}'.`)
console.log(`    3 - didn't do anything else yet.`)
console.log(`    Successfully completed in ${new Date()-time1} msec`)
