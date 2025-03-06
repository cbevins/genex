import { GedcomNestedRecords } from './GedcomNestedRecords.js'
import { parseRecord } from './parseRecord.js'

// Creates a Gedcom instance from a _gedcomRecords* array.
export function constructGedcomNestedRecords(_gedcomRecords) {
    const gedcom = new GedcomNestedRecords()
    for(let i=0; i<_gedcomRecords.length; i++) {
        const recNo = i + 1
        const data = parseRecord(_gedcomRecords[i], recNo)
        if (data) {
            const [level, type, content] = data
            gedcom._addRecord(recNo, level, type, content)
        }
    }
    return gedcom
}
