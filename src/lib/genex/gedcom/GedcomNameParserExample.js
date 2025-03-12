import { GedcomNameParser } from './GedcomNameParser.js'

const knowPrefixes = ['Sir', 'Capt']
const nameStr = 'Francis Rupert Alfred /BURTON/'
const givnStr = 'Capt Sir Francis "Wild Bill" Rupert (Muhammed) Alfred'
const surnStr = 'Burton-Smyth (The Dark)'
const nsfxStr = 'Sr (2) (#BH1234)'

const gnp = new GedcomNameParser(knowPrefixes)
const names = gnp.parse(nameStr, givnStr, surnStr, nsfxStr)
console.log(names)
