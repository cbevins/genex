// Modules
import fs from 'fs'
import { GedcomDateParser } from '../gedcom/GedcomDateParser.js'
// Data
import { _famObjects } from './generated/gedcom/_famObjects.js'
import { _gedcomKnownDateQuals, _gedcomKnownDateMonths } from './customized/_gedcomKnownDateMonths.js'
import { _places } from './generated/genex/_places.js'

const time1 = new Date()
const progName = (process.argv[1]).split('\\').pop()
const famName = '_famObjects'
const famFile = `./generated/gedcom/${famName}.js`
const familyName = '_family'
const familyFile = `./generated/genex/${familyName}.js`

const dateParser = new GedcomDateParser(_gedcomKnownDateQuals, _gedcomKnownDateMonths)
const placesMap = new Map(_places)
const families = []

function placeIndex(text) {
    // console.log(text)
    if (! placesMap.has(text)) throw new Error(`UNKNOWN PLACE '${text}'`)
    const [standard, idx] = placesMap.get(text)
    return idx
}

for(let i=0; i<_famObjects.length; i++) {
    const [famKey, fam] = _famObjects[i]
    const family = {gedKey: famKey, father: null, mother: null, marr: null, children: []}
    family.father = {key: fam.husb, person: null}
    family.mother = {key: fam.wife, person: null}

    const marrDate = fam.marr.date.length ? fam.marr.date[0] : ""
    const marrPlace = fam.marr.plac.length ? fam.marr.plac[0] : ""
    family.marr = {
        date: dateParser.eventDate(fam.marr.date[0]),
        placeIndex: placeIndex(marrPlace),
        event: null
    }

    family.children = []
    for(let i=0; i<fam.chil.length; i++) {
        family.children.push({key: fam.chil[i], person: null})
    }
    families.push(family)
}

// Write Genex _people file
const head = [`// auto-generated by ${progName} on ${new Date().toLocaleString()}`,
    `// from '${famFile}'.`,
    `// Each element is Genex Person object`,
    `import { Family } from '../../../genex/Family.js'`,
    `export const ${familyName} = [`]
let js = head.join('\n') + '\n'
for(let i=0; i<families.length; i++) {
    js += `    new Family(${JSON.stringify(families[i], null, 4)}),\n`
}
js += ']\n'
fs.writeFile(familyFile, js, function (err) { if (err) throw err })

console.log(`\n${progName}`)
console.log(`    1 - read ${_famObjects.length} [<GEDCOM FAM>] elements from '${famFile}'.`)
console.log(`    2 - wrote ${families.length} Genex Family objects into '${familyFile}'.`)
console.log(`    Successfully completed in ${new Date()-time1} msec`)
