<script>
    import usaEastTopo from './UsaEastTopo.svg'
    import paper from '$lib/maps/scrolls/brown-papyrus-paper.jpg'
    import scroll from '$lib/maps/SimpleMaps/scroll1.png'
    
    const places = [
        {x: 530, y: 265, r: 10, tx: 530, ty: 290, t: ['1845', 'Newark,', 'Essex, NJ']},
        {x: 360, y: 280, r: 10, tx: 360, ty: 310, t: ['1848', 'Townsend,', 'Huron, OH']},
        {x: 225, y: 280, r: 10, tx: 225, ty: 310, t: ['1855', 'Annawan,', 'Henry, IL']},
        {x: 140, y: 170, r: 10, tx:  90, ty: 160, t: ['1909', 'Wadena', 'Wadena, MN']},
        {x: 155, y: 150, r: 10, tx: 155, ty: 100, t: ['1920', 'Deer River,', 'Itasca, MN']},
    ]

    const routes = [
        // William Longford Bevins - Mary Bolt - William Alfred Bevins
        {stroke: 'blue', points: "700,200 530,265 525,205 445,205 425,210 420,230 360,280 225,280"},
        // Samuel Bevins
        {stroke: 'green', points: "225,280 140,170 155,150"},
        // Mary Ann White, unknown husband Bevins, Mary Allace Bevins
        {stroke: 'white', points: "700,220 530,265 225,280"}
    ]

    const legend = {x: 0, y: 210, width: 170, height: 240,
        fontSize: '11px', lineLead: 12, items: [
        {color: 'blue', y: 35, lines: [ 'Migration Route of:',
            '2nd GGP Wm Longford Bevins',
            '2nd GGP Mary Bolt',
            '1st GGP Wm Alfred Bevins']},
        {color: 'white', y: 110, lines: [ 'Migration Route of:',
            '1st GGP Mary Ann White',
            'unknown husband Bevins',
            'Grand Aunt Mary Allace White'
        ]},
        {color: 'green', y: 180, lines: [ 'Migration Route of:', 'Grand Father Samuel Bevins']}
    ]}
</script>

<svg width="700" height="500" viewBox="0 0 700 400"
    font-size="14px" font-family="serif" font-style="normal"
    fill="black" stroke="black" text-anchor="middle">

    <!-- Background images -->
    <rect x="0" y="0" width="700" height="950" fill="blue"/>
    <image href={usaEastTopo} x="0" y="0" width="1180" height="731"/>

    <!-- Places -->
    {#each places as p}
        <circle cx={p.x} cy={p.y} r={p.r} stroke="magenta" fill="magenta" opacity="0.5"/>
        {#each p.t as label, i }
            <text x={p.tx} y={p.ty+i*16}>{label}</text>
        {/each}
    {/each}

    <!-- Routes -->
    {#each routes as r}
        <polyline fill="none" stroke-width="4" opacity="0.75"
            stroke={r.stroke} points={r.points}/>
    {/each}

    <svg x={legend.x} y={legend.y} width={legend.width} height={legend.height}>
        <image href={scroll} x="0" y="0" width={legend.width}/>
        {#each legend.items as item, i}
            <rect stroke="black" fill={item.color} stroke-width="1"
                x="20" y={item.y} width={legend.width-40} height="5"/>
            {#each item.lines as line, j}
                <text x={legend.width/2} y={item.y + 5 + (j+1)*legend.lineLead}
                    font-size={legend.fontSize}>{line}</text>
            {/each}
        {/each}
    </svg>
</svg>
