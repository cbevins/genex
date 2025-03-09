import { expect, test } from 'vitest'
import { Tokenizer2 } from './Tokenizer2.js'

const str1 = 'token1 token2,token3 ,token4   ,  ,,, token5'
const str2 = 'token1, "token2a, token2b token2c" {token3a token3b}'

test('Constructor works', () => {
    const t = new Tokenizer2()
    expect(t).not.to.equal(null)
    expect(t._data.delimsAreSep).to.equal(false)
})

test('tokenize() with no separators', () => {
    const t = new Tokenizer2()
    const result =  [str1]
    let tokens = t.tokenize(str1)
    expect(tokens).toHaveLength(result.length)
    expect(tokens).toContain(str1)
    expect(tokens).toEqual(expect.arrayContaining(result))
})

test('tokenize() with space and comma separators', () => {
    const t = new Tokenizer2().addSep(' ').addSep(',')
    const result = ['token1', 'token2', 'token3', 'token4', 'token5']
    let tokens = t.tokenize(str1)
    expect(tokens).toHaveLength(result.length)
    expect(tokens).toContain('token1')
    expect(tokens).toContain('token2')
    expect(tokens).toContain('token3')
    expect(tokens).toContain('token4')
    expect(tokens).toContain('token5')
    expect(tokens).toEqual(expect.arrayContaining(result))
})

test('tokenize() with quotes block delimieters', () => {
    const t = new Tokenizer2().addSep(' ').addSep(',').blockQuotes()
    const result = ['token1', 'token2a, token2b token2c', '{token3a token3b}']
    let tokens = t.tokenize(str1)
    expect(tokens).toHaveLength(result.length)
    expect(tokens).toContain('token1')
    expect(tokens).toContain('token2a token2b token2c')
    expect(tokens).toContain('{token3a token3b}')
    expect(tokens).toEqual(expect.arrayContaining(result))
})