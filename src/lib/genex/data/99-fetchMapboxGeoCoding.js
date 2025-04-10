// Reads standard 
import fs from 'fs'
// Token is kept in file listed in .gitignore
import { _mapboxToken } from "./_mapboxToken.js"
import { _geoLocationCounts } from './diagnostics/genex/_geoLocationCounts.js'

const time1 = new Date()
const progName = (process.argv[1]).split('\\').pop()
console.log('TEMPORARILY DISABLED - REMOVE process.exit() TO RE-ENABLE!!')
process.exit()

const varName = "_mapboxGeoCodes"
const folder = `./diagnostics/genex/`

async function getGeoCode(requestJson, tag) {
    // Specify the API endpoint for user data
    const singleUrl = "https://api.mapbox.com/search/geocode/v6/forward"
    const batchUrl = "https://api.mapbox.com/search/geocode/v6/batch"
    const queryParams = {
        access_token: _mapboxToken
    }
    const queryString = new URLSearchParams(queryParams).toString()
    const fullUrl = `${batchUrl}?${queryString}`

    fetch(fullUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(requestJson),
    })
    .then(response => {
        if (!response.ok) {
            console.log(response)
            throw new Error(`Network response was not ok: ${response.statusText}`)
        }
        return response.json()
    })
    .then(responseJson => {
        // Process the retrieved user data
        store(requestJson, responseJson, tag)
    })
    .catch(error => {
        console.error('Error:', error);
    })
}  

function store(requestJson, responseJson, tag) {
    const results = responseJson.batch
    for(let i=0; i<results.length; i++) {
        const {type, features, attribution} = results[i]
        // Preserve the original query string
        const q = requestJson[i].q
        responseJson.batch[i].q = q
        responseJson.batch[i].attribution = 'Mapbox'
        // filter(responseJson.batch[i])
    }

    let js = `export const ${varName+tag} = ` + JSON.stringify(responseJson, null, 2)
    const fileName = folder + varName + tag + '.js'
    fs.writeFile(fileName, js, function (err) { if (err) throw err })
    console.log(`    1 - wrote ${responseJson.length} Mapbox GeoCode responses to '${fileName}'.`)
}

function filter(responseJson) {
    const {type, features, attribution, q} = responseJson
    console.log(`Query: "${q}"`)
    // for(let j=0; j<features.length; j++) {
    //     const {type, id, geometry, properties} = features[j]
    //     console.log(`Feature: ${i+1} type: "${type}" id: "${id}"`)
    //     console.log('geomtery', geometry)
    //     console.log('properties', properties)
    // }
}
console.log('--------------------------------------------------------')
const limit = 10

async function requestUSA() {
    const _types = ['country',
        'country',  // 'USA', return just the 3 USA countries
        'region',   // 'USA,KY' Returns "Kentucky", "Kyoto, Japan", "Kyiv, Ukraine" plus 6 more
        'district', // 'USA,KY,Floyd' all the 'Floyd County' in KY, VA, GA, IA, TX, IN,
        'place,locality'] // "USA,KY,Floyd,Prestonsburg"
    const requests = []
    for(let i=0; i<_geoLocationCounts.length; i++) {
        const q = _geoLocationCounts[i][0]
        const segments = q.split(',')
        if (segments[0] === 'USA') {
            let types = _types[segments.length]
            requests.push({types, limit, q})
        }
    }
    await getGeoCode(requests, 'USA')
    return requests
}

const requestExamples = [
    // Returns all the 'Floyd County' in KY, VA, GA, IA, TX, IN,
    // {types: 'district', limit, q:'USA,KY,Floyd'},
    
    // Returns "United States", "US Virgin Islands", "US Minor Outlying Islands"
    // {types: 'country', limit, q:'USA'},

    // Returns "Kentucky", "Kyoto, Japan", "Kyiv, Ukraine" plus 6 more
    // {types: 'region', limit, q:'USA,KY'},

    // Returns place=Prestonsburg and locality='Floyd,Eubank,Pulaski COunty,TN'
    // {types: 'place,locality', limit, q:'USA,KY,Floyd,Prestonsburg'},

    {types: 'place', limit, q:'USA,KY,Floyd,Prestonsburg'},

    // Also returns all the 'Floyd County' in each state
    // {types: 'district,region', limit, q:'USA,KY,Floyd,Floyd'},
    
    // Returns nothing
    // {types: 'district', limit, country: 'US', region: 'KY', district: 'Floyd'},

    // Returns just the region 'Kentucky, USA'
    // {types: 'locality,district,region', limit, country: 'USA', region: 'KY', district: 'Floyd'},
]

console.log(`\n${progName}`)
requestUSA()
console.log(`    Successfully completed in ${new Date()-time1} msec`)
