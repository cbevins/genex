echo off
node .\1-gedcom2Json.js ./lib/genex/data/tmp/Ancestry.ged ./lib/genex/data/tmp/GedcomAllJson.js
node .\2-gedcomContextFilter.js ./lib/genex/data/tmp/GedcomAllJson.js ./lib/genex/data/tmp/GedcomJson.js
node .\3-gedcomContextCounts.js
node .\4-gedcomPlacUnknown.js