/**
 * Returns the Gxml structure for an Bevins Origins Map <SVG> with width 700
 */
import {originsSvgGxml} from '../originsSvgGxml.js'
import image from '/src/lib/maps/google/GreatBrittain1.jpg'

const imgWd = 1143
const imgHt = 927

const ff = 'Eagle Lake'
const fs = '16px'
const fw = 'normal'
const ptmp = {t: '', cx: 0, cy: 0, r: 10, ta: 'middle', fill: 'magenta', ff, fs, fw}

const places = [
    {...ptmp, t: 'Newbold Verdon', cx: 510, cy: 320},
    {...ptmp, t: 'Brixham',        cx: 400, cy: 510},
]
const paths = [
    {stroke: "white", width: 4, fill: "none",
        d: 'M 400 510 A 175 175 0 0 0 510 320'}
]

export function bevinsOriginsSvgGxml() {
    return originsSvgGxml(image, imgWd, imgHt, places, paths)
}