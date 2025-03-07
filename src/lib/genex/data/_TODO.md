# GENEX TO-DO LIST

- implement *gedcom/constructName.js*
    - use */data/customized/_gedcomNAMEPreixes.js*
    - returns {given: [], prefixes: [], surnames: [], suffixes: [], file: }

- implement *gedcom/constructDate.js*
    - use */data/customized/_gedcomDATEQualifiers.js*
    - return {text, day, month, year, qual}

- implement *gedcom/constructPlace.js*
    - use */data/generated/_gedcomPLAC2Standard.js*
    - returns {text, keys: [<string>], locationKeys: [<string]}

- hide all data processing currently in *6-gedcomINDI.js *
    inside *../gedcom/constructGedcomINDIBlock.js*
    - return [multiples: [], json: []]

- hide all data processing currently in *7-gedcomFAM.js *
    inside *../gedcom/constructGedcomFAMBlock.js*
    - return [multiples: [], json: []]
