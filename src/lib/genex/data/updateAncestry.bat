echo off
echo Copying Ancestry.ged to AncestryPrev.ged ...
copy .\generated\gedcom\Ancestry.ged .\generated\gedcom\AncestryPrev.ged
echo Copying _allRecords.ged to _allRecordsPrev.ged ...
copy .\generated\gedcom\_allRecords.js .\generated\gedcom\_allRecordsPrev.js
echo Copying Ancestry.ged from Downloads to to data\gedcom\Ancestry.ged
copy "C:\Users\cbevi\Downloads\Bevins-Riley Family Tree.ged" .\generated\gedcom\Ancestry.ged
