import { Tokenizer } from '../utils/Tokenizer.js'

export class GedcomNameParser {
    constructor(knownPrefixes = []) {
        const givnTokenizer = new Tokenizer().addSep(' ').addSep(',').addSep('.')
            .blockQuotes().blockParens()
        const nsfxTokenizer = new Tokenizer().addSep(' ').addSep(',').addSep('.')
            .blockQuotes(true).blockParens(true)
        const surnTokenizer = new Tokenizer().addSep(' ').addSep(',').addSep('.')
            .blockQuotes().blockParens().blockApostrophe()
        this._data = {
            givnTokenizer,
            knownPrefixes: new Map(knownPrefixes),
            nsfxTokenizer,
            surnTokenizer,
        }
    }

    parse(nameStr, givnStr, surnStr, nsfxStr) {
        const obj = {name: nameStr,
            ...this.parseGivn(givnStr),
            ...this.parseSurn(surnStr),
            ...this.parseNsfx(nsfxStr)}
        return obj
    }

    parseGivn(str) {
        const name = {prefixes: [], first: '', middle: [], nicks: []}
        const tokenizer = this._data.givnTokenizer
        const tokens = tokenizer.tokenize(str)
        const delims = tokenizer.delims()
        // Remove all know leading prefixes
        while(this._data.knownPrefixes.has(tokens[0])) {
            const token = tokens.shift()
            delims.shift()
            const prefix = this._data.knownPrefixes.get(token)
            name.prefixes.push(token)
            // console.log(`Prefix "${prefix}"`)
        }
        // Separate remaining given names into middle and nick
        while(tokens.length) {
            const token = tokens.shift()
            const delim = delims.shift()
            if (delim) {
                name.nicks.push(token)
            } else {
                name.middle.push(token)
            }
        }
        // Shift first 'middle' name into first
        if (name.middle.length) name.first = name.middle.shift()
        return name
    }

    parseSurn(str) {
        const name = {last: [], others: [] }
        const tokenizer = this._data.surnTokenizer
        const tokens = tokenizer.tokenize(str)
        const delims = tokenizer.delims()
        while(tokens.length) {
            const token = tokens.shift()
            const delim = delims.shift()
            if (delim) {
                name.others.push(token)
            } else {
                name.last.push(token)
            }
        }
        return name
    }

    parseNsfx(str) {
        const name = {suffixes: [], file: null }
        const tokenizer = this._data.nsfxTokenizer
        const tokens = tokenizer.tokenize(str)
        const delims = tokenizer.delims()
        while(tokens.length) {
            const token = tokens.shift()
            const delim = delims.shift()
            const block = tokenizer.block(delim)
            if (delim && token[1] === "#") {
                name.file = token.slice(1, token.length-1)
            } else {
                name.suffixes.push(token)
            }
        }
        return name
    }
}
