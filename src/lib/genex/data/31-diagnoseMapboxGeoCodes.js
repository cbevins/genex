import { _mapboxGeoCodesUSA } from './diagnostics/genex/_mapboxGeoCodesUSA.js'

function examine(responseJson) {
    const results = []
    const locations = responseJson.batch
    for (let i=0; i<locations.length; i++) {
        const {features, q} = locations[i]
        if (! features.length) {
            err(i, q, "No GeoCode Feature found")
            continue
        }
        const segments = q.split(',')
        const [qcountry, qregion, qdistrict, qplace, qlocality] = segments
        const nsegments = segments.length
        // Score each features from the list of matches
        const scores = []
        for(let j=0; j<features.length; j++) {
            let score = 0
            let extra = 0
            let short = []
            let long = []
            const {type, id, geometry, properties} = features[j]
            const {feature_type, full_address, name, name_preferred,
                coordinates, place_formatted, bbox, context} = properties
            // Score if feature country context matches query contry
            if (context.country && qcountry === context.country.country_code_alpha_3) {
                score++
                short.push[context.country.country_code_alpha_3]
                long.push(context.country.name)
                if (nsegments>1) {
                    // Score if feature region (state/province) matches context region_code
                    if (context.region && qregion === context.region.region_code) {
                        score++
                        short.push(context.region.region_code)
                        long.push(context.region.name)
                        if (nsegments > 2) {
                            // Score if feature district (county) starts with with district name
                            if (context.district && context.district.name.startsWith(qdistrict)) {
                                score++
                                short.push(context.district.name)
                                long.push(context.district.name)
                                if (qcountry === 'USA' && context.district.name.includes('County')) extra++
                            }
                            if (nsegments > 3) {
                                if (context.place && context.place.name.includes(qplace)) {
                                    score++
                                    short.push(context.place.name)
                                    long.push(context.place.name)
                                }
                                if (nsegments > 4) {
                                    if (context.locality && context.locality.name.includes(qlocality)) {
                                        score++
                                        short.push(context.locality.name)
                                        long.push(context.locality.name)
                                    } else
                                    if (context.neighborhood && context.neighborhood.name.includes(qlocality)) {
                                        score++
                                        short.push(context.neighborhood.name)
                                        long.push(context.neighborhood.name)
                                    }
                                    // context.street and context.address ?
                                }
                            }
                        }
                    }
                }
            }
            scores.push({idx: j, score, extra, n: nsegments, q, long, short})
        }
        // Select best score
        scores.sort((a, b) => {
            if (a.score != b.score) return b.score - a.score
            if (a.extra != b.extra) return b.extra - a.extra
            return a.idx - b.idx})
        results.push(scores[0])
    }
    return results
}

const results = examine(_mapboxGeoCodesUSA)
const review = []
for(let i=0; i<results.length; i++) {
    const {idx, score, extra, n, q, long, short} = results[i]
    let str = `${i}: [${score}/${n}, ${extra}] "${q}" => "${long.join(',')}"`
    if (score !== n) review.push(str)
    console.log(str)
}

console.log(`${review.length} of ${results.length} GeoCodes need review.`)
