echo off
echo Copying Ancestry.ged to AncestryPrev.ged ...
copy .\generated\gedcom\Ancestry.ged .\generated\gedcom\AncestryPrev.ged
echo Copying _gedcomRecordAll.ged to _gedcomRecordsAllPrev.ged ...
copy .\generated\gedcom\_gedcomRecordsAll.js .\generated\gedcom\_gedcomRecordsAllPrev.js
echo Copying Ancestry.ged from Downloads to to data\gedcom\Ancestry.ged
copy "C:\Users\cbevi\Downloads\Bevins-Riley Family Tree.ged" .\generated\gedcom\Ancestry.ged
