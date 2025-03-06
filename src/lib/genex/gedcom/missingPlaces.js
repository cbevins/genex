import { parseRecord } from './parseRecord.js'

export function missingPlaces(_gedcomRecords, knownKeys) {
    const missing = new Map()
    for (let i=0; i<_gedcomRecords.length; i++) {
        const recNo = i + 1
        const data = parseRecord(_gedcomRecords[i], recNo)
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
