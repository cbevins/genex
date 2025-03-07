export class Tokenizer {
    constructor() {
        const quote = 34
        const apost = 39
        
        this.seps = [' ', ',']
        this.open = [String.fromCharCode(quote), String.fromCharCode(apost)]
        this.close = [String.fromCharCode(quote), String.fromCharCode(apost)]
    }
    
    applyBrackets() { return this.applyDelims('[', ']') }
    
    applyBraces() { return this.applyDelims('{', '}') }

    applyDelims(open, close) {
        this.open.push(open)
        this.close.push(close)
        return this
    }

    applyParens() { return this.applyDelims('(', ')') }

    applySep(sep) {
        this.seps.push(sep)
        return this
    }

    applySlashes() { return this.applyDelims('/', '/') }

    tokenize(str, debug=false) {
        if (! str) return []
        let inQuotes = false
        let open = ''
        let close = ''
        let inToken = false
        let token = ''
        const tokens = []
        for(let i=0; i<str.length; i++) {
            const chr = str[i]
            let info = `Chr[${i}] = '${chr}'`
            if (inQuotes) {
                info += ' inQuotes'
                if (this.close.includes(chr)) {
                    tokens.push(token)
                    token = ''
                    inQuotes = false
                    inToken = false
                } else {
                    token += chr
                }
            } else if (inToken) {
                info += ' inToken'
                if (this.seps.includes(chr)) {
                    info += ' separator'
                    tokens.push(token)
                    token = ''
                    inToken = false
                } else {
                    info += ' notSeperator'
                    token += chr
                }
            } else {
                info += ' search'
                if (this.seps.includes(chr)) {
                    info += ' isSep'
                    // ignore it
                } else if (this.open.includes(chr)) {
                    info += ' isOpen'
                    open = chr
                    inQuotes = true
                } else {
                    info += ' isToken'
                    token = chr
                    inToken = true
                }
            }
            if (debug) console.log(info)
        }
        if (token != '') tokens.push(token)
        return tokens
    }
}

function example() {
    const str = 'token0 \"token1\" token2 (parenToken3, parenToken4),  ,, ,, ,,   '
    + '[bracketToken5, bracketToken6], {braceToken7, braceToken8}, /slashToken9, /slashToken10'
    const t = new Tokenizer()
    console.log('quote and apostrophe delims\n', t.tokenize(str))
    
    t.applyParens()
    console.log('applyParen()\n',t.tokenize(str))
        
    t.applyBrackets()
    console.log('applyBrackets()\n',t.tokenize(str))
        
    t.applyBraces()
    console.log('applyBraces()\n', t.tokenize(str))
        
    t.applySlashes()
    console.log('applySlashes()\n', t.tokenize(str))
}
// example()