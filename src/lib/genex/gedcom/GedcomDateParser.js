import { Tokenizer } from '../utils/Tokenizer.js'

export class GedcomDateParser {
    constructor(knownQuals=[], knownMonths=[]) {
        const tokenizer = new Tokenizer().addSep(' ').addSep(',').addSep('.').addSep('-').addSep(';')
        const dateTokenizer = new Tokenizer().addSep('/')
        const spanTokenizer = new Tokenizer().addSep('-').addSep(';')
        const timeTokenizer = new Tokenizer().addSep(':')
        this._data = {
            tokenizer,
            dateTokenizer,
            spanTokenizer,
            timeTokenizer,
            knownMonths: new Map(knownMonths),
            knownQuals: new Map(knownQuals),
        }
        this._result = {parsed: null, date: null}
    }

    getMonth(token) {
        const mon = token.slice(0, 3).toLowerCase()
        return this._data.knownMonths.get(mon)
    }

    getQual(token) {
        const qual = token.slice(0, 3).toLowerCase()
        return this._data.knownQuals.get(qual)
    }

    getSlashDate(token) {
        const segments = this._data.dateTokenizer.tokenize(token)
        return [parseInt(segments[0]), parseInt(segments[1]), parseInt(segments[2])]
    }

    getSpan(token) {
        return this._data.spanTokenizer.tokenize(token)
    }

    getTime(token) {
        const segments = this._data.timeTokenizer.tokenize(token)
        return [parseInt(segments[0]), parseInt(segments[1]), parseInt(segments[2])]
    }

    parse(dateStr) {
        const tokens = this._data.tokenizer.tokenize(dateStr)
        const d = {seq: [], years: [], months: [], days: [], quals: [],
            thrus: [], dates: [], times: [], ampms: [], unks: [], useCase: 0}
        while(tokens.length) {
            const token = tokens.shift()
            if (this.isYear(token)) {
                d.seq.push('year')
                d.years.push(parseInt(token))
            } else if (this.isMonth(token)) {
                d.seq.push('month')
                d.months.push(this.getMonth(token))
            } else if (this.isDay(token)) {
                d.seq.push('day')
                d.days.push(parseInt(token))
            } else if (this.isQual(token)) {
                d.seq.push('qual')
                d.quals.push(this.getQual(token))
            } else if (this.isSlashDate(token)) {
                const [m, day, y] = this.getSlashDate(token)
                d.seq.push('date')
                d.months.push(m)
                d.days.push(day)
                d.years.push(y)
            } else if (this.isSpan(token)) {
                const [from, thru] = this.getSpan(token)
                d.seq.push('span')
                d.years.push(from)
                d.thrus.push(thru)
            } else if (this.isTime(token)) {
                const [h, m, s] = this.getTime(token)
                d.seq.push('time')
                d.times.push(token)
            } else if (token === "AM" || token === "PM") {
                d.seq.push('ampm')
                d.ampms.push(token)
            } else {
                d.seq.push('unknown')
                d.unks.push(token)
            }
        }

        // Check possible cases
        const seq = d.seq.join(' ')
        let d8
        if (! seq.length) {
            d.useCase = 1
            d8 = {y: 0, m: 0, d: 0, q: '', y2: 0}
        } else if (seq === 'year') {
            d.useCase = 2
            d8 = {y: d.years[0], m: 0, d: 0, q: '', y2: 0}
        } else if (seq === 'month year') {
            d.useCase = 3
            d8 = {y: d.years[0], m: d.months[0], d: 0, q: '', y2: 0}
        } else if (seq === 'day month year') {
            d.useCase = 4
            d8 = {y: d.years[0], m: d.months[0], d: d.days[0], q: '', y2: 0}
        } else if (seq === 'qual day month year') {
            d.useCase = 5
            d8 = {y: d.years[0], m: d.months[0], d: d.days[0], q: d.quals[0], y2: 0}
        } else if (seq === 'qual month year') {
            d.useCase = 6
            d8 = {y: d.years[0], m: d.months[0], d: 0, q: d.quals[0], y2: 0}
        } else if (seq === 'qual year') {
            d.useCase = 7
            d8 = {y: d.years[0], m: 0, d: 0, q: d.quals[0], y2: 0}
        } else if (seq === 'month day year') {
            d.useCase = 8
            d8 = {y: d.years[0], m: d.months[0], d: d.days[0], q: '', y2: 0}
        } else if (seq === 'month qual year') {
            d.useCase = 9
            d8 = {y: d.years[0], m: d.months[0], d: 0, q: d.quals[0], y2: 0}
        } else if (seq === 'day month qual year') {
            d.useCase = 10
            d8 = {y: d.years[0], m: d.months[0], d: d.days[0], q: d.quals[0], y2: 0}
        } else if (seq === 'year year') {
            d.useCase = 11
            d8 = {y: d.years[0], m: 0, d: 0, q: '', y2: d.years[1]}
        } else if (seq === 'qual year year') {
            d.useCase = 12
            d8 = {y: d.years[0], m: 0, d: 0, q: d.quals[0], y2: d.years[1]}
        } else if (seq === 'year qual year') {
            d.useCase = 12
            d8 = {y: d.years[0], m: 0, d: 0, q: d.quals[0], y2: d.years[1]}
        } else if (seq === 'qual year qual year') {
            d.useCase = 12
            d8 = {y: d.years[0], m: 0, d: 0, q: d.quals[0], y2: d.years[1]}
        } else if (seq === 'day month year qual day month year') {
            d.useCase = 13   // 0
            d8 = {y: d.years[0], m: d.months[0], d: d.days[0], q: d.quals[0], y2: d.years[1]}
        } else if (seq === 'qual qual year qual year') {
            d.useCase = 14    // 0
            d8 = {y: d.years[0], m: 0, d: 0, q: d.quals[0], y2: d.years[1]}
        // } else if (seq === 'span') {
        // useCase = 15 // 0
        } else if (seq === 'date') {
            d.useCase = 16
            d8 = {y: d.years[0], m: d.months[0], d: d.days[0], q: '', y2: 0}
        } else if (seq === 'date time') {
            d.useCase = 17 //
            d8 = {y: d.years[0], m: d.months[0], d: d.days[0], q: '', y2: 0}
        } else if (seq === 'date time ampm') {
            d.useCase = 18 //
            d8 = {y: d.years[0], m: d.months[0], d: d.days[0], q: '', y2: 0}
        } else if (seq === 'qual' && d.quals[0] === 'unknown') {
            d.useCase = 19
            d8 = {y: 0, m: 0, d: 0, q: '', y2: 0}
        }
        d.seq = seq
        this._result = {parsed: d, date: d8}
        return d
    }

    // Must be 1 or 2-char integer string between 1 and 31
    // Returns [success, year]
    isDay(token) {
        if (token.length < 1 || token.length > 2) return false
        let str = ''
        for(let i=0; i<token.length; i++) {
            const code = token.charCodeAt(i)
            if (code >= 48 && code <= 57) str += token.charAt(i)
            else return false
        }
        const day = parseInt(str)
        return (day > 0 && day < 32)
    }

    isMonth(token) {
        const mon = token.slice(0, 3).toLowerCase()
        return this._data.knownMonths.has(mon)
    }

    isQual(token) {
        const qual = token.slice(0, 3).toLowerCase()
        return this._data.knownQuals.has(qual)
    }

    isSlashDate(token) {
        const segments = this._data.dateTokenizer.tokenize(token)
        if (segments.length !== 3) return false
        const month = parseInt(segments[0])
        if (month < 1 || month > 12) return false
        const day = parseInt(segments[1])
        if (day < 1 || day > 31) return false
        const year = parseInt(segments[2])
        return (year >= 1000 && year <= 2050)
    }

    isSpan(token) {
        const segments = this._data.spanTokenizer.tokenize(token)
        if (segments.length !== 2) return false
        return this.isYear(segments[0]) && this.isYear(segments[1])
    }

    isTime(token) {
        const segments = this._data.timeTokenizer.tokenize(token)
        if (segments.length !== 3) return false
        const hour = parseInt(segments[0])
        if (hour < 0 || hour > 24) return false
        const min = parseInt(segments[1])
        if (min < 0 || min > 59) return false
        const sec = parseInt(segments[2])
        if (sec < 0 || sec > 59) return false
        return true
    }

    // Must be 4-char integer string between 1000 and 2500
    // Returns [success, year]
    isYear(token) {
        if (token.length !== 4) return false
        let str = ''
        for(let i=0; i<token.length; i++) {
            const code = token.charCodeAt(i)
            if (code >= 48 && code <= 57) str += token.charAt(i)
            else return false
        }
        const year = parseInt(str)
        return (year >= 1000 && year <= 2050)
    }

    eventDate(dateStr) {
        this.parse(dateStr)
        return this._result.date
    }
}
