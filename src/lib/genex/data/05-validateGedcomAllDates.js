// Modules
import fs from 'fs'
import { parseRecord } from '../gedcom/parseRecord.js'
import { GedcomDateParser } from '../gedcom/GedcomDateParser.js'
// Data
import { _gedcomRecordsFiltered } from './generated/gedcom/_gedcomRecordsFiltered.js'
import { _gedcomRecordsAll } from './generated/gedcom/_gedcomRecordsAll.js'
import { _gedcomKnownDateQuals, _gedcomKnownDateMonths } from './customized/_gedcomKnownDateMonths.js'

const time1 = new Date()
const progName = (process.argv[1]).split('\\').pop()
const inputFile = './generated/gedcom/_gedcomRecordsAll.js'
const missingName = '_gedcomRecordsAllUnknownDATE'
const missingFile = `./diagnostics/gedcom/${missingName}.js`
const missing = []

const sample = [
    "",
    "1 DATE 1952",
    "1 DATE September 1952",
]
// let records = _gedcomRecordsAll
let records = _gedcomRecordsFiltered
// records = sample
const dp = new GedcomDateParser(_gedcomKnownDateQuals, _gedcomKnownDateMonths)
const badDates = []
const useCases = [0, 0, 0, 0, 0,   0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0]
let nDates = 0
for (let i=0; i<records.length; i++) {
    const record = parseRecord(records[i], i+1)
    if (record) {
        const [level, type, content] = record
        if (type === 'DATE') {
            nDates++
            const d = dp.parse(content)
            // console.log(i, content, d)
            useCases[d.useCase]++
            if (! d.useCase) {
                console.log(`Line ${i}: "${content}"`, d)
                badDates.push(d)
            }
        }
    }
}
console.log(useCases)
console.log(`\n${progName}  *** NOT YET IMPLEMENTED`)
console.log(`    1 - read ${_gedcomRecordsAll.length} [<GEDCOM record>] elements with ${nDates} DATE records from '${inputFile}'.`)
console.log(`    2 - wrote ${badDates.length} *UNKNOWN* date strings '${missingFile}'.`)
console.log(`    Successfully completed in ${new Date()-time1} msec`)
