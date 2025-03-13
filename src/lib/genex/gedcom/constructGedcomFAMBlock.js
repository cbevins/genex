/**
 * 
 * @param {*} gedcomNestedRecords  Reference to the GedcomNestedRecords instance
 * @param {*} head Reference to the toplevel GedcomRecord
 * @return {gedcomKey, child: [], husb: [], marr: [], wife: []}
 */
export function constructGedcomFAMBlock(gedcomNestedRecords, head) {
    const [gedcomKey, gedcomRec] = head // 'fam' is an FAM GedcomRecord ref
    const data0 = gedcomRec.data() // {content, level, recNo, lines, parent, subs, type}
    // Block object holds array of each sub record of interest that is returned to caller
    const block = {gedcomKey, chil: [], husb: [], marr: [], wife: []}
    
    for(let lvl1=0; lvl1<data0.subs.length; lvl1++) {
        const data1 = data0.subs[lvl1].data() // {content, level, recNo, lines, parent, subs, type}
        // console.log('    ', data1.level, data1.type, data1.content)
        if (data1.type === 'HUSB') {
            block.husb.push(data1.content)
        } else if (data1.type === 'WIFE') {
            block.wife.push(data1.content)
        } else if (data1.type === 'CHIL') {
            block.chil.push(data1.content)
        } else if (data1.type === 'MARR') {
            const marr = {date: [], plac: []}
            for(let lvl2=0; lvl2<data1.subs.length; lvl2++) {
                const data2 = data1.subs[lvl2].data() // {content, level, recNo, lines, parent, subs, type}
                if (data2.type === 'DATE') marr.date.push(data2.content)
                else if (data2.type === 'PLAC') marr.plac.push(data2.content)
                // console.log('        ', data2.level, data2.type, data2.content)
            }
            block.marr.push(marr)
        }
    }
    return block
}

export function applyPreferredData(block, preferred) {
    return block
}

export function block2Json(block) {
    const {gedcomKey, chil, husb, marr, wife} = block
    const h = husb.length ? husb[0] : ''
    const w = wife.length ? wife[0] : ''
    const m = marr.length ? marr[0] : {date: [''], plac: ['']}
    const c = []
    for(let i=0; i<chil.length; i++) c.push(`"${chil[i]}"`)
    const chilList = c.join(', ')
    const ar = [
        `["${gedcomKey}", {`,
        `    husb: "${h}",`,
        `    wife: "${w}",`,
        `    marr: {date: ${JSON.stringify(m.date)}, plac: ${JSON.stringify(m.plac)}},`,
        `    chil: [${chilList}]`,
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
    
    const {gedcomKey, chil, husb, marr, wife} = block
    const label = gedcomKey
    checkSimple(label, gedcomKey, 'HUSB', husb)
    checkSimple(label, gedcomKey, 'WIFE', wife)
    checkDatePlace(label, gedcomKey, 'MARR', marr)
    return mult
}
