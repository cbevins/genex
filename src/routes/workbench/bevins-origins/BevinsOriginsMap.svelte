<script>
    import gb from '$lib/maps/SimpleMaps/gb.svg'
    import scroll from '$lib/maps/SimpleMaps/scroll1.png'
    import water from '$lib/maps/SimpleMaps/water-pattern.svg'
    import { _vicinityBrixham } from './_vicinityBrixham.js'
    import { _vicinityNewboldVerdon } from './_vicinityNewboldVerdon.js'

    const home = {fill: 'orange', stroke: 'yellow', r: 10}
    const city = {fill: 'yellow', stroke: 'yellow', r: 5}

    const gpp = ['sib', 'par', 'gp', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th']
    const newbold = []
    for(let i=0; i<_vicinityNewboldVerdon.length; i++) {
        const [nameKey, gen, born, died] = _vicinityNewboldVerdon[i]
        newbold.push(`${gpp[gen]} GGP ${nameKey}-${died}`)
    }
    const brixham = []
    for(let i=0; i<_vicinityBrixham.length; i++) {
        const [nameKey, gen, born, died] = _vicinityBrixham[i]
        brixham.push(`${gpp[gen]} GGP ${nameKey}-${died}`)
    }
</script>

<svg width="700" height="950" viewBox="300 0 700 1000"
    font-size="16px" font-family="Eagle Lake" font-weight="lighter"
    fill="black" stroke="black" text-anchor="middle"
>
    <defs>
        <style>
            @import url("https://fonts.googleapis.com/css?family=Eagle Lake:400,400i,700,700i");
        </style>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
            markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" stroke="context-stroke" fill="context-fill"/>
        </marker>
    </defs>

    <rect x="0" y="0" width="1000" height="1000" fill="blue" opacity="0.5"/>

    <!-- Admin map of England -->
    <image href={gb}/>
    <path d="M743.3 725.1l0.1 1.4 0.8 0.6 0.1 0.6-0.9 2.6 0.5 0.9 0 1 1.4 0.3 0.7 1.4 0.8 2.5 0.7 0.7 0.6 3 0.6 1.6-1.4 1.1-2.2 1.3-2.6-0.2-1 0.8 0 1.6 0.2 1.1-0.1 1.4 0 2.7 0.1 1.9 0.6 2.4 1.1 2.5 1 1.5 0.6 0.5-0.2 0.2-1.3 0.4-1.3-0.6-2 0.3-1.4-0.5-0.4 0.3-1 2.4 1 0.9-0.6 1.2-0.6 0-1.9-1.1-1.2-0.2-3.3 1.5-0.2 0.2 0.2 0.4 0.5 0.3-1.1 2.3-2.6-1.7-1.5 1.6-1.1 2-1.4-0.3-1.2-2.6-1.3-0.8-2.5-4.1-4.8-2.6-0.4-1-0.6-0.7-3.6-1.6-1.1-1.4-1.3-0.5 0.1-1.6-0.7-1.6 1-0.6 0.1-0.9-2.1-2.7-0.2-0.7 2.3-1.6 0.2-0.6-0.6-1.5 0.1-1 0.4-0.3 2.7 0.1 1-0.3 0.2-0.2-0.1-0.8 1.1-1.4 1.5-0.5 0.4-1.3 0.9-1.6-0.1-0.3 1.5-1.4 1.7-1 1.8 0.1-0.2 3.3 0.4 1.5 1.6 1.6 1.7 0.5 1.1-1.1 1.5-0.4 1.6-1.3 1.4-0.3 0.8 0.6 3.4-0.3 0.3-0.3 0.2-1 1.1-0.7 1-1.2-0.2-0.8 0.2-0.2 1.3-0.4 2.2-2 1.3-2.8 0.1-0.9 1.3-1.3 1.2-0.3z m-16.7 30.7l2.7-2.4 0.4-2.1-0.7-1.9-2.3-0.6-1.8 0-1 1.3 0 1.6 0.6 3.3 2.1 0.8z"
        id="GBLEC" name="Leicestershire" fill="red">
    </path>
    <path d="M641.1 887.5l1.2 1 1.5 0.2 0.4 0.7-3 1.9 0.6 0.7-0.8 2.1 0.2 0.6-0.8 0.2-1.7 1.1-1.1 0.1-1.7-0.5-0.6 0.2-1 0.9-0.3 0.1-0.8 0.7-0.4 0.2-0.5-0.1-0.9-0.4-0.5-0.1-0.9 0.2-1.6 0.7-1.9 0.5-0.6 0.7-0.4 1-0.7 1-3.4 1.5-1-0.1-0.8-0.2-0.7-0.6-0.5-1.1-0.6-1.8-0.2-0.3-0.2-0.1-0.1-0.1-0.1-0.2-0.3 0-0.1 0.1-0.1 0.4 0 0.3 0.6 0.7 0.7 2.5 0.4 1-0.9 0.8-0.7 1-0.7 1.3-0.6 1.5-0.5 2 0 0.9-0.2 0-1 0-1.3 0-1.3 0-1.1 0.7-0.9 1.2-0.6 1.4-0.2 1.2-0.1 1.1 0.6 0.9 0.7 1 1.3 0.5 1.4 0.9 1.7 0.7 0.4 0.1-0.1 0.1-0.3 1.9-0.6 0.4-0.7-0.3-0.8-0.6-0.3 1.6-1 0.6-1.1 0.3-0.4 0.7-0.3 1.3-0.5 1.5-0.2 1.7 0.3 1.9-0.7 0.3-1.9 0.6-0.8 0.1-1-0.3-0.9-0.4-0.7-0.1-0.7 0.8-1.7-1.6-2.8-3.4-3-2.9-0.6-0.2-0.4 0.1-1.2 0.7-0.4 0.2-0.3 0.1-0.6 0.7-0.4 0.2-0.5-0.1-0.5-0.3-0.8-0.6 0.1-0.3 0.2-0.7-1-0.3-1.1-0.8-0.3-0.8 0.7-0.9 1.1-0.4 1.1-0.6 0.7-0.3 0.1-0.5 0-0.4-0.2-0.7-0.9-0.7-1-0.7-1.1-0.7-0.9-0.5-0.7 0-0.7 0-0.7 0.6-0.7 0 0 0.1-0.1 0 0.1-0.4 0.6-1 0.5-1.1-0.9 0.5-0.5-0.1-0.5-0.4-0.1 0.6-0.5-1-0.5 0.1-0.3 0.5-0.3-0.4 0.3-0.6 0.5-1 0.1-0.8 1.3 0 0.4-0.3 0-0.6-1-0.4-0.3-1-0.3-0.5-2.6-0.7-0.1-1.6-0.5-1.2-0.8-0.5 0.2-2.8-1.8-1.3-0.5-2.6-0.7-1.1-0.1-2-0.7-1.6 0.1-1.7-0.9-0.4-0.5 0.8-0.3-0.1-1.3-1.4-1.5-0.1-0.6-0.4 0.2-0.4 1.4-0.6 0.4-1.2 0.1-1.9 0.8-0.5 0.2-0.5-1.2-2.7-0.5-0.8-0.2-1.4-4.2-0.2 0.2-1.2 0.4-0.6 0.6-1.9-0.2-0.5-0.1-1.1-0.1-1 0.3-0.5 4.1 0 0.5 0.2 1 0.7 0.5 0.2 2.7 0.3 1-0.3 0.7-0.5 3.1-3.6 0.3-0.4 0.2-0.5 0.3-0.4 0.5-0.3-0.3-0.7-0.6-2-0.1-0.6-0.1-0.4-0.8-1.2-0.4-0.7 1.6 0.2 0.4-0.2 0.3-0.8-0.1-0.8-0.4-0.6-0.5-0.4 0-0.4 3.6-1.5 8.5-0.8 1.8-0.6 0.9-0.2 3.4 0 1-0.2 1.5-0.8 0.8-0.1 2.7 0.7-0.1 0.5 0 0.1-0.3 0.7 0.2 1.2-0.4 2-2.1 0.4-2.4-0.3-0.3 0.4 0.1 2.2 0.6 1 1.8 1.3 1.1 0.3 1.6 1.8 1.8 0.1 2 1.5 1.8-0.1 0.4 0.6-0.3 1.2-0.6 1.1 0.4 0.9 3.3 0.4 0.5-0.5 0.1-0.9 0.4-0.4 1.5-0.4 1.4 0.8 1.1-0.3 1 0.8 0.9 0.1 0.3 0.7 0.2 2 2.3 0.2 2.5 2.3 2.2 0.3 3-0.4-1 2.6 1.5 1.3 2.6-0.8 2 0.1 0.2 0.5-0.2 1.6 1 0.7-0.2 1.2 1.3-0.7 0.5 0.3 0.7-0.2 0.7 0.7 0.7 2.1z m-80.5-26.9l0.1 0.5 0 0.9-0.3 0.4-0.4-0.5 0-1.1 0.1-0.9 0.3-0.1 0.2 0.5 0 0.3z"
        id="GBDEV" name="Devon" fill="red">
    </path>

    <circle class="Newbold Verdon" cx="730" cy="747.7" id="GBLEC"
        fill={home.fill} stroke={home.stroke}  r={home.r}/>
    <line x1="730" y1="747.7" x2="780" y2="747.7" stroke="black"/>
    <text x="780" y="747.7" text-anchor="start" font-size="20px">Newbold Verdon</text>

    <circle class="Brixham" cx="610" cy="912" id="GBBRX"
        fill={home.fill} stroke={home.stroke} r={home.r}/>
    <line x1="610" y1="912" x2="650" y2="940" stroke="black"/>
    <text x="750" y="960" text-anchor="end" font-size="20px">Brixham</text>
    
    <circle class="Torbay" cx="610.8" cy="914.8" id="GBTOB"/>

    <circle class="Plymouth" cx="585.8" cy="918.5" id="GBPLY"
        fill={city.fill} stroke={city.stroke} r={city.r}/>
    <line x1="585.8" y1="918.5" x2="580" y2="950" stroke="black"/>
    <text x="580" y="960" text-anchor="end">Plymouth</text>

    <circle class="London City" cx="775" cy="835.5" id="GBLND"
        fill={city.fill} stroke={city.stroke} r={city.r}/>
    <line x1="775" y1="835.5" x2="840" y2="830" stroke="black"/>
    <text x="841" y="835" text-anchor="start">London</text>

    <circle class="Liverpool" cx="640.9" cy="688" id="GBLIV"
        fill={city.fill} stroke={city.stroke} r={city.r}/>
    <line x1="640.9" y1="688" x2="590" y2="670" stroke="black"/>
    <text x="590" y="670">Liverpool</text>

    <text x="465" y="590">Northern</text>
    <text x="465" y="610">Ireland</text>
    <text x="630" y="400">Scotland</text>

    <!-- Newbold Verdon Scroll -->
    <svg x="680" y="100" width="320" height="600">
        <image href={scroll} y="160" width="320"/>
        <image href={scroll} width="320"/>
        <text x="160" y="42" font-size="20px">The Bevins of</text>
        <text x="160" y="65" font-size="20px">Newbold Verdon</text>
        <text x="160" y="85" font-size="16px">Leicestershire, England</text>
        <line x1="120" y1="95" x2="180" y2="95" stroke="black"/>
        <text x="160" y="115" font-size="16px">25 Great Grand Parents</text>
        <text x="160" y="135" font-size="16px">7 Generations Born 1665-1843</text>
        <line x1="120" y1="145" x2="180" y2="145" stroke="black"/>
        {#each newbold as line, i}
            <text x="160" y={165+i*16} font-size="12">{line}</text>
        {/each}
    </svg>

    <!-- Brixham Verdon Scroll -->
    <svg x="280" y="100" width="320" height="550">
        <image href={scroll} y="120" width="320"/>
        <image href={scroll} width="320"/>
        <text x="160" y="50" font-size="20px">The White-Decent</text>
        <text x="160" y="70" font-size="20px">Lineage of Brixham</text>
        <text x="160" y="90" font-size="16px">Devon, England</text>
        <line x1="120" y1="100" x2="180" y2="100" stroke="black"/>
        <text x="160" y="120" font-size="16px">23 Great Grand Parents</text>
        <text x="160" y="140" font-size="16px">8 Generations Born 1676-1848</text>
        <line x1="120" y1="145" x2="180" y2="145" stroke="black"/>
        {#each brixham as line, i}
            <text x="160" y={165+i*16} font-size="12">{line}</text>
        {/each}
    </svg>

    <!-- William Lomgford Bevins migration -->
    <path stroke="red" stroke-width="2" fill="none"
        marker-mid="url(#arrow)" marker-end="url(#arrow)" marker-start="url(#arrow)"
        d="M 730 748 A 300 100 170 0 0 300 850" />
    <text x="320" y="720" text-anchor='start' font-size="14px">1845: Wm Longford Bevins (30),</text>
    <text x="320" y="740" text-anchor='start' font-size="14px">wife Mary Bolt (23), and</text>
    <text x="320" y="760" text-anchor='start' font-size="14px">son Wm Alfred Bevins (2)</text>
    <text x="320" y="780" text-anchor='start' font-size="14px">emmigrate to USA</text>

    <!-- Mary Ann White migration -->
    <!-- <x1> <y1> A <r1> <r2> <deg> <longSeg/shortSeg> <left/right> <x2> <y2>-->
    <path stroke="white" stroke-width="2" fill="none"
        marker-mid="url(#arrow)" marker-end="url(#arrow)" marker-start="url(#arrow)"
        d="M 610 912 A 203 200 45 0 0 720 770" />
    <text x="680" y="870" text-anchor='start' font-size="14px">1869: Mary Ann White (20)</text>
    <text x="680" y="890" text-anchor='start' font-size="14px">and husband Bevins</text>
    <text x="680" y="910" text-anchor='start' font-size="14px">move to Leicestershire</text>

    <path stroke="white" stroke-width="2" fill="none"
        marker-mid="url(#arrow)" marker-end="url(#arrow)" marker-start="url(#arrow)"
        d="M 730 748 A 400 200 170 0 0 300 900" />
    <text x="370" y="860" text-anchor='start' font-size="14px">1871: Mary Ann White (23),</text>
    <text x="370" y="880" text-anchor='start' font-size="14px">husband Bevins, and dau.</text>
    <text x="370" y="900" text-anchor='start' font-size="14px">Mary Allace Bevins (1)</text>
    <text x="370" y="920" text-anchor='start' font-size="14px">emmigrate to USA</text>
</svg>
