// Attempts to create a valid, standardized date JSON object from a Date text string
const MonthAbr = ['???', 'Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const MonthFull = ['Unknown', 'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December']

const Months = new Map([
    ['jan', 1], ['feb', 2], ['mar', 3], ['apr', 4], ['may', 5], ['jun', 6],
    ['jul', 7], ['aug', 8], ['sep', 9], ['oct', 10], ['nov', 11], ['dec', 12]
])

const Ignore = ['', 'and', 'est', 'or', 'to', 'unk', 'civ', 'war' ]

const Quals = new Map([
    ['ab', 'about'],
    ['abo', 'about'],
    ['abt', 'about'],
    ['af', 'after'],
    ['aft', 'after'],
    ['bef', 'before'],
    ['bet', 'between'],
    ['btw', 'between'],
    ['c', 'circa'],
    ['cir', 'circa'],
    ['civ', ''], // catches the 'Civil War' date
    ['ear', 'early'],
    // ['est', 'estimated'],
    ['pre', 'pre'],
])

export class EvDate {
    constructor(text) {
        this._data = {
            text: text,
            year: 0,
            month: 0,
            day: 0,
            qual: '',
            time: 0,
            year2: 0,
            str: '',
            msg: null
        }
        this._parseDate(text)
    }

    day() { return this._data.day }
    month() { return this._data.month }
    msg() { return this._data.msg }
    qual() { return this._data.qual }
    str() { return this._data.str }
    text() { return this._data.text }
    time() { return this._data.time }
    year() { return this._data.year }
    year2() { return this._data.year2 }
    yearDecimal() { return this.year() + this.month()/12 + this.day()/365 }

    // Parses the text to attempt to create a valid, standardized date JSON object
    // Returns {text: 'abt 04 Sep 1952', year: 1952, month: 9, day: 4, qual: 'about', time: null, year2: 0, str: 'about 4 Sep 1952', msg: null}
    _parseDate(text) {
         // Remove all punctuation (except / and :) and extra spaces and convert to lower case
        let parts = text
            .trim()
            .replace(/[-]/g," ")
            .replace(/[.,#!$%\^&\*;{}=\-_`~()]/g,"")
            .replace(/\s{2,}/g," ")
            .toLowerCase()
            .split(' ')
        if (parts.length === 0) {
            this._data.msg = 'Date text is empty'
            return
        }
        for(let i=0; i<parts.length; i++) {
            let part = parts[i]
            let key = part.substr(0, 3)
            let n = parseInt(part, 10)
            // console.log(`Part ${i} is '${part}'`)
            if (part.indexOf('/') >= 0) {
                const [m,d,y] = part.split('/')
                this._data.day = parseInt(d, 10)
                this._data.month = parseInt(m, 10)
                this._data.year = parseInt(y, 10)
            } else if (part.indexOf(':') >= 0) {
                this._data.time = part
            } else if (key === 'am' || key === 'pm') {
                this._data.time += ' ' + key
            } else if (Months.has(key)) {
                if (! this._data.month)  // never replace an existing month with a second on
                    this._data.month = Months.get(key)
            } else if (Quals.has(key)) {
                this._data.qual = Quals.get(key)
            } else if (Ignore.includes(key)) { // ignore
            } else if (n > 1000) { // years must be >= 1000
                if (this._data.year) {
                    this._data.year2 = n // between, to, etc
                } else {
                    this._data.year = n
                }
            } else if (n <= 31) {
                if (! this._data.day) // never replace an existing day with a second one
                    this._data.day = n
            } else {
                this._data.msg = `Date text ${text} has '${n}' for part ${i}: '${parts[i]}'`
            }
            if (this._data.day === null) this._data.day = 0
            this._data.str = this.formatDate()
        }
    }

    // 'date' is object with: {year: 1952, month: 9, day: 4, qual: 'about', year2: 0, msg: null, time: null}
    formatDate(unknown='?') {
        let d = (this.qual() === '') ? '' : this.qual() + ' '
        if (this.day()) {
            d += this.day() + ' ' + MonthAbr[this.month()] + ' '+ this.year()
        } else if (this.month()) {
            d += MonthAbr[this.month()] + ' ' + this.year()
        } else if (this.year()) {
            d += this.year()
            if (this.year2()) d += '-' + this.year2()
        } else {
            d = unknown
        }
        return d
    }
}
/**
 * Calculates [years,  months, days] between two EvDates
 * @param {EvDate} from Starting EvDate instance
 * @param {EvDate} thru Ending EvDate instance: if null, the current Date is used
 * @returns Returns [years, months, days] between from and thru dates.
 */
export function dateDiff(from, thru=null) {
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
