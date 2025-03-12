import fs from 'fs'
import { parseRecord } from '../gedcom/parseRecord.js'
import { _gedcomRecordsAll } from './generated/gedcom/_gedcomRecordsAll.js'

const time1 = new Date()
const progName = (process.argv[1]).split('\\').pop()
const inputFile = './generated/gedcom/_gedcomRecordsAll.js'
const missingName = '_gedcomRecordsAllUnknownDATE'
const missingFile = `./diagnostics/gedcom/${missingName}.js`
const missing = []

console.log(`\n${progName}  *** NOT YET IMPLEMENTED`)
// console.log(`    1 - read ${_gedcomRecordsAll.length} [<GEDCOM record>] elements from '${inputFile}'.`)
// console.log(`    2 - wrote ${missing.length} *UNKNOWN* [GEDCOM PLAC content>, <GEDCOM PLAC record index>] elements into '${missingFile}'.`)
console.log(`    Successfully completed in ${new Date()-time1} msec`)
