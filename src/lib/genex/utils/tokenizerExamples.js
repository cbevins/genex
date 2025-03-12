import { Tokenizer } from './Tokenizer.js'

const str = 'token1, "token2a, token2b token2c" {token3a token3b}'
function example0() {
    const t = new Tokenizer()
    const tokens =  t.tokenize(str)
    t.log('Tokenizer with seps() and blocks()', str)
}

function example1() {
    const t = new Tokenizer().addSep(' ').addSep(',')
    const tokens =  t.tokenize(str)
    t.log('Tokenizer with seps(space,comma) and blocks()', str)
}

function example2() {
    const t = new Tokenizer().addSep(' ').addSep(',').blockQuotes()
    const tokens =  t.tokenize(str)
    t.log('Tokenizer with seps(space,comma) and blocks(quotes)', str)
}

function example3() {
    const t = new Tokenizer().addSep(' ').addSep(',')
        .blockQuotes().blockBraces()
    const tokens =  t.tokenize(str)
    t.log('Tokenizer with seps(space,comma) and blocks(quotes,braces)', str)
}

function example4() {
    const t = new Tokenizer().addSep(' ').addSep(',')
        .blockQuotes(true).blockBraces(true)
    const tokens =  t.tokenize(str)
    t.log('Tokenizer with seps(space,comma) and blocks(quotesEnclosed,bracesEnclosed)', str)
}

console.log('\n\n----------------------------')
example0()
example1()
example2()
example3()
example4()