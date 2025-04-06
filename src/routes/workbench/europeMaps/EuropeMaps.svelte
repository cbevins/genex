<script>
    import europe from '$lib/maps/Europe_topography_map.png'
    const mapWd = 1473
    const mapHt = 1198
    const ratio = 700 / mapWd
    const rw = ratio * mapWd
    const rh = Math.ceil(ratio * mapHt)
    const scale = 1
    const svgs = [
        {t: '1x Scale',
            w: rw, h: rh, vx: 0, vy: 0, vw: rw, vh: rh,
            ix: -100, iy: -300, iw: mapWd, ih: mapHt},
        {t: '2x Scale',
            w: rw, h: rh, vx: 0, vy: 0, vw: rw, vh: rh,
            ix: -120, iy: -300, iw: 2*rw, ih: 2*rh},
        {t: '3x Scale',
            w: rw, h: rh, vx: 0, vy: 0, vw: rw, vh: rh,
            ix: -300, iy: -500, iw: 3*rw, ih: 3*rh},
        {t: '4x Scale',
            w: rw, h: rh, vx: 0, vy: 0, vw: rw, vh: rh,
            ix: -500, iy: -1000, iw: 4*rw, ih: 4*rh},
        {t: 'Original Map',
            w: mapWd, h: mapHt, vx: 0, vy: 0, vw: mapWd, vh: mapHt,
            ix: -100, iy: -100, iw: mapWd, ih: mapHt},
    ]
</script>

{#each svgs as svg}
    <hr>
    <p>{svg.t}</p>
    <p>SVG {svg.w} x {svg.h}</p>
    <p>Image {svg.iw}x {svg.ih}h at [{svg.ix}, {svg.iy}]</p>
    <svg width={svg.w} height={svg.h} viewBox={`{svg.vx} {svg.vy} {svg.vw} {svg.vh}`}>
        <rect x="0" y="0" width={svg.w} height={svg.h} fill="blue"/>
        <image href={europe} x={svg.ix} y={svg.iy} width={svg.iw} height={svg.ih}/>
    </svg>
{/each}