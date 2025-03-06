/**
 * Line number, lines, command type and level, content, and subcommands
 * for a single GEDCOM file line.
 */
export class GedcomRecord {
    constructor(recNo, level, type, content='', parent=null) {
        this._data = {
            content,
            level,
            recNo,      // Record number (base 1) in the input GEDCOM file
            lines: 1,   // total lines for this record, including 'CONT' and 'CONC'
            parent,     // reference to the parent GedcomRecord (or NULL if at head)
            subs: [],   // array of sub GedcomRecords
            type        // 'INDI', 'FAM', 'BIRT', 'DATE', 'PLAC', etc
        }
    }

    //--------------------------------------------------------------------------
    // Client data access methods   
    //--------------------------------------------------------------------------

    content() { return this._data.content }
    data() { return this._data }
    level() { return this._data.level }
    lines() { return this._data.lines }
    parent() { return this._data.parent }
    recNo() { return this._data.recNo }
    subs() { return this._data.subs }
    type() { return this._data.type }

    //--------------------------------------------------------------------------
    // Client convenience methods
    //--------------------------------------------------------------------------

    // Returns this record's type-chain context as an array of 'type'
    context() {
        let ctx = []
        let curr = this
        while (curr) {
            ctx.push(curr.type())
            curr = curr.parent()
        }
        return ctx.reverse()
    }

    // Returns TRUE if *this* is a toplevel (head) object
    isTopLevel() { return this._data.level === 0 }

    // Returns array of strings indented by level
    listBlock(block=null, spaces=2) {
        const data = this._data
        if (! block) block = []
        let pad = ' '.padStart(data.level*spaces)
        let str = `${pad} ${data.recNo}: ${data.level} ${data.type} ${data.content}`
        block.push(str)
        for(let i=0; i<data.subs.length; i++) {
            const rec = data.subs[i]
            rec.listBlock(block)
        }
        return block
    }

    //--------------------------------------------------------------------------
    // Private methods used by Gedcom.constructor() and construtGedcom()
    //--------------------------------------------------------------------------
    
    // Adds a nested GedcomRecord to *this* parent
    _addContent(content) {
        this._data.content += content
        this._data.lines++
    }

    // Called only by Gedcom._addRecord() when it encounters a 'CONC' or 'CONT' record
    _addSub(gedcomRecord) {
        this._data.subs.push(gedcomRecord)
        return this
    }

}