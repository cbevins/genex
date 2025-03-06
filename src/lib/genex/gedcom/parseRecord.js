/**
 * Parses a raw ASCII GEDCOM file record into 'level', 'type', and 'content'
 * @param {*} record GEDCOM file ASCII record
 * @param {*} recNo GEDCOM record line number 
 * @returns [level, type, content]
 */
export function parseRecord(record, recNo) {
    let fields = record.split(' ')
    if (!fields.length || fields[0] === '') return null
    for(let i=0; i<fields.length; i++) fields[i] = fields[i].trim()
        
    // First field must be a level integer (base 0)
    const level = Number(fields[0])
    let type
    let content
    // If the second field is a @A123@ style GEDCOM key field ...
    if (fields[1][0] === '@') {
        // ... there must be a third field with the GedcomRecord *type* (like 'INDI' or 'FAM')
        if (fields.length < 3) {
            const msg = `GEDCOM record ${recNo} has a key field '${fields[1]}' but no 'type' field.`
            console.log('FATAL ERROR', msg)
            throw new Error(msg)
        }
        content = fields[1]
        type = fields[2]
    }
    // otherwise the second field is the GedcomRecord 'type' and the remaining fields are the 'content'
    else {
        type = fields[1]
        content = fields.length > 2 ? fields[2] : ''
        // concatenate all remaining fields as the 'content'
        for(let i=3; i<fields.length; i++) content += ' ' + fields[i]
    }
    return [level, type, content]
}
