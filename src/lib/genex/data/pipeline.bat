echo off
node .\01-generateGedcomAllRecords.js
node .\02-diagnoseGedcomAllContexts.js
node .\03-generateGedcomFilteredRecords.js
node .\04-diagnoseGedcomFilteredContexts.js
echo Ensure INDI keys do not change between Ancestry.com GEDOM exports
node .\05-diagnoseGedcomIndiKeyStability.js
node .\06-diagnoseGedcomAllPlacesUnknown.js
node .\07-diagnoseGedcomFilteredPlacesUnknown.js
node .\08-diagnoseGedcomAllDatesUnknown.js
node .\09-diagnoseGedcomFilteredDatesUnknown.js
node .\10-generateGedcomIndiObjects.js
node .\10-generateGedcomFamObjects.js
node .\20-generateGenexPlaces.js
node .\21-generateGenexPeopleObjects.js
