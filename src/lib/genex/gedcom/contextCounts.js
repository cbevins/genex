import { parseRecord } from './parseRecord.js'

export function contextCounts(_gedcomRecords) {
    const contexts = new Array(20).fill(0)
    const map = new Map()
    for(let i=0; i<_gedcomRecords.length; i++) {
        const recNo = i + 1
        const data = parseRecord(_gedcomRecords[i], recNo)
        if (data) {
            const [level, type, content] = data
            contexts[level] = type
            const key = (contexts.slice(0,level+1)).join('-')
            if (!map.has(key)) map.set(key,0)
            map.set(key, map.get(key)+1)
        }
    }
    const ar = Array.from(map).sort()
    return ar
}
