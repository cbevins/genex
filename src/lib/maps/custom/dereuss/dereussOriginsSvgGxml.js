/**
 * Returns the Gxml structure for an Bevins Origins Map <SVG> with width 700
 */
import {originsSvgGxml} from '../originsSvgGxml.js'
import image from '/src/lib/maps/google/Europe1.jpg'

const imgWd = 997
const imgHt = 870

const ff = 'Eagle Lake'
const fs = '16px'
const fw = 'normal'
const ptmp = {t: '', cx: 0, cy: 0, r: 10, ta: 'start', fill: 'magenta', ff, fs, fw}

const places = [
    {...ptmp, t: 'Kronoberg', cx: 610, cy: 150},
    {...ptmp, t: 'Zuid-Holland', cx: 390, cy: 380},
]
const paths = [
]

export function dereussOriginsSvgGxml() {
    return originsSvgGxml(image, imgWd, imgHt, places, paths)
}