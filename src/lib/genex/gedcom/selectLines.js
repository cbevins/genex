import { parseLine } from './parseLine.js'

export function selectLines(lines, selectSet=null) {
    const selected = []
    const contexts = new Array(20).fill(0)
    for (let i=0; i<lines.length; i++) {
        const data = parseLine(lines[i], i+1)
        if (data) {
            const [level, type, content] = data
            contexts[level] = type
            const key = (contexts.slice(0,level+1)).join('-')
            if (!selectSet || (selectSet && selectSet.has(key))) {
                selected.push(lines[i])
            }
        }
    }
    return selected
}
