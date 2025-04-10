/**
 * Returns the Gxml structure for an Bevins Origins Map <SVG> with width 700
 */
import {originsSvgGxml} from '../originsSvgGxml.js'
import image from '/src/lib/maps/google/Europe1.jpg'
export function dereussOriginsSvgGxml() {
    const imgWd = 997
    const imgHt = 870

    const dereuss = 'orange'

    // All Riley ancestor births outsid the USA
    const zuidHolland = {lineage: 'DeReuss', births: 93, genMin: 4, genMax: 15, birthMin: 1479, birthMax: 1839}
    const kronoberg ={lineage: 'Riley-Trombley-Nelson-Nelson',
        births: 14, genMin: 3, genMax: 6, birthMin: 1753, birthMax: 1876}
    const lowerQuebec = {lineage: 'BJRiley-DMTrombley-HRTrombley-FCyr',
        births: 7, genMin: 5, genMax: 6, birthMin: 1786, birthMax: 1835}
    const newBrunswick = {lineage: 'Trombley', births: 7, genMin: 3, genMax: 6, birthMin: 1780, birthMax: 1879}
    const montreal = {lineage: 'BJRiley-DMTrombley-HRTrombley-GTTrombley-EHFTrombley-HETTrobley',
        births: 12, genMin: 5, genMax: 7, birthMin: 1778, birthMax: 1837}
    const northumberland = {lineage: 'Riley-Robson', births: 10, genMin: 3, genMax: 6, birthMin: 1790, birthMax: 1874}
    const essex = {births: 1, genMin: 13, genMax: 13, birthMin: 1520, birthMax: 1520}
    const drenth = {lineage: 'Riley-DeReuss', births: 1, genMin: 14, genMax: 14, birthMin: 1503, birthMax: 1503}
    const nottinghamshire = {lineage: 'Riley-DeReuss-Poulson-Spray', births: 1, genMin: 6, genMax: 6, birthMin: 1760, birthMax: 1760}
    const randonnai = {lineage: 'Trombley', births: 1, genMin: 12, genMax: 12, birthMin: 1626, birthMax: 1626}

    const fc = "white"
    const ff = 'Eagle Lake'
    const fs = '16px'
    const fw = 'normal'
    const ta = 'middle'
    const r = 10
    const fill = 'magenta'
    const pTmp = {t: '', cx: 0, cy: 0, r, tx: 0, ty: 0, ta, fill, fc, ff, fs, fw}
    const tTmp = {x: 0, y: 0, ta, fc, ff, fs, fw}
    
    const places = [
        {...pTmp, t: 'Zuid-Holland', cx: 390, cy: 380, tx: 390, ty: 400, data: zuidHolland},
        {...pTmp, t: 'Kronoberg', cx: 610, cy: 150, tx: 610, ty: 175, data: kronoberg},
        {...pTmp, t: 'Northumberland', cx: 230, cy: 265, tx: 230, ty: 290, data: northumberland},
        {...pTmp, t: 'Randonnai', cx: 290, cy: 510, tx: 290, ty: 530, data: randonnai},
    ]
    const paths = [
    ]
    const texts = [
        {...tTmp, x: 350, y: 50, fs: '32px', t: 'DeReuss and Nelson Origins'},
    ]
    return originsSvgGxml(image, imgWd, imgHt, places, paths, texts)
}