function bornHere(events) {
    for(let i=0; i<events.length; i++) {
        const [id, type, year, place] = events[i]
        if (type === 'birth') return true
    }
    return false
}

function collectBirths(persons) {
    const births = []
    for(let i=0; i<persons.length; i++) {
        const [idx, nameKey, birthYear, gen, nevents, events] = persons[i]
        if (bornHere(events)) births.push([nameKey, birthYear, gen])
    }
    return births
}

export function birthsByVicinity(vicinities) {
    const vicins = []
    for (let i=0; i<vicinities.length; i++) {
        const [location, label, n, persons] = vicinities[i]
        const births = collectBirths(persons)
        if (births.length) vicins.push([location, label, births])
    }
    // Sort by number of births in decreasing order
    return vicins.sort((a, b) => { return b[2].length - a[2].length })
}

export function birthsByVicinitySummary(vicins) {
    const summary = []
    for (let i=0; i<vicins.length; i++) {
        const [location, label, people] = vicins[i]
        let genMin = 999999
        let genMax = -999999
        let birthMin = 999999
        let birthMax = -999999
        for(let j=0; j<people.length; j++) {
            const [nameKey, birth, gen] = people[j]
            genMax = Math.max(genMax, gen)
            genMin = Math.min(genMin, gen)
            birthMax = Math.max(birthMax, birth)
            birthMin = Math.min(birthMin, birth)
        }
        summary.push([people.length, genMin, genMax, birthMin, birthMax])
    }
    return summary
}
