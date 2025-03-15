import fs from 'fs'
import { Channels } from '../genex/Channels.js'
import { Genex } from '../genex/Genex.js'

const time1 = new Date()
const progName = (process.argv[1]).split('\\').pop()
const outputName = '_lineageResults'
const outputFile = `./diagnostics/genex/${outputName}.js`

const genex = new Genex()
const cdb = genex.person('Collin Douglas Bevins 1952')
const wlb = genex.person("William Longford Bevins 1815")
const wab = genex.person("William Alfred Bevins 1843")
const bjr = genex.person("Barbara Jeanne Riley 1953")

const lineage = new Channels(cdb)
const persons = lineage.persons()
console.log('Lineage persons array length', persons.length)
console.log(persons[4].label())

console.log(`\n${progName}`)
console.log(`    1 - created Genex with ${genex.people().length} Person and ${genex.family().length} Family instances.`)
// console.log(`    2 - wrote ${items} Genex Auditor items for ${findings.length} Persons into '${auditFile}'.`)
console.log(`    Successfully completed in ${new Date()-time1} msec`)
