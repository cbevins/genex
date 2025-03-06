import { parseRecord } from './parseRecord.js'

export function selectLines(_gedcomRecords, selectSet=null) {
    const selected = []
    const contexts = new Array(20).fill(0)
    for (let i=0; i<_gedcomRecords.length; i++) {
        const recNo = i+1
        const data = parseRecord(_gedcomRecords[i], recNo)
        if (data) {
            const [level, type, content] = data
            contexts[level] = type
            const key = (contexts.slice(0,level+1)).join('-')
            if (!selectSet || (selectSet && selectSet.has(key))) {
                selected.push(_gedcomRecords[i])
            }
        }
    }
    return selected
}
