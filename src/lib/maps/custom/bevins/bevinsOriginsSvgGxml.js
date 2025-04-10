/**
 * Returns the Gxml structure for an Bevins Origins Map <SVG> with width 700
 */
import {originsSvgGxml} from '../originsSvgGxml.js'
import image from '/src/lib/maps/google/GreatBrittain1.jpg'

const imgWd = 1143
const imgHt = 927

// ALl Bevins ancestor births outside of the USA
// births in COR, DEV, DOR, SOM
const brixham = {lineage: 'Bevins', births: 34, genMin: 3, genMax: 12, birthMin: 1585, birthMax: 1848}

// births in LEI, NOR, NTT, WAR
const newbold = {lineage: 'Bevins', births: 31, genMin: 3, genMax: 13, birthMin: 1565, birthMax: 1843}
// Scottish lowlands: RFW
const scotland = {lineage: 'Collins', births: 14, genMin: 8, genMax: 14, birthMin: 1565, birthMax: 1724}
const akershus = {lineage: '???', births: 14, genMin: 4, genMax: 7, birthMin: 1759, birthMax: 1843}
// births in Baden-Württemberg, Hessen, RP, and Alsace
const rhinelandPalatinate = {lineage: '???', births: 10, genMin: 5, genMax: 10, birthMin: 1643, birthMax: 1832}
const london = {lineage: '???', births: 9, genMin: 5, genMax: 13, birthMin: 1590, birthMax: 1788}
// NIR-ARM, NIR-DOW, IRL-DON, IRL-MOG
const nir = {lineage: '???', births: 9, genMin: 5, genMax: 12, birthMin: 1632, birthMax: 1808}
// ALSO Riley-Trombly
const durham = {lineage: 'Bevins-???', births: 7, genMin: 5, genMax: 7, birthMin: 1745, birthMax: 1799}
// YKS, ERY
const yorkshire = {lineage: 'Bevins-???', births: 5, genMin: 11, genMax: 14, birthMin: 1560, birthMax: 1638}
// CAM, KEN, SFX, SXE
const seCoast = {lineage: 'Bevins-???', births: 5, genMin: 11, genMax: 13, birthMin: 1578, birthMax: 1620}
// Welsh Marches: CHS, SAL, WAR
const cheshire = {lineage: 'Bevins-???', births: 5, genMin: 9, genMax: 13, birthMin: 1581, birthMax: 1692}
const cork = { lineage: 'Bevins-???', births: 4, genMin: 7, genMax: 8, birthMin: 1733, birthMax: 1755}
// "Edward Synge 1753"
const dublin = {lineage: 'Bevins-Heddens-Nattrass', births: 1, genMin: 6, genMax: 6, birthMin: 1753, birthMax: 1753}
// "Alfred Caleb Nattrass 1844", "Harriet Lucretia Sing 1844"
// ["CAN-ON", "Ontario, Canada", 2, 4, 4, 1844, 1844],
// "Mary Dexter 1805"
// ["CAN-QC-Gaspesie", "Gaspesie-Iles-de-la-Madeleine, Quebec", 1, 5, 5, 1805, 1805, [

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
    {...pTmp, t: 'Brixham',        cx: 400, cy: 510, tx: 400, ty: 540, data: brixham},
    {...pTmp, t: 'Newbold Verdon', cx: 510, cy: 320, tx: 510, ty: 310, data: newbold},
]
const paths = [
    {stroke: "white", width: 4, fill: "none",
        d: 'M 400 510 A 175 175 0 0 0 510 320'},
]
const text = [
    {...tTmp, x: 350, y: 50, fs: '32px', t: 'Bevins Origins'},
]
export function bevinsOriginsSvgGxml() {
    return originsSvgGxml(image, imgWd, imgHt, places, paths, text)
}