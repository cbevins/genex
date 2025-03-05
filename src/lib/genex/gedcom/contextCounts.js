import { parseLine } from './parseLine.js'

export function contextCounts(_gedcomData) {
    const contexts = new Array(20).fill(0)
    const map = new Map()
    for(let i=0; i<_gedcomData.length; i++) {
        const lineNo = i + 1
        const data = parseLine(_gedcomData[i], lineNo)
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
