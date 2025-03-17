# genex/data/customized

Contains hand crafted JSON data files that should not be deleted as they are
usually updated manually over time.

Files whose names begin with an underscore are pure Javascript data files.

## _gedcomContextFilter.js

Contains **_gedcomContextFilterMASTER**, a simple array of the GEDCOM command contexts to be
retained when processing **_gedcomFileRecords.js** into **_gedcomFilteredRecords.js**.

## _gedcomKnownDateMonth.js

Contains:
 - **_gedcomKnownDateQuals**, a mappable array of all known GEDCOM DATE qualifiers
 mapped to their standard value used by GenDate.

- **_gedcomKnownDateMonths**, a appable array of all known GEDCOM DATE content month names
 whose key is a 3-char lowercase string and value is the month index [1-12].

## _gedcomKnownNamePrefixes.js

Contains **_gedcomKnownNamePrefixes**, a mappable array of all known GEDCOM GIVN content
whose key is the first GIVN token and value is a standard prefix.

## _gedcomKnownPlacesMASTER.js

Contains **_gedcomKnownPlaces**, a mappable array of all known GEDCOM PLAC content
to a *standard* PLAC key:
- the key is the arbitrary GEDCOM PLAC content like "Grand Rapids, MN", and
- the value is a standard place key like "USA,MN,Itasca,Grand Rapids".

## _gedcomResolvedDuplicates.js

Many GEDCOM records have duplicate BIRT, DEAT, MARR, DATE, and PLAC records that
are maintained within Ancestry.com.

The script **10-generateGedcomIndiObjects.js**, as a side effects, creates a file
**./diagnostics/gedcom/_unresolvedDuplicatesINDI.js** containing any unresolved
duplicates.  These should be cut and paste into this file with all but the
preferred content commented out.

Similarly, the script **11-generateGedcomFAMObjects.js**, as a side effect,
creates the file **./disgnostics/gedcom/_unresolvedDuplicateINDI.js**,
whose content, if any, should be cut and paste into this file and resolved.

## _geoLocations.js

Contains **_geoLocations**, a mappable array whose
- key is a *standard* Place key like "USA,MN,Itasca,Grand Rapids", and
- entry is an array of [lat, lng, segmentName]

The elements define a nested structure with each level containing
more refined info.  For example:
- ["USA", [39.12, -99.59, "United States"]],
- ["USA,MN", [46.2807, -94.3053, "Minnesota"]],
- ["USA,MN,Itasca", [47.5095, -93.6319, "Itasca"]],
- ["USA,MN,Itasca,Grand Rapids", [47.2380, -93.5327, "Grand Rapids"]],

## ./genex/_vicinities<GROUP>.js

Each of these files contain a single **_vicinities<GROUP>** mappable array whose
- key is a vicinity key like "USA-MN-NC" and whose
- entry is an object like
`{ label: 'North Central Minnesota', places: [
        "USA,MN,Beltrami",
        "USA,MN,Cass",
        "USA,MN,Crow Wing",
        "USA,MN,Hubbard",
        "USA,MN,Itasca",
        "USA,MN,Wadena",
]}`

where *places* is an array of place keys like ["USA,MN,Itasca", "USA,MN,Cass"]

## Migrations
Maps 