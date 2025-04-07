<script>
    import map from '$lib/maps/google/Europe1.jpg'

    const mapWd = 997
    const mapHt = 870
    const ratio = 700 / mapWd
    const rw = ratio * mapWd
    const rh = Math.ceil(ratio * mapHt)
    const scale = 1
    const svgs = [
        {t: '1x Scale',
            w: rw, h: rh, vx: 0, vy: 0, vw: rw, vh: rh,
            ix: 0, iy: 0, iw: rw, ih: rh},
        {t: 'Original Map',
            w: mapWd, h: mapHt, vx: 0, vy: 0, vw: mapWd, vh: mapHt,
            ix: 0, iy: 0, iw: mapWd, ih: mapHt},
    ]
</script>

{#each svgs as svg}
    <hr>
    <p>{svg.t}</p>
    <p>SVG {svg.w} x {svg.h}</p>
    <p>Image {svg.iw}x {svg.ih}h at [{svg.ix}, {svg.iy}]</p>
    <svg width={svg.w} height={svg.h} viewBox={`{svg.vx} {svg.vy} {svg.vw} {svg.vh}`}>
        <rect x="0" y="0" width={svg.w} height={svg.h} fill="blue"/>
        <image href={map} x={svg.ix} y={svg.iy} width={svg.iw} height={svg.ih}/>
    </svg>
{/each}