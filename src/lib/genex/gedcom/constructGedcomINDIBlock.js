/**
 * 
 * @param {*} gedcomNestedRecords  Reference to the GedcomNestedRecords instance
 * @param {*} head Reference to the toplevel GedcomRecord
 * @return {gedcomKey, birt: [], deat: [], famc: [], fams: [], name: [], sex: []}
 */
export function constructGedcomINDIBlock(gedcomNestedRecords, head) {
    const [gedcomKey, indi] = head // 'indi' is an INDI GedcomRecord ref
    const data0 = indi.data() // {content, level, recNo, lines, parent, subs, type}
    // Block object holds array of each sub record of interest that is returned to caller
    const block = {gedcomKey, birt: [], deat: [], famc: [], fams: [], name: [], sex: []}
    // console.log(data0.level, data0.type, data0.content)

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
            block.birt.push(birth)
        } else if (data1.type === 'DEAT') {
            const death = {date: [], plac: []}
            for(let lvl2=0; lvl2<data1.subs.length; lvl2++) {
                const data2 = data1.subs[lvl2].data() // {content, level, recNo, lines, parent, subs, type}
                if (data2.type === 'DATE') death.date.push(data2.content)
                else if (data2.type === 'PLAC') death.plac.push(data2.content)
                // console.log('        ', data2.level, data2.type, data2.content)
            }
            block.deat.push(death)
        } else if (data1.type === 'FAMC') {
            block.famc.push(data1.content)
        } else if (data1.type === 'FAMS') {
            block.fams.push(data1.content)
        } else if (data1.type === 'NAME') {
            const name = {name: data1.content, givn: [], nsfx: [], surn: []}
            for(let lvl2=0; lvl2<data1.subs.length; lvl2++) {
                const data2 = data1.subs[lvl2].data() // {content, level, recNo, lines, parent, subs, type}
                if (data2.type === 'GIVN') name.givn.push(data2.content)
                else if (data2.type === 'NSFX') name.nsfx.push(data2.content)
                else if (data2.type === 'SURN') name.surn.push(data2.content)
                // console.log('        ', data2.level, data2.type, data2.content)
            }
            block.name.push(name)
        } else if (data1.type === 'NOTE') {
        } else if (data1.type === 'SEX') block.sex.push(data1.content)
    }
    return block
}

// NOTE : copy ALL multiple records to preferred file,
// and manually arrange them with preferred at index 0!!!
export function applyPreferredData(block, preferred) {
    const {gedcomKey, birt, deat, famc, fams, name, sex} = block
    // Apply any preferred NAME data for this Person
    if (preferred.has(block.gedcomKey+'-NAME')) {
        const [name, givn, surn, nsfx] = preferred.get(block.gedcomKey+'-NAME')
        block.name = [{name, givn: [givn], nsfx: [nsfx], surn: [surn]}]
    }
    // Apply any preferred BIRT data for this Person
    if (preferred.has(block.gedcomKey+'-BIRT')) {
        const [date,plac] = preferred.get(block.gedcomKey+'-BIRT')
        block.birt = [{date: [date], plac: [plac]}]
    }
    // Apply any preferred DEAT data for this Person
    if (preferred.has(block.gedcomKey+'-DEAT')) {
        const [date,plac] = preferred.get(block.gedcomKey+'-DEAT')
        block.deat = [{date: [date], plac: [plac]}]
    }
    // Apply any preferred SEX data for this Person
    if (preferred.has(block.gedcomKey+'-SEX')) {
        block.sex = [preferred.get(block.gedcomKey+'-SEX')]
    }
    // Apply any preferred FAMC data for this Person
    if (preferred.has(block.gedcomKey+'-FAMC')) {
        block.famc = [preferred.get(block.gedcomKey+'-FAMC')]
    }
    return block
}

export function block2Json(block) {
    const {gedcomKey, birt, deat, famc, fams, name, sex} = block
    const n = name[0]
    const b = birt.length ? birt[0] : {date: [''], plac: ['']}
    const d = deat.length ? deat[0] : {date: [''], plac: ['']}
    const s = sex.length ? sex[0] : 'U'
    const f = famc.length ? famc[0] : ''
    const fs = []
    for(let i=0; i<fams.length; i++) fs.push(`"${fams[i]}"`)
    const famsList = fs.join(', ')
    const ar = [
        `["${gedcomKey}", {`,
        `    name: {`,
        `        name: ${JSON.stringify(n.name)},`,
        `        givn: ${JSON.stringify(n.givn[0])},`,
        `        surn: ${JSON.stringify(n.surn[0])},`,
        `        nsfx: ${JSON.stringify(n.nsfx[0])},`,
        `    },`,
        `    sex: "${s}",`,
        `    birt: {date: ${JSON.stringify(b.date)}, plac: ${JSON.stringify(b.plac)}},`,
        `    deat: {date: ${JSON.stringify(d.date)}, plac: ${JSON.stringify(d.plac)}},`,
        `    famc: "${f}",`,
        `    fams: [${famsList}]`,
        `}],`,
    ]
    return ar
}

// Builds a JSON string of multiple records
export function checkMultipleRecords(block) {
    const mult = []
    // Checks for multiple <type> records
    function checkSimple(label, key, type, arr) {
        if (arr.length > 1) {
            mult.push(`// ${label} has ${arr.length} possible ${type} records (uncomment the preferred):`)
            for(let i=0; i<arr.length; i++) {
                mult.push(`${i?'//':'  '}    ["${key}-${type}", "${arr[i]}"], // ${i}`)
            }
        }
    }
    // Check for multiple <type> records with epected BIRT and/or DEAT sub records
    function checkDatePlace(label, key, type, arr) {
        if (arr.length > 1) {
            mult.push(`// ${label} has ${arr.length} possible ${type} DATE and/or PLAC records (uncomment the preferred):`)
            for(let i=0; i<arr.length; i++) {
                const {date, plac} = arr[i]
                mult.push(`${i?'//':'  '}    ["${key}-${type}", ["${date}", "${plac}"]], // ${i}`)
            }
        }
    }

    const {gedcomKey, birt, deat, famc, fams, name, sex} = block
    const label = name.length ? name[0].name : 'Unknown'
    // Check for multiple NAME blocks
    if (name.length > 1) {
        mult.push(`// ${label} has ${name.length} possible NAME record blocks (uncomment the preferred):`)
        for(let i=0; i<name.length; i++) {
            const n = name[i]
            mult.push(`${i?'//':'  '}    ["${gedcomKey}-NAME", ["${n.name}", "${n.givn}", "${n.surn}", "${n.nsfx}"]], // ${i}`)
        }
    }

    checkSimple(label, gedcomKey, 'SEX', sex)
    checkDatePlace(label, gedcomKey, 'BIRT', birt)
    checkDatePlace(label, gedcomKey, 'DEAT', birt)
    checkSimple(label, gedcomKey, 'FAMC', famc)
    return mult
}

export function fmtINDIBlock(block) {
    const {gedcomKey, birt, deat, famc, fams, name, sex} = block
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
