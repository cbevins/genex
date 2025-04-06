/**
 * Vicinities relevant to the Bevins-Heddens Family Tree.
 * This is a subset of _vicintyDefsAll for persons who appear
 * in the Lineage tree for Collin Bevins
 */
export const _vicinityDefsCdb = [
    // Canadia
    ['CAN-ON', {label: 'Ontario, Canada', places: [
        "CAN,ON"
    ]}],
    ['CAN-QC-Gaspesie', {label: 'Gaspesie-Iles-de-la-Madeleine, Quebec', places: [
        "CAN,QC,Gaspesie-Iles-de-la-Madeleine", //  1,    1,    0,    0,   // Gaspe Peninsula and Magdalen Islands
    ]}],

    // Germany & France
    ['DEU-BW', {label: 'Rhine River Valley', places: [
        "DEU,BW",   // 3p: 3b, 0d, 0r   Baden-Württemberg, Germany
        "DEU,HE",   // 2p: 2b, 2d, 0r   Hessen, Germany
        "DEU,RP",   // 4p: 4b, 1d, 0r   Rhineland-Plantinate, Germany
        "FRA,ALS"   // 1p: 1b, 0d, 0r   Alsace, France, borders B-W and Switzerland
    ]}],


    //--------------------------------------------------------------------------
    // England - London, Middlesex, and surrounding Counties
    //--------------------------------------------------------------------------
    ['ENG-LND', {label: 'London and Surrounding Counties, England', places: [
        "ENG,LND",  // London       8p: 3b, 6d, 2r
        "ENG,MDL",  // Middlesex
        "ENG,MDX",  // Middlesex    4p: 4b, 1d, 0r
        "ENG,BKM",  // 1p: 1b, 0d, 0r   Buckinghamshire, England
        "ENG,OXF",  // 1p: 1b, 0d, 0r Oxfordshire, England
    ]}],
    
    //--------------------------------------------------------------------------
    // England - South East Coastal Counties
    //--------------------------------------------------------------------------
    ['ENG-CAM', {label: 'South East Coastal Counties of England', places: [
        "ENG,CAM",  // 3p: 2b, 2d, 0r Cambridgeshire, England
        "ENG,KEN",  // 2p: 1b, 1d   Kent, England
        "ENG,SFK",  // 1p: 1b, 0d, 0r Suffolk, England
        "ENG,SXE",  // 1p: 1b, 0d, 0r East Sussex, England
    ]}],

    //--------------------------------------------------------------------------
    // England - South West Coastal Counties
    //--------------------------------------------------------------------------
    ['ENG-COR', {label: 'South West Coastal Counties, England', places: [
        "ENG,COR",  // 4p: 2b, 2d, 0r Cornwall, England
        "ENG,DEV",  // 23p: Devonshire, England
        "ENG,DOR",  // 3p: 3b, 0d, 0r Dorset, England
        "ENG,SOM",  // 4p: 4b, 1d, 0r Somerset, England
    ]}],

    //--------------------------------------------------------------------------
    // England - Welsh Marches
    //--------------------------------------------------------------------------
    ['ENG-CHS', {label: 'Welsh Marches, England', places: [
        "ENG,CHS",  // 3p: 3b, 0d, 0r   Cheshire, England
        "ENG,SAL",  // 1p: 1b, 0d, 0r   Shropshire (Salop), England
        "ENG,WOR",  // 1p: 1b, 0d, 0r Worcestershire, England
    ]}],

    //--------------------------------------------------------------------------
    // England - Scottish Marches
    //--------------------------------------------------------------------------
    ['ENG-DUR', {label: 'Durham, England', places: [
        "ENG,DUR"   // 7p: 7b, 7d, 0r
    ]}],

    //--------------------------------------------------------------------------
    // England - Leicestershire and Neighboring Counties
    //--------------------------------------------------------------------------
    ['ENG-LEI', {label: 'Leicestershire and Surrounding Counties, England', places: [
        "ENG,LEI",  // 27p: 
        "ENG,NOR",  // 3p: 2b, 2d, 0r 28 miles SE of Leicester, in the East Midlands
        "ENG,NTT",  // 2p: 2b, 0d, 0r
        "ENG,WAR",  // 3p: 3b, 0d, 0r
    ]}],

    //--------------------------------------------------------------------------
    // England - Yorkshire
    //--------------------------------------------------------------------------
    ['ENG-YKS', {label: 'Yorkshire, England', places: [
        "ENG,ERY",  // 5p: 4b, 3d, 0r
        "ENG,YKS",  // 2p: 1b, 2d, 0r
    ]}],

    //--------------------------------------------------------------------------
    // Ireland & Northern Ireland
    //--------------------------------------------------------------------------
    ['IRL-COR', {label: 'County Cork, Irish Republic', places: [
        "IRL,COR"   // very southern Ireland
    ]}],
    ['IRL-DON', {label: 'Northern Counties of Ireland', places: [
        "NIR,ARM",
        "IRL,DON",   // in very northern ireland, but in Republic
        "NIR,DOW",
        "IRL,MOG",   // in northern ireland, but in Republic
    ]}],
    ['IRL-DUB', {label: 'County Dublin, Irish Republic', places: [
        "IRL,DUB"
    ]}],

    //--------------------------------------------------------------------------
    // Norway
    //--------------------------------------------------------------------------
    ['NOR-AKR', {label: 'Akershus-Hedmark-Oppland, Norway', places: [
        "NOR,AKR",  // south east Norway
        "NOR,HED",
        "NOR,OPP",
    ]}],

    //--------------------------------------------------------------------------
    // Scotland - Clyde
    //--------------------------------------------------------------------------
    ['SCO-RFW', {label: 'Scottish Lowlands', places: [
        "SCO,RFW",  // 4p: 4b, 2d, 0r   Renfrewshire, Scotland
        "SCO,ROX",  // 1p: 1b, 0d, 0r   Roxburghshire, Scotland
        "SCO,KKD",  // 2p: 2b, 0d, 0r   Kirkcudbrightshire, Scotland
        "SCO,LKS",  // 1p: 1b, 1d, 0r   Lanarkshire, Scotland
        "SCO,MLN",  // 1p: 1b: 1d, 0r   Midlothian (formerly Edinburghshire), Scotland
        "SCO,WLN",  // 4p: 4b, 2d   West Lothian (formerly Linlithgowshire), Scotland
        "SCO,STI",  // 1p: 1b 0d, 0r    Stirlingshire, Scotland
    ]}],

    //--------------------------------------------------------------------------
    // USA - Connecticut
    //--------------------------------------------------------------------------
    ['USA-CT-New London', {label: 'New London County, Connecticut', places: [
        "USA,CT,New London"
    ]}],
    ['USA-CT-Windham', {label: 'Windham County, Connecticut', places: [
        "USA,CT,Windham"
    ]}],

    // Illinois
    ['USA-IL-Henry', {label: 'Henry County, Illinois', places: [
        "USA,IL,Henry", //          , 16,    1,    2,    13, []],
    ]}],
    ['USA-IL-LaSalle', {label: 'LaSalle County, Illinois', places: [
        //  borders Indiana
        "USA,IL,LaSalle",   //        , 1,    1,    0,    0, []],
    ]}],

    //--------------------------------------------------------------------------
    // Indiana - North Central
    //--------------------------------------------------------------------------
    ['USA-IN-Carroll', {label: 'North Central Indiana', places: [
        "USA,IN,Carroll",
        "USA,IN,Cass",
        "USA,IN,Kosciusko",
        "USA,IN,LaGrange",  // borders Michigan, half Amish, 3rd largest in US
        "USA,IN,Miami",
    ]}],

    //--------------------------------------------------------------------------
    // Kansas
    //--------------------------------------------------------------------------
    ['USA-KS-Coffey', {label: 'Coffey County, Kansas', places: [
        "USA,KS,Coffey",
    ]}],

    //--------------------------------------------------------------------------
    // Kentucky - Eastern Counties
    //--------------------------------------------------------------------------
    ['USA-KY-Eastern', {label: 'Eastern Counties, Kentucky', places: [
        // East Kentucky
        // "USA,KY"             //  3,    0,    0,    3,
        "USA,KY,Floyd",         // 48,    3,   12,    33
        "USA,KY,Johnson",       // 18,    1,    2,    15
    ]}],
    ['USA-KY-Jefferson', {label: 'Jefferson County, Kentucky', places: [
        // Louisville area
        "USA,KY,Jefferson",     // 1,    0,    1,    0  Louisville
    ]}],

    //--------------------------------------------------------------------------
    // Massacheusets - Colonial COunties
    //--------------------------------------------------------------------------
    ['USA-MA-Colonial', {label: 'Colonial Counties, Massacheusets', places: [
        // 20p: 
        'USA,MA,Barnstable',
        'USA,MA,Bristol',
        'USA,MA,Plymouth',
    ]}],

    ['USA-MA-Essex', {label: 'Essex County, Massacheusets', places: [
        'USA,MA,Essex', // 3p: 1b, 1d, 1r   north east coast, borders NH
    ]}],

    //--------------------------------------------------------------------------
    // Maryland - West Bay
    //--------------------------------------------------------------------------
    ['USA-MD-West Bay', {label: 'West Cheapeake Bay, Maryland', places: [
        'USA,MD,Anne Arundel',  // 17p: 10b, 12d, 1r
        'USA,MD,Baltimore',
        'USA,MD,Calvert',       // 2p: 1b, 1d, 0r
        'USA,MD,Charles',       // 2p: 1b, 2d, 0r
    ]}],

    //--------------------------------------------------------------------------
    // Maryland - West Panhandle
    //--------------------------------------------------------------------------
    ['USA-MD-Panhandle', {label: 'West Panhandle, Maryland', places: [
        'USA,MD,Carroll',   // 1p: 1b, 0d, 0r
        'USA,MD,Frederick', // 13p: 8b, 2d, 5r  borders Adams & Franklin, PA, and Loudoun, VA 
        'USA,MD,Montgomery',// 2p: 1b, 2d, 0r   borders Fairfax and Loudoun, VA
    ]}],

    //--------------------------------------------------------------------------
    // Maryland - South East
    //--------------------------------------------------------------------------
    ['USA-MD-South East', {label: 'South East, Maryland', places: [
        'USA,MD,Somerset',  // 13p: 6b, 10d, 3r     borders Delaware
        'USA,MD,Wicomico',  // 2p: 2b, 0d, 0r       borders Delarae
    ]}],
    
    //--------------------------------------------------------------------------
    // Minnesota - North Central
    //--------------------------------------------------------------------------
    ['USA-MN-North Central', {label: 'North Central Minnesota', places: [
        // "USA,MN,Beltrami",       //  12,    1,    6,    5
        "USA,MN,Cass",              //  25,    2,    3,   20
        // "USA,MN,Crow Wing",      //   1,    0,    1,    0
        "USA,MN,Hubbard",           //   3,    0,    3,    0
        "USA,MN,Itasca",            // 185,   23,   28,  134
        // "USA,MN,Lake of the Woods",// 1,   0,    1,    0
        // "USA,MN,St. Louis",      //   2,    0,    2,    0
        // "USA,MN,Todd",           //   1,    1,    0,    0
        "USA,MN,Wadena",            //  31,    8,   11,   12
    ]}],

    //--------------------------------------------------------------------------
    // Minnesota - North West
    //--------------------------------------------------------------------------
    ['USA-MN-North West', {label: 'North West Minnesota', places: [
        // "USA,MN,Becker",        // 64,   12,    9,   43 North West Minnesota
        // "USA,MN,Clay",          //  1,    1,    0,    0 North West Minnesota
        // "USA,MN,Kittson",       //  6,    2,    0,    4 North West Minnesota
        // "USA,MN,Mahnomen",      //  5,    0,    1,    4 North West Minnesota
        // "USA,MN,Marshall",      //  1,    1,    0,    0 North West Minnesota
        // "USA,MN,Norman",        //  2,    0,    1,    1 North West Minnesota
        "USA,MN,Otter Tail",       //  9,    0,    3,    6 North West Minnesota
        // "USA,MN,Pennington",    //  6,    0,    0,    6 North West Minnesota
    ]}],

    //--------------------------------------------------------------------------
    // Minnesota - East Central and Metro
    //--------------------------------------------------------------------------
    ['USA-MN-East Central', {label: 'East Central, Metro, Minnesota', places: [
        // "USA,MN,Anoka",
        // "USA,MN,Carver",    //   0,    0,    0,    9 East Central MN
        // "USA,MN,Chisago",   //   1,    0,    1,    0 East Central MN
        // "USA,MN,Dakota",    //   2,    0,    1,    1 East Central MN
        "USA,MN,Hennepin",     // 258p, 32b,  44d, 182r East Central MN
        // "USA,MN,Ramsey",    //   6,    1,    4,    1 East Central MN
        // "USA,MN,McLeod",    //   1,    0,    1,    0 East Central MN
        "USA,MN,Meeker",       //  39,   10,   10,   19 East Central MN
        // "USA,MN,Scott",     //   0,    0,    0,    9 East Central MN
        "USA,MN,Wright",       //  36,    7,    5,   24 East Central MN
    ]}],

    //--------------------------------------------------------------------------
    // North Dakota - North Border
    //--------------------------------------------------------------------------
    ['USA-ND-North Border', {label: 'North Border Counties, North Dakota', places: [
        'USA,ND,Rolette',   // north east ND
        'USA,ND,Towner',    // north east ND
    ]}],

    // New York
    ['USA-NY-Cayuga', {label: 'Cayuga County, New York', places: [
        'USA,NY,Cayuga'
    ]}],
    ['USA-NY-New York', {label: 'New York County, New York', places: [
        'USA,NY,New York'
    ]}],
    ['USA-NY-Rensselaer', {label: 'Rensselaer County, New York', places: [
        'USA,NY,Rensselaer'
    ]}],

    // Ohio
    // Western border with Indiana
    ['USA-OH-Darke', {label: 'Darke County, Ohio', places: [
        'USA,OH,Darke'          // borders Preble, and Wayne, Jay, Randall, IN
    ]}],
    ['USA-OH-Preble', {label: 'Preble County, Ohio', places: [
        'USA,OH,Preble',        // borders Darke
    ]}],

    ['USA-OH-Hamilton', {label: 'Hamilton County, Ohio', places: [
        'USA,OH,Hamilton'
    ]}],
    ['USA-OH-Huron', {label: 'Huron County, Ohio', places: [
        'USA,OH,Huron'
    ]}],
    ['USA-OH-Pike', {label: 'Pike County, Ohio', places: [
        'USA,OH,Pike'
    ]}],
    ['USA-OH-Stark', {label: 'Stark County, Ohio', places: [
        'USA,OH,Stark'
    ]}],

    //--------------------------------------------------------------------------
    // Pennsylvania - South Border Counties
    //--------------------------------------------------------------------------
    ['USA-PA-South Border', {label: 'South Border Counties, Pennsylvania', places: [
        'USA,PA,Franklin',  // p2: 1b, 0d, 1r   border Frederick & Washington, MD
        'USA,PA,Greene',    // 2p: 2b, 0d, 0r   south east corner, borders Monongalia & Wetzel, WV
        'USA,PA,Somerset',  // 4p: 3b, 1d, 0r   borders Garrett & Allegany, MD
        'USA,PA,Washington',// 1p: 1b, 0d, 0r   borders Brook, Hancock, Ohio, & Marshall, WV
    ]}],

    //--------------------------------------------------------------------------
    // Pennsylvania - East Border Counties
    //--------------------------------------------------------------------------
    ['USA-PA-East Border', {label: 'East Border Counties, Pennsylvania', places: [
        'USA,PA,Bucks',     // 1p: 1b, 0d, 0r   borders New Jersey
        'USA,PA,Pike',      // 2p: 2b, 0d, 0r   borders New Jersey, New York
    ]}],

    //--------------------------------------------------------------------------
    // Pennsylvania - Dutch
    //--------------------------------------------------------------------------
    ['USA-PA-Penn Dutch', {label: 'Penn Dutch Counties, Pennsylvania', places: [
        'USA,PA,Chester',   // 9p: 6b, 4d, 05   borders New Castle, DE and Cecil, MD
        'USA,PA,Lancaster', // 2p: 1b, 0d, 1r
    ]}],

    //--------------------------------------------------------------------------
    // Rhode Island
    //--------------------------------------------------------------------------
    ['USA-RI', {label: 'Bristol, Newport, Washington County, Rhode Island', places: [
        'USA,RI,Bristol',       // 1p: 1b: 0d, 0r
        'USA,RI,Newport',       // 3p: 1b, 2d, 0r
        'USA,RI,Washington'     // 3p: 2b, 2d, 0r
    ]}],

    //--------------------------------------------------------------------------
    // Virginia - R1, R2, R3, part of R4 (Virginia Assoc of Counties Regions)
    //--------------------------------------------------------------------------
    ['USA-VA-Tidewater', {label: 'R1, R2, R3: Tidewater, Virginia', places: [
        'USA,VA,Accomack',      // 1p: 1b, 0d, 0r   R1, Coastal Island
        'USA,VA,New Kent',      // 3p: 1b, 2d, 05   R1
        'USA,VA,King William',  // 2p: 2b, 0d, 0r   R2
        'USA,VA,Chesterfield',  // 2p: 2b, 0d, 0r   R3
        'USA,VA,Hanover',       // 6p: 3b, 3d, 1r   R3
        'USA,VA,Greensville',   // 1p: 1b, 0d, 0r   R4
    ]}],

    //--------------------------------------------------------------------------
    // Virginia - R5, Central Piedmont
    //--------------------------------------------------------------------------
    ['USA-VA-Central Piedmont', {label: 'R5: Central Piedmont, Virginia', places: [
        'USA,VA,Buckingham',    // 1p: 1b, 0d, 1r   R5
        'USA,VA,Goochland',     // 1: 1b, 0d, 0r    R5
        'USA,VA,Powhatan',      // 1p: 1b, 0d, 0r   R5
    ]}],

    //--------------------------------------------------------------------------
    // Virginia - R9 & R11: Blue Ridge and Valley Ridge
    //--------------------------------------------------------------------------
    ['USA-VA-Blue Ridge', {label: 'R9, R11: Blue Ridge/Valley Ridge, Western Virginia', places: [
        'USA,VA,Augusta',       // 5p: 3b, 5d, 1r   R9
        'USA,VA,Botetourt',     // 1p: 1b, 0d, 0r   R11
    ]}],

    //--------------------------------------------------------------------------
    // Virginia - R10
    //--------------------------------------------------------------------------
    ['USA-VA-South Piedmont', {label: 'R10: SOuth Piedmont, Virginia', places: [
        'USA,VA,Franklin',      // 1p: 1b, 0d, 0r
        'USA,VA,Halifax',       // 1p: 1b, 0d, 0r
    ]}],
    
    //--------------------------------------------------------------------------
    // Virginia - R12 & R13: Southwest angle,
    // R13 and R12 are Valley & Ridge, R12 is Blue Ridge
    //--------------------------------------------------------------------------
    ['USA-VA-SouthWest', {label: 'R11, R12, R13: SW Blue Ridge, Virginia', places: [
        'USA,VA,Bland',         // 1p: 1b, 0d, 0r   R12
        'USA,VA,Washington',    // 6p: 1b, 2d, 8r   R12
        'USA,VA,Lee',           // 2p: 1b, 0d, 1r   R13
        'USA,VA,Scott',         // 3p: 1b, 2d, 1r   R13
        'USA,NC,Surry',         // 3p: 1b, 2d, 3r   borders Patrick, Carroll, and Grayson, VA
    ]}],

    // Vermont
    ['USA-VT-Windsor', {label: 'Windsor County, Vermont', places: [
        'USA,VT,Windsor',       // 5p: 1b, 4d, 2r
    ]}],

    // Wisconsin
    ['USA-WI-Adams', {label: 'Adams County, Wisconsin', places: [
        'USA,WI,Adams',         // 9p: 2b, 3d, 19r
    ]}],
]
