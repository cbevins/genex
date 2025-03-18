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

function log(person) {
    let lin = person.lineage()
    const lines = [
        `label: '${person.label()}'`,
        `    tree: '${lin.tree}', gen: ${lin.gen}, seq: ${lin.seq}, ancestors: ${lin.ancestors}, file: '${lin.file}'`,
        `    mother: ${lin.mother ? lin.mother.label() : 'Unknown'}`,
        `    father: ${lin.father ? lin.father.label() : 'Unknown'}`,
        `    child: ${lin.child ? lin.child.label() : '<isRoot>'}`]
    console.log(lines.join('\n'))
}

// Add Lineages for Bevins-Heddens and Riley-Trombley to each Person
const lineageCdb = new Channels(cdb)
genex.addLineage(lineageCdb, 'Bevins-Heddens', 'BH')

const lineageBjr = new Channels(bjr)
genex.addLineage(lineageBjr, 'Riley-Trombley', 'RT')

// Make sure it worked...
log(wlb)
log(bjr)

console.log(`\n${progName}`)
console.log(`    1 - created Genex with ${genex.people().length} Person and ${genex.family().length} Family instances.`)
// console.log(`    2 - wrote ${items} Genex Auditor items for ${findings.length} Persons into '${auditFile}'.`)
console.log(`    Successfully completed in ${new Date()-time1} msec`)
