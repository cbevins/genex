/**
 * Calulates [years,  months, days] between two EvDates
 * @param {EvDate} from Starting EvDate instance
 * @param {EvDate} thru Ending EvDate instance: if null, the current Date is used
 * @returns Returns [years, months, days] between from and thru dates.
 */
export function age(from, thru=null) {
    const days = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (! from.year()) return [0, 0, 0]
    if (! thru) thru = new TodaysDate()
    let y = thru.year() - from.year()
    let m = thru.month() - from.month()
    let d = thru.day() - from.day()
    if (d < 0) {
        m -= 1
        d += days[Math.max(0, thru.month()-1)]
    }
    if (m < 0) {
        y -= 1
        m += 12
    }
    return [y, m, d]
}

class TodaysDate {
    constructor() {
        this.now = new Date()
    }
    day() { return this.now.getDate() }
    month() { return this.now.getMonth()+1 }
    year() { return this.now.getFullYear() }
}
