import { Gedcom } from './Gedcom.js'
import { parseLine } from './parseLine.js'

// Creates a Gedcom instance from a _gedcomRecords... array
export function constructGedcom(_gedcomData) {
    const gedcom = new Gedcom()
    for(let i=0; i<_gedcomData.length; i++) {
        const lineNo = i + 1
        const data = parseLine(_gedcomData[i], lineNo)
        if (data) {
            const [level, type, content] = data
            gedcom._addLine(lineNo, level, type, content)
        }
    }
    return gedcom
}
