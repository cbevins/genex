/**
 * The GedcomNestedRecords class stores GEDCOM records from a _gedcomRecords*.js
 * in a recursive (tree) data structure that is more readily searched by clients.
 * (The _gedcomRecords&.js files are generated from GEDCOM ASCII text files from Ancestry.com or RootsMagic).
 * 
 * GedcomNestedRecords holds GedcomRecords in a Map() object
 * whose key is the top level 0 record type ('FAM', 'INDI', '_PLAC', etc),
 * and whose entry is another Map() of all the key's toplevel GedcomRecords
 * with their nested GedcomRecord subrecords.
 */
import { GedcomRecord } from './GedcomRecord.js'

export class GedcomNestedRecords {
    constructor () {
        this._data = {
            current: null,    // reference to current
            maxLevel: 0,
            topLevel: new Map() // keys are Level 0 GEDCOM 'type', entries are a Map of GedcomRecord level 0 key-record
        }
    }

    // Called by constructGedcom() to add a new GedcomRecord to its collection
    // Returns reference to the *current* GedcomRecord
    _addRecord(recNo, level, type, content) {
        if (level === 0) {
            // Get (create if necessary) the GedcomRecord Map object for this record *type*
            if (! this.topLevel().has(type)) this.topLevel().set(type, new Map())
            const recMap = this.topLevel().get(type)
            // Create a new GedcomRecord with no parent
            const gedcomRecord = new GedcomRecord(recNo, level, type, content, null)
            // Add the new GedcomRecord to its record *type* Map object in the Gedcom
            recMap.set(content, gedcomRecord)
            // Make the new level 0 record the current record
            this._setCurrent(gedcomRecord)
        }
        // If 'CONC', simply append content to the current record
        else if (type === 'CONC') {
            this._current()._addContent(content)
        }
        // If 'CONT', append both a newline AND new content to the current record
        else if (type === 'CONT') {
            this._current()._addContent('/n' + content)
        }
        // else this is a new record
        else {
            // if necessary, move pointer upwards to record level's parent
            while(this._current().level() >= level) {
                this._setCurrent(this._current().parent())
            }
            // Create a new GedcomRecord
            const gedcomRecord = new GedcomRecord(recNo, level, type, content, this._current())
            // Add the new GedcomRecord to its parent record's *subs* array
            this._current()._addSub(gedcomRecord)
            // Update the current record reference
            this._setCurrent(gedcomRecord)
        }
        if (level > this._data.maxLevel) this._data.maxLevel = level
        return this._current()
    }

    _current() { return this._data.current }

    _setCurrent(gedcomRecord) { this._data.current = gedcomRecord }
    
    // Returns reference to the Level 0 GedcomRecord with *key*
    findHead(type, key) {
        // The top level type must exist
        if (! this.topLevel().has(type)) return null
        const recMap = this.topLevel().get(type)
        // The record key for this top level context[0] must exist
        if (! recMap.has(key)) return null
        return recMap.get(key)
    }

    topLevel() { return this._data.topLevel }

    // Returns array of [type0, count] arrays of all Level 0 record types
    topLevelCounts() {
        const data = []
        for(const [type0, typeMap] of this.topLevel().entries()) {
            data.push([type0, typeMap.size])
        }
        return data
    }

    topLevelMap() { return this._data.topLevel }

    topLevelRecordsFor(key) {
        return this.topLevel().get(key)
    }
}