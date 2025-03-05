/**
 * Line number, lines, command type and level, content, and subcommands
 * for a single GEDCOM file line.
 */
export class GedcomRecord {
    constructor(lineNo, level, type, content='', parent=null) {
        this._data = {
            content: content,
            level: level,
            lineNo: lineNo,
            lines: 1,   // total lines for this record, including 'CONT' and 'CONC'
            parent: parent,
            subs: [],
            type: type
        }
    }

    // Called only by GedcomRecords
    addContent(content) {
        this._data.content += content
        this._data.lines++
    }

    // Adds a nested GedcomRecord to *this* parent
    addSub(gedcomRecord) {
        this._data.subs.push(gedcomRecord)
        return this
    }

    // Returns the content, which may be a (possibly empty) string or an array of strings
    content() { return this._data.content }

    // Returns this record's type-chain context as an array
    context() {
        let ctx = []
        let curr = this
        while (curr) {
            ctx.push(curr.type())
            curr = curr.parent()
        }
        return ctx.reverse()
    }

    isTopLevel() { return this.level() === 0 }

    // Returns the record's nesting level with 0 being the top level command
    level() { return this._data.level }

    // Returns the original GEDCOM file line number
    lineNo() { return this._data.lineNo }

    // Returns total number of lines for this record (including 'CONC' and 'CONT')
    lines() { return this._data.lines }

    // Returns array of strings indented by level
    listBlock(block=null, spaces=2) {
        if (! block) block = []
        let pad = ' '.padStart(this.level()*spaces)
        let str = `${pad} ${this.lineNo()}: ${this.level()} ${this.type()} ${this.content()}`
        block.push(str)
        for(let i=0; i<this.subs().length; i++) {
            const rec = this.sub(i)
            rec.listBlock(block)
        }
        return block
    }

    // Returns a reference to this record's parent record, or NULL if its a top-level
    parent() { return this._data.parent }

    // Returns the nested GedcomRecord at index i
    sub(i) { return this._data.subs[i] }

    // Returns array of nested GedcomRecords
    subs() { return this._data.subs }

    // Returns the original command field, like 'INDI' or 'FAM'
    type() { return this._data.type }
}