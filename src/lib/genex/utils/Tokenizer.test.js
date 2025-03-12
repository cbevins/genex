import { expect, test } from 'vitest'
import { Tokenizer } from './Tokenizer.js'

test('Constructor works', () => {
    const t = new Tokenizer()
    expect(t).not.to.equal(null)
    expect(t._data.delimsAreSep).to.equal(false)
})

test('tokenize() with no separators', () => {
    const t = new Tokenizer()
    const str1 = 'token1 token2,token3 ,token4   ,  ,,, token5'
    const result =  [str1]
    let tokens = t.tokenize(str1)
    expect(tokens).toHaveLength(result.length)
    expect(tokens).toContain(str1)
    expect(tokens).toEqual(expect.arrayContaining(result))
})


test('tokenize() with quotes block delimieters', () => {
    const str = 'token1, "token2a, token2b token2c" "{token3a token3b}", "token4"'
    const result = ['token1', 'token2a, token2b token2c', "{token3a token3b}", "token4"]
    const t = new Tokenizer().addSep(' ').addSep(',').blockQuotes()
    let tokens = t.tokenize(str)
    expect(tokens).toHaveLength(result.length)
    expect(tokens).toContain('token1')
    expect(tokens).toContain('token2a, token2b token2c')
    expect(tokens).toContain('{token3a token3b}')
    expect(tokens).toContain('token4')
    expect(tokens).toEqual(expect.arrayContaining(result))
})

test('tokenize() GEDCOM NAME parser: empty', () => {
    const t = new Tokenizer().addSep(' ').addSep(',')
    const str = ''
    const result = []
    let tokens = t.tokenize(str)
    expect(tokens).toHaveLength(0)
})
test('tokenize() GEDCOM NAME parser: empty', () => {
    const t = new Tokenizer().addSep(' ').addSep(',')
    const str = ' '
    const result = []
    let tokens = t.tokenize(str)
    expect(tokens).toHaveLength(0)
})
