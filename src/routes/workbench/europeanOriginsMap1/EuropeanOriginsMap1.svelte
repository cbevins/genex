<script>
    import europe from '$lib/maps/Europe_topography_map.png'
    import { _bevinsEuropeanTopoMapLocations as bevins} from './_bevinsEuropeanTopoMapLocations'
    import { _rileyEuropeanTopoMapLocations as riley} from './_rileyEuropeanTopoMapLocations'
    
    // European Topo Map dimensions scaled to 700x950 page size
    const mapWd = 1473
    const mapHt = 1198
    const ratio = 700 / mapWd
    const rw = ratio * mapWd
    const rh = Math.ceil(ratio * mapHt)
    const svg = {w: rw, h: rh, vx: 0, vy: 0, vw: rw, vh: rh,
        ix: -100, iy: -300, iw: mapWd, ih: mapHt}
    const all = bevins.concat(riley)
</script>

<svg width={svg.w} height={svg.h} viewBox={`{svg.vx} {svg.vy} {svg.vw} {svg.vh}`}
        font-size="16px" font-family="Eagle Lake" font-weight="lighter"
        fill="black" stroke="black" text-anchor="middle">
    <defs>
        <style>
            @import url("https://fonts.googleapis.com/css?family=Eagle Lake:400,400i,700,700i");
        </style>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
            markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" stroke="context-stroke" fill="context-fill"/>
        </marker>
    </defs>

    <rect x="0" y="0" width={svg.w} height={svg.h} fill="blue"/>
    <image href={europe} x={svg.ix} y={svg.iy} width={svg.iw} height={svg.ih}/>

    {#each all as [label, loc, lat, lon, cx, cy, fill, ancestors, genMin, genMax, birthMin, birthMax]}
        {#if cx}
            <circle cx={cx} cy={cy} r="12" fill={fill} opacity="0.5"/>
            <text x={cx} y={cy+5} text-anchor="middle">{ancestors}</text>
            <text x={cx+12} y={cy+5} text-anchor="start">{label}</text>
        {/if}
    {/each}
</svg>
