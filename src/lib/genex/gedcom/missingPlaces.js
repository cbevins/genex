import { parseLine } from './parseLine.js'

export function missingPlaces(gedcomLines, knownKeys) {
    const missing = new Map()
    for (let i=0; i<gedcomLines.length; i++) {
        const data = parseLine(gedcomLines[i], i+1)
        if (data) {
            const [level, type, content] = data
            if (type === 'PLAC') {
                if (! knownKeys.has(content)) {
                    if (! missing.has(content) ) missing.set(content, 0)
                    const n = missing.get(content)
                    missing.set(content, n+1)
                }
            }
        }
    }
    return Array.from(missing).sort()
}
