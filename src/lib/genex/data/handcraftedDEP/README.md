# genex/data/handcrafted

Contains hand crafted JSON data files that should not be deleted as they are
usually updated manually.

## GedcomContextFilter.js
Array of the GEDCOM command contexts to be retained when processing
_gedcomFileRecords.js into _gedcomFilteredRecords.js

## GedcomPlaceKeys
Maps all known possible GEDCOM PLAC content to a standard PLAC key:
- key is GEDCOM PLAC content like "Grand Rapids, MN"
- entry is a standard place key like "USA,MN,Itasca,Grand Rapids"

## GeoLocations
Maps standard PLAC key and segments to their geo position and label:
- key is a standard GedcomPlaceKey like "USA,MN,Itasca,Grand Rapids"
- entry is an array of [lat, lng, segmentName]

## Regions
Maps geographic region keys to an array of the standard place keys they contain:
- key is a region keys like "NorthernMn"
- entry is an array of [name, lat, lng, places],

 where *places* is an array of place keys like ["USA,MN,Itasca", "USA,MN,Cass"]

## Migrations
Maps 