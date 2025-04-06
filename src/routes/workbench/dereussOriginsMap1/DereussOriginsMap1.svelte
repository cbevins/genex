<script>
    import europe from '$lib/maps/Europe_topography_map.png'

    const mapWd = 1473
    const mapHt = 1198
    const ratio = 700 / mapWd
    const rw = ratio * mapWd
    const rh = Math.ceil(ratio * mapHt)
    const svg = {w: rw, h: rh, vx: 0, vy: 0, vw: rw, vh: rh,
        ix: -100, iy: -300, iw: mapWd, ih: mapHt}
        
    const bh ='blue'
    const rt = 'magenta'

    // [label, location,
    // lat, lon, cx, cy,
    // fill, ancestors, genMin, genMax, birthMin, birthMax]
    const bevins = [
        ["Brixham", "ENG,DEV,Brixham",
            50.39499, -3.51374, 175, 345,
            // bh, 23, 3, 10, 1676, 1848],  // in Brixham only
            bh, 34, 3, 12, 1585, 1848],     // in COR, DEV, DOR, SOM
        ["Newbold Verdon", "ENG,LEI,Newbold Verdon",
            52.63014, -1.341962, 230, 290,
            // bh, 25, 3, 9, 1665, 1843],   // in LEI only
            bh, 31, 3, 13, 1565, 1843],     // in LEI, NOR, NTT, WAR
        ["Scottish Lowlands", "SCO-RFW",
            55.470417, -3.48343, 215, 190,
            bh, 14, 8, 14, 1565, 1724],
        ["Akershus", "NOR-AKR",
            60, 11.2, 470, 100,
            bh, 14, 4, 7, 1759, 1843],
        ["Rhineland-Palatinate", "DEU,RP",
            49.9469, 7.4306, 370, 370,
            bh, 10, 5, 10, 1643, 1832], // Baden-Württemberg, Hessen, RP, and Alsace
        // ["DEU,BW", 48.7841, 9.1555, "Baden-Wurttemberg"],
        // ["DEU,BY", 48.9274, 11.4909, "Bavaria"],
        // ["DEU,HE", 50.6705, 8.9362, "Hesse"],
        // ["DEU,NW", 51.5418, 7.3309, "North Rhine-Westphalia"],

        ["London", "ENG-LND",
            51.50767, -0.13734, 240, 325,
            bh, 9, 5, 13, 1590, 1788],
        ["No Ireland", "IRL-DON",
            54.6538, -8.1096, 150, 210, // NIR-DON
            bh, 9, 5, 12, 1632, 1808],  // NIR-ARM, NIR-DOW, IRL-DON, IRL-MOG
        // ["IRL,MOG", 54.2453, -6.97272, "Monaghan"],
        // ["NIR,ARM", 54.34861, -6.6475, "Armagh"],
        ["Durham", "ENG-DUR",
            54.79, -1.56, 250, 250,         // ALSO Riley-Trombly
            bh, 7, 5, 7, 1745, 1799],
        ["Yorkshire", "ENG-YKS",
            53.97361, -1.10584, 260, 272,   // York
            bh, 5, 11, 14, 1560, 1638], // YKS, ERY
        // ["ENG,ERY", 53.8903, -0.5214, "East Riding of Yorkhire"],

        // TO DO
        ["SE Coast", "ENG-CAM",
            52.32429, 0.027697, 270, 308,
            bh, 5, 11, 13, 1578, 1620], // CAM, KEN, SFX, SXE
        ["", "ENG-CHS", // Welsh Marches
            52.48762, -2.89142, 205, 300,
            bh, 5, 9, 13, 1581, 1692],  // CHS, SAL, WAR
        ["Cork", "IRL-COR",
            51.89903, -8.50337, 100, 270,
            bh, 4, 7, 8, 1733, 1755],
        // ["CAN-ON", "Ontario, Canada", 2, 4, 4, 1844, 1844],
        // ["CAN-QC-Gaspesie", "Gaspesie-Iles-de-la-Madeleine, Quebec", 1, 5, 5, 1805, 1805, [
    ]
    
    // Riley-Trombley ancestral births by vicinity
    const riley = [
        ["Zuid-Holland", "NLD,ZUI",
            51.9880, 4.490, 330, 335,
            rt, 93, 4, 15, 1479, 1839],
        ["Kronoberg", "SWE,KRO",
            56.77, 14.59, 520, 210,
            rt, 14, 3, 6, 1753, 1876],
        ["Lower St Lawrence", "CAN,QC,Bas-Saint-Laurent",
            48.27348, -68.29465, 0, 0,
            rt,  7, 5, 6, 1786, 1835],
        ["Montreal", "CAN,QC,Montreal",
            45.51393, -73.57507, 0, 0,
            rt, 12, 5, 7, 1778, 1837],
        ["New Brunswick", "CAN-NB",
            47, -66, 0, 0,
            rt, 7, 3, 6, 1780, 1879],
        ["", "ENG-DUR",
            54.79, -1.56, 250, 240,
            rt, 5, 3, 6, 1790, 1874],
        ["Northumberland", "ENG-NBL",
            55.16, 2, 250, 227,
            rt, 5, 4, 6, 1792, 1850],
        // TO DO
        ["Essex", "ENG-ESS",
            51.8, 0.56, 0, 0,
            rt, 1, 13, 13, 1520, 1520],
        ["Drenth", "NLD-DRE",
            52.9476, 6.6231, 0, 0,
            rt, 1, 14, 14, 1503, 1503],
        ["Nottinghamshire", "ENG-NTT",
            53.13, -1, 0, 0,
            rt, 1, 6, 6, 1760, 1760],
    ]
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
