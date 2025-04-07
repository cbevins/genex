/**
 * Returns the Gxml structure for an <SVG> with width 700
 * @param {object} image Background image (usually some map)
 * @param {number} imgWd Background image native width
 * @param {number} imgHt Background image native height
 * @param {array} places Array of objects defining location-label elements:
 * {t, cx, cy, r, ta, fill, ff, fs, fw}
 * @param {array} paths Array of objects for defining <path> elements like
 * {stroke, width, fill, d}
 * @returns 
 */
export function originsSvgGxml(image, imgWd, imgHt, places=[], paths=[]) {
    // fit image onto 7" wide page
    const ratio = 700 / imgWd
    const rw = ratio * imgWd
    const rh = Math.ceil(ratio * imgHt)

    const gxml = {el: 'svg', x: 0, y: 0, width: rw, height: rh, els: [
        {el: 'defs', els: [
            {el: 'style', els: [
                {el: 'inner',
                    content: '@import url("https://fonts.googleapis.com/css?family=Eagle Lake:400,400i,700,700i")'}
            ]},
            {el: 'marker', id: "arrow", viewBox: "0 0 10 10", refX: 5, refY: 5,
                markerWidth: 6, markerHeight: 6, orient: "auto", els: [
                {el: 'path', d: "M 0 0 L 10 5 L 0 10 z", stroke: "context-stroke", fill: "context-fill"},
            ]}
        ]},
        {el: 'rect', x: 0, y: 0, width: rw, height: rh, fill: 'blue'},
        {el: 'image', href: image, x: 0, y: 0, width: rw, height: rh},
    ]}
    
    for(let i=0; i<places.length; i++) {
        const {t, cx, cy, r, ta, fill, ff, fs, fw} = places[i]
        gxml.els.push({el: 'circle', cx, cy, r, fill})
        gxml.els.push({el: 'text', x: cx, y: cy,
            'text-anchor': ta, 'font-family': ff, 'font-weight': fw, 'font-size': fs, 
            els: [{el: 'inner', content: t}]
        })
    }

    for(let i=0; i<paths.length; i++) {
        const {stroke, width, fill, d} = paths[i]
        gxml.els.push({el: 'path', stroke, 'stroke-width': width, fill, d})
    }
    return gxml
}