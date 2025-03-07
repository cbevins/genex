// Modules
import fs from 'fs'
// Data
import { _gedcomINDI } from './generated/gedcom/_gedcomINDI.js'
import { _gedcomFAM } from './generated/gedcom/_gedcomFAM.js'

const time1 = new Date()
const progName = (process.argv[1]).split('\\').pop()
const famName = '_gedcomFAM'
const famFile = `./generated/gedcom/${famName}.js`
const indiName = '_gedcomINDI'
const indiFile = `./generated/gedcom/${indiName}.js`

function addName(part, full) {
    if (part.length) {
        if (full.length) full += ' '
        full += part
    }
    return full
}

for(let i=0; i<_gedcomINDI.length; i++) {
    const [indiKey, indi] = _gedcomINDI[i]
    const name = {first: '', middle: '', last: '', nick: '', suffix: '', prefix: '', file: '', full: ''}
    if(indi.name.givn) {
        const given = indi.name.givn.split(' ')
        // console.log(indi.name.givn, given.length, given)
        const mids = []
        for (let j=0; j<given.length; j++) {
            const str = (given[j]).trim()
            // Check for nick names
            const nick = (str[0] === '"' || str[0] === "'" || str[0] === '(')
            if (nick) name.nick = str
            else if (j === 0) name.first = str
            else mids.push(str)
        }
        name.middle = mids.join('')
    }
    if(indi.name.surn) {
        name.last = indi.name.surn.trim()
    }
    // Parse out the suffix!!!
    if (indi.name.nsfx) {
        name.suffix = indi.name.nsfx.trim()
        let idx = name.suffix.search("#")
        // if (idx >= 0) ? (name.suffix.slice(0, idx-1)) : this.nameSuffix()
    }

    name.full = addName(name.first, name.full)
    name.full = addName(name.middle, name.full)
    name.full = addName(name.nick, name.full)
    name.full = addName(name.last, name.full)
    name.full = addName(name.suffix, name.full)
    if (name.nick !== '') console.log(`${name.full} nick named [${name.nick}]`)
}

console.log(`\n${progName}`)
console.log(`    1 - read ${_gedcomINDI.length} [<GEDCOM INDI>] elements from '${indiFile}'.`)
console.log(`    2 - read ${_gedcomFAM.length} [<GEDCOM FAM>] elements from '${famFile}'.`)
console.log(`    3 - didn't do anything else yet.`)
console.log(`    Successfully completed in ${new Date()-time1} msec`)
