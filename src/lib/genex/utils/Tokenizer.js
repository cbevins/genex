export class Tokenizer {
    constructor() {
        const quote = 34
        const apost = 39
        
        this._data = {
            seps: [' ', ','],
            open: [],    // [String.fromCharCode(quote), String.fromCharCode(apost)]
            close: [], // [String.fromCharCode(quote), String.fromCharCode(apost)]
            delims: [],  // filled by tokenize()
            tokens: [],  // filled by tokenize()
        }
    }

    addDelims(open, close) {
        this._data.open.push(open)
        this._data.close.push(close)
        return this
    }

    addSep(sep) {
        this._seps.push(sep)
        return this
    }

    data() { return this._data }

    delimApostrophe() { return this.addDelims("'", "'") }

    delimBrackets() { return this.addDelims('[', ']') }
    
    delimBraces() { return this.addDelims('{', '}') }

    delimParens() { return this.addDelims('(', ')') }

    delimQuotes() { return this.addDelims('"', '"') }

    delimSlashes() { return this.addDelims('/', '/') }

    delim(idx) { return this._data.delims[idx] }

    // Returns array of opening delimiters matching each token
    delims() { return this._data.delims }

    token(idx) { return this._data.tokens[idx] }
    
    tokens() { return this._data.tokens }

    _closer(opener) {
        for (let i=0; i<this._data.open.length; i++) {
            if (opener === this._data.open[i])
                return this._data.close[i]
        }
    }

    tokenize(str) {
        if (! str) return []
        // Data
        const tokens = []
        const delims = []
        let currentToken = ''
        // States
        let inDelim = ''       // holds delim opening char
        let inToken = false
        let closer = ''         // holds delim closing char
    
        function store() {
            
        }

        for(let i=0; i<str.length; i++) {
            const chr = str[i]
            if (inDelim) {
                if (chr === closer) {
                // if (this._data.close.includes(chr)) {
                    tokens.push(currentToken)
                    delims.push(inDelim)
                    currentToken = ''
                    inDelim = false
                    inToken = false
                } else {
                    currentToken += chr    // add chr to current token
                }
            } else if (inToken) {
                if (this._data.seps.includes(chr)) {
                    tokens.push(currentToken)
                    delims.push(inDelim)   // pushes an empty char
                    currentToken = ''
                    inToken = false
                } else {
                    currentToken += chr
                }
            } else {
                if (this._data.seps.includes(chr)) {
                    // ignore it
                } else if (this._data.open.includes(chr)) {
                    inDelim = chr // save opening chr
                    closer = this._closer(inDelim)
                    console.log(`Closer for ${chr} is ${closer}`)
                } else {
                    currentToken = chr
                    inToken = true
                }
            }
            // if (debug) console.log(info)
        }
        if (currentToken != '') {
            tokens.push(currentToken)
            delims.push(inDelim)
        }
        this._data.tokens = tokens
        this._data.delims = delims
        return tokens
    }

    log(label) {
        let str = `${label}:\n`
        for(let i=0; i<this._data.tokens.length; i++) {
            str += `    [${this._data.delims[i]}]  [${this._data.tokens[i]}]\n`
        }
        console.log(str)
    }
}

function example() {
    const str = 'token0 \"quoteToken1a quoteToken1b\" token2 (parenToken3, parenToken4),  ,, ,, ,,   '
    + '[bracketToken5, bracketToken6], {braceToken7, braceToken8}, /slashToken9, /slashToken10'
    + ' *starBangToken11 (starBangToken12)! lastToken'
    const t = new Tokenizer()
    console.log('No Delims\n', t.tokenize(str))

    t.delimQuotes()
    console.log('delimQuotes()\n',t.tokenize(str))

    t.delimApostrophe()
    console.log('delimApostrophe()\n',t.tokenize(str))
    
    t.delimParens()
    console.log('delimParen()\n',t.tokenize(str))
        
    t.delimBrackets()
    console.log('delimBrackets()\n',t.tokenize(str))
        
    t.delimBraces()
    console.log('delimBraces()\n', t.tokenize(str))
        
    t.delimSlashes()
    console.log('delimSlashes()\n', t.tokenize(str))

    t.addDelims('*', '!').tokenize(str)
    t.log(`9: delim('*!')`)
}
example()