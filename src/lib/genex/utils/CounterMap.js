export class CounterMap {
    constructor() {
        this._map = new Map()
    }
    add(item) {
        if (this._map.has(item)) {
            const n = this._map.get(item)
            this._map.set(item, n+1)
        } else {
            this._map.set(item, 1)
        }
        return this
    }

    byItem() { return Array.from(this._map.entries()) }

    byCount() {
        const ar = Array.from(this._map.entries()).sort((a, b) => {
            const [aKey, aN] = a
            const [bKey, bN] = b
            if (bN - aN) return (bN - aN)
            return aKey.localeCompare(bKey)
        })
        return ar
    }

    map() { return this._map }
}