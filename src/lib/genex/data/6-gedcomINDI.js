/**
 * Collects INDI info into a JSON object for subsequent diagnostics and processing.
 * This allows checking for multiple/conflicting birth, death, sex, and name info.
 */
import fs from 'fs'
import {_gedcomRecordsFiltered } from './generated/gedcom/_gedcomRecordsFiltered.js'
import {_gedcomPreferredData } from './customized/_gedcomPreferredData.js'
import { constructGedcom } from '../gedcom/constructGedcom.js'

const samuelBevins = '@I292505359674@'
const williamLongfordBevins = '@I292505366205@'

const time1 = new Date()
const progName = (process.argv[1]).split('\\').pop()
const inputFile = './generated/gedcom/_gedcomRecordsFiltered.js'
const varName = '_gedcomINDI'
const outputFile = `./generated/gedcom/${varName}.js`

let nName = 0
let nBirt = 0
let nDeat = 0
let nFamc = 0

// Use a Gedcom instance since it handles all parsing, CONC, and CONT
const gedcom = constructGedcom(_gedcomRecordsFiltered)
const indiMap = gedcom.topLevelRecordsFor('INDI')
const indiArray = Array.from(indiMap.entries())

for(let lvl0=0; lvl0<indiArray.length; lvl0++) {
    const [gedcomKey, indi] = indiArray[lvl0] // 'indi' is an INDI GedcomRecord ref
    const data0 = indi.data() // {content, level, recNo, lines, parent, subs, type}
    // console.log(data0.level, data0.type, data0.content)
    // Person object holds array of each sub record of interest
    const person = {gedcomKey, birt: [], deat: [], famc: [], fams: [], name: [], sex: []}
    for(let lvl1=0; lvl1<data0.subs.length; lvl1++) {
        const data1 = data0.subs[lvl1].data() // {content, level, recNo, lines, parent, subs, type}
        // console.log('    ', data1.level, data1.type, data1.content)
        if (data1.type === 'BIRT') {
            const birth = {date: [], plac: []}
            for(let lvl2=0; lvl2<data1.subs.length; lvl2++) {
                const data2 = data1.subs[lvl2].data() // {content, level, recNo, lines, parent, subs, type}
                if (data2.type === 'DATE') birth.date.push(data2.content)
                else if (data2.type === 'PLAC') birth.plac.push(data2.content)
                // console.log('        ', data2.level, data2.type, data2.content)
            }
            person.birt.push(birth)
        } else if (data1.type === 'DEAT') {
            const death = {date: [], plac: []}
            for(let lvl2=0; lvl2<data1.subs.length; lvl2++) {
                const data2 = data1.subs[lvl2].data() // {content, level, recNo, lines, parent, subs, type}
                if (data2.type === 'DATE') death.date.push(data2.content)
                else if (data2.type === 'PLAC') death.plac.push(data2.content)
                // console.log('        ', data2.level, data2.type, data2.content)
            }
            person.deat.push(death)
        } else if (data1.type === 'FAMC') {
            person.famc.push(data1.content)
        } else if (data1.type === 'FAMS') {
            person.fams.push(data1.content)
        } else if (data1.type === 'NAME') {
            const name = {name: data1.content, givn: [], nsfx: [], surn: []}
            for(let lvl2=0; lvl2<data1.subs.length; lvl2++) {
                const data2 = data1.subs[lvl2].data() // {content, level, recNo, lines, parent, subs, type}
                if (data2.type === 'GIVN') name.givn.push(data2.content)
                else if (data2.type === 'NSFX') name.nsfx.push(data2.content)
                else if (data2.type === 'SURN') name.surn.push(data2.content)
                // console.log('        ', data2.level, data2.type, data2.content)
            }
            person.name.push(name)
        } else if (data1.type === 'NOTE') {
        } else if (data1.type === 'SEX') person.sex.push(data1.content)
    }
    // Apply any customized preferences
    applyPreferredData(person, _gedcomPreferredData)
    // Checks for multiple BIRT, DEAT, SEX records
    checkDataConflicts(person)
    if (gedcomKey === samuelBevins) {
        console.log(samuelBevins)
        console.log(fmtPerson(person))
    }
}

// NOTE : copy ALL multiple records to preferred file,
// and manually arrange them with preferred at index 0!!!
function applyPreferredData(person, preferred) {
    // Apply any preferred NAME data for this Person
    if (preferred.has(person.gedcomKey+'-NAME')) {
        const [name, givn, surn, nsfx] = preferred.get(person.gedcomKey+'-NAME')
        person.name = [{name, givn: [givn], nsfx: [nsfx], surn: [surn]}]
    }
    // Apply any preferred BIRT data for this Person
    if (preferred.has(person.gedcomKey+'-BIRT')) {
        const [date,plac] = preferred.get(person.gedcomKey+'-BIRT')
        person.birt = [{date: [date], plac: [plac]}]
    }
    // Apply any preferred DEAT data for this Person
    if (preferred.has(person.gedcomKey+'-DEAT')) {
        const [date,plac] = preferred.get(person.gedcomKey+'-DEAT')
        person.deat = [{date: [date], plac: [plac]}]
    }
    // Apply any preferred SEX data for this Person
    if (preferred.has(person.gedcomKey+'-SEX')) {
        person.sex = [preferred.get(person.gedcomKey+'-SEX')]
    }
    // Apply any preferred FAMC data for this Person
    if (preferred.has(person.gedcomKey+'-FAMC')) {
        person.famc = [preferred.get(person.gedcomKey+'-FAMC')]
    }
}

function checkDataConflicts(person) {
    // Check for multiple BIRT
    const {gedcomKey, birt, deat, famc, fams, name, sex} = person
    if (birt.length > 1) {
        console.log(`// ${++nBirt}: ${name[0].name} has ${birt.length} possible birth dates and/or places:`)
        for(let i=0; i<birt.length; i++) {
            const {date, plac} = birt[i]
            console.log(`    ["${gedcomKey}-BIRT", ["${date}", "${plac}"]],`)
        }
    }
    // Check for multiple DEAT
    if (deat.length > 1) {
        console.log(`\n// ${++nDeat}: ${name[0].name} has ${deat.length} possible death dates and/or places:`)
        for(let i=0; i<deat.length; i++) {
            const {date, plac} = deat[i]
            console.log(`    ["${gedcomKey}-DEAT", ["${date}", "${plac}"]],`)
        }
    }
    // Check for multiple SEX
    if (sex.length > 1) {
        console.log(`\n// ${name[0].name} has ${sex.length} possible SEX records:`)
        for(let i=0; i<sex.length; i++) {
            console.log(`    ["${gedcomKey}-SEX", "${sex[i]}"],`)
        }
    }
    // Check for multiple FAMC
    if (famc.length > 1) {
        console.log(`\n// ${++nFamc}: ${name[0].name} has ${famc.length} possible FAMC records:`)
        for(let i=0; i<famc.length; i++) {
            console.log(`    ["${gedcomKey}-FAMC", "${famc[i]}"],`)
        }
    }
    // Check for multiple NAME blocks
    if (name.length > 1) {
        console.log(`\n// ${++nName}: ${name[0].name} has ${name.length} possible NAME blocks:`)
        for(let i=0; i<name.length; i++) {
            const n = name[i]
            console.log(`    ["${gedcomKey}-NAME", ["${n.name}", "${n.givn}", "${n.surn}", "${n.nsfx}"]],`)
        }
    }
}

function fmtPerson(person) {
    const {gedcomKey, birt, deat, famc, fams, name, sex} = person
    let ar = []
    ar.push(`gedcomKey: ${gedcomKey}`)
    ar.push(`NAME (${name.length})`)
    for(let i=0; i<name.length; i++) {
        ar.push(`     NAME ${name[i].name}`)
        ar.push(`     GIVN ${name[i].givn}`)
        ar.push(`     SURN ${name[i].surn}`)
        ar.push(`     NSFX ${name[i].nsfx}`)
    }
    ar.push(`SEX  (${sex.length})`)
    for(let i=0; i<sex.length; i++) {
        ar.push(`     ${sex[i]}`)
    }
    ar.push(`BIRT (${birt.length})`)
    for(let i=0; i<birt.length; i++) {
        ar.push(`     DATE ${birt[i].date}`)
        ar.push(`     PLAC ${birt[i].plac}`)
    }
    ar.push(`DEAT (${deat.length})`)
    for(let i=0; i<deat.length; i++) {
        ar.push(`     DATE ${deat[i].date}`)
        ar.push(`     PLAC ${deat[i].plac}`)
    }
    ar.push(`FAMC (${famc.length})`)
    for(let i=0; i<famc.length; i++) {
        ar.push(`     ${famc[i]}`)
    }
    ar.push(`FAMS (${fams.length})`)
    for(let i=0; i<fams.length; i++) {
        ar.push(`     ${fams[i]}`)
    }
    return ar.join('\n')
}

const time2 = new Date()
console.log( `${progName} (${time2-time1} msec)`)
