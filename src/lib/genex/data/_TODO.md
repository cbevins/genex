# GENEX TO-DO LIST


## To Be Refactored

## *Tokenizer.js*
    - Store opening quote (if any) for each token in an internal array
    - add methods to return the quotes array or any element
    - allows, for example, when parsing GEDCOM names,
    to test if a token is enclosed in '"', which is a nickname,
    or by "(", which indicates a alias or file number.

## *6-gedcomINDI.js*
    - hide all data processing currently inside *../gedcom/constructGedcomINDIBlock.js*
    - the function should return [multiples: [], json: []]

## *7-gedcomFAM.js*
    - hide all data processing currently inside *../gedcom/constructGedcomFAMBlock.js*
    - the function should return [multiples: [], json: []]

## To Be Implemented

### implement *gedcom/constructName.js*
    - receives NAME, GIVN, SURN, NSFX (and maybe other) GEDCOM contents
    
    - tokenize GIVN
        - if token is named in */data/customized/_gedcomNAMEPrefixes.js* file:
            - stores token in *prefixes[]*
        - else if token is quoted:
            - stores token in *nicknames[]*
        - else (not a prefix or nickname), so
            - stores token in *given[]*

    - tokenize SURN
        - if token is quoted:
            - stores token in *also[]*
        - else:
            - stores token *surnames[]*

    - tokenize NSFX
        - if token is like (#...):
            - stores token in *file*
        else:
            - stores token in *suffixes[]*

    - returns {prefixes: [], given: [], nicknames: [], surnames: [], suffixes: [], also: [], file: }

### implement *gedcom/constructDate.js*
    - use */data/customized/_gedcomDATEQualifiers.js*
    - return {text, day, month, year, qual}

### implement *gedcom/constructPlace.js*
    - use */data/generated/_gedcomKnownPlaces.js*
    - returns {text, keys: [<string>], locationKeys: [<string]}
