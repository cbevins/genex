export class Tokenizer {
    constructor() {
        this._data = {
            // A block is a token that may contain separator chars
            // Blocks are set of by an opening char and a closing char
            blocks: [{open: null, close: null, enclose: false}],
            delimsAreSep: false,
            seps: [],   // array of chars that separate tokens and blocks
        }
        this._results = {
            delims: [], // matching array of token [open, close] chars
            tokens: [], // array of parsed tokens
        }
    }
    
    addBlock(open, close, enclose=false) {
        this._data.blocks.push({open, close, enclose})
        return this
    }
    blockApostrophe(enclose=false) { return this.addBlock("'", "'", enclose) }
    blockBraces(enclose=false) { return this.addBlock('{', '}', enclose) }
    blockBrackets(enclose=false) { return this.addBlock('[', ']', enclose) }
    blockParens(enclose=false) { return this.addBlock('(', ')', enclose) }
    blockQuotes(enclose=false) { return this.addBlock('"', '"', enclose) }
    blockSlashes(enclose=false) { return this.addBlock('/', '/', enclose) }

    addSep(sep) {
        this._data.seps.push(sep)
        return this
    }

    data() { return this._data }

    // Returns the {open, close, enclose} for block at idx
    block(idx) { return this._data.blocks[idx] }

    delims() { return this._results.delims }

    tokens() { return this._results.tokens }

    tokenize(str) {
        if (! str) return []
        // Results
        const delims = []
        const tokens = []
        let currentToken = ''

        // Create an array of block opening chars
        // and a Map() of block open char => index
        const openers = []
        const closers = new Map()
        for(let i=0; i<this._data.blocks.length; i++) {
            const block = this._data.blocks[i]
            // console.log('block', i, block)
            openers.push(block.open)
            closers.set(block.open, i)
        }

        // Make these class props  available to local functions
        const blocks = this._data.blocks
        const delimsAreSep = this._data.delimsAreSep
        const seps = this._data.seps

        // States
        let inBlock = 0         // index of current Block (0===none)
        let inToken = false
        let opener = ''
        let closer = ''         // closing char of the current block
        let enclose = false

        function isCloser(chr) { return chr === closer }

        function isOpener(chr) {
            return openers.includes(chr)
            // console.log(`chr [${chr}] in`, openers, ` is ${result}`)
            // return result
        }

        function isSeparator(chr) {
            if (delimsAreSep && isOpener(chr)) return true
            return seps.includes(chr)
        }

        function startBlock(chr) {
            inBlock = closers.get(chr)
            opener = chr
            closer = blocks[inBlock].close
            enclose = blocks[inBlock].enclose
        }

        function storeToken() {
            if (inBlock && enclose)
                currentToken = opener + currentToken + closer
            tokens.push(currentToken)
            delims.push(inBlock)        // block index
            currentToken = ''
            inBlock = 0
            inToken = false
        }

        // Examine each char in the str
        for(let i=0; i<str.length; i++) {
            const chr = str[i]
            let info = `Chr [${chr}]`
            if (inBlock) {
                info += ' state:inBlock'
                if (isCloser(chr)) {
                    info += ' char:isCloser'
                    storeToken()
                    info += ' stored'
                } else {
                    info += ' char:isToken'
                    currentToken += chr
                    info += ' appended'
                }
            } else if (inToken) {
                info += ' state:inToken'
                if (isSeparator(chr)) { // separators may include block openers
                    info += ' char:isSeparator'
                    storeToken()
                    info += ' stored'
                    if (isOpener(chr)) {
                        info += ' char:isOpener'
                        startBlock(chr)
                        info += ' startBlock'
                    }
                } else {
                    info += ' char:isToken'
                    currentToken += chr
                    info += ' appended'
                }
            } else {                    // not in a token or a block
                info += ' state:searching'
                if (isOpener(chr)) {    // start a new block
                    info += ' char:isOpener'
                    startBlock(chr)
                    info += ' startBlock'
                } else if (isSeparator(chr)) {
                    info += ' char:isSeparator'
                    // ignore 
                } else {                // start a new token
                    info += ' char:isToken'
                    inToken = true
                    currentToken += chr
                    info += ' appended'
                }
            }
            // console.log(info)
        }
        // Handle any trailing token
        if (currentToken) storeToken()
        // Store
        this._results.delims = delims
        this._results.tokens = tokens
        return tokens
    }

    log(label, str) {
        const {delims, tokens} = this._results
        let s = `${label} parses the string:\n${str}\n`
            + `into ${tokens.length} tokens:\n`
        for(let i=0; i<tokens.length; i++) {
            let b = this._data.blocks[delims[i]].open
            b =  b ? b : ' '
            s += `    [${b}]  [${tokens[i]}]\n`
        }
        console.log(s)
    }

    results() { return this._data.results }
}
