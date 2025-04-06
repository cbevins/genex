// Riley-Trombley ancestral births by vicinity
// Location are for the map '$lib/maps/Europe_topography_map.png'
// [label, location,
// lat, lon, cx, cy,
// fill, ancestors, genMin, genMax, birthMin, birthMax]
const bh ='blue'
const _bevinsEuropeanTopoMapLocations = [
    ["Brixham", "ENG,DEV,Brixham",
        50.39499, -3.51374, 175, 345,
        // bh, 23, 3, 10, 1676, 1848],  // births in Brixham only

        bh, 34, 3, 12, 1585, 1848],     // births in COR, DEV, DOR, SOM
    ["Newbold Verdon", "ENG,LEI,Newbold Verdon",
        52.63014, -1.341962, 230, 290,
        // bh, 25, 3, 9, 1665, 1843],   // births in LEI only
        bh, 31, 3, 13, 1565, 1843],     // births in LEI, NOR, NTT, WAR

    ["Scottish Lowlands", "SCO-RFW",
        55.470417, -3.48343, 215, 190,
        bh, 14, 8, 14, 1565, 1724],

    ["Akershus", "NOR-AKR",
        60, 11.2, 470, 100,
        bh, 14, 4, 7, 1759, 1843],

    ["Rhineland-Palatinate", "DEU,RP",
        49.9469, 7.4306, 370, 370,
        bh, 10, 5, 10, 1643, 1832], // births in Baden-Württemberg, Hessen, RP, and Alsace
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
