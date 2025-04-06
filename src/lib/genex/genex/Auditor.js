export class Auditor {
    constructor() {
        this.person = null
        this.adultAge = 15
        this.spouseDiff = 15
    }

    audit(person) {
        this.person = person
        const log = []
        const gedKey = person.gedKey()
        const nameKey = person.nameKey()

        function report(code, msg) { log.push([code, msg]) }
        
        // Test 1 - Must have at least 1 family member
        if (! person.famcKey() && ! person.fams().length)
            report('ISOLATE', 'Has no Childhood or Adulthood family members')

        // Test 2 - must have been born before death!
        const birthYear = person.birthYear()
        const deathYear = person.deathYear()
        if (birthYear && deathYear && birthYear > deathYear)
            report('DEATH-BEFORE-BIRTH', `Born in ${birthYear} but died in ${deathYear}`)

        const mother = person.mother()
        const father = person.father()

        // Test 3 - unknown birth year
        if (! birthYear ) {
            report('BIRTH-YEAR-MISSING', `Missing birth year`)
            if (mother && mother.birthYear() && mother.birthYear() < birthYear) {
                report('BIRTH-YEAR-HINT', `Mother was known to be born in ${mother.birthYear()}`)
            }
            if (father && father.birthYear() && father.birthYear() < birthYear) {
                report('BIRTH-YEAR-HINT', `Father was known to be born in ${father.birthYear()}`)
            }
        }
        // else if known birth year
        else {
            // Test 4 - compare birth year with mother's birth and death years
            if (mother && mother.birthYear()) {
                const age = birthYear - mother.birthYear()
                if (age < this.adultAge)
                    report('MOTHER-TOO-YOUNG', `Born in ${birthYear} when mother '${mother.label()} - ${mother.birthYear()}' was age ${age}`)
                if (mother.deathYear() && mother.deathYear() < birthYear)
                    report('MOTHER-DECEASED', `Born in ${birthYear} but mother '${mother.label()}' died in ${mother.birthYear()}`)
            }
            // Test 5 - compare birth year with father's birth and death years
            if (father && father.birthYear()) {
                const age = birthYear - father.birthYear()
                if (age < this.adultAge)
                    report('FATHER-TOO-YOUNG', `Born in ${birthYear} when father '${father.label()} - ${father.birthYear()}' was age ${age}`)
                if (father.deathYear() && father.deathYear() < birthYear)
                    report('FATHER-DECEASED', `Born in ${birthYear} but father '${father.label()}' died in ${father.birthYear()}`)
            }
            // Test 6 -compare age difference with spouses
            for(let i=0; i<person.fams().length; i++) {
                if (person.famsKey(i)) {
                    const family = person.famsFamily(i)
                    const spouse = person.famsSpousePerson(i)
                    if(spouse && spouse.birthYear()) {
                        const diff = Math.abs(birthYear - spouse.birthYear())
                        if (diff > this.spouseDiff)
                            report('SPOUSE-AGE', `Born in ${birthYear} but spouse born in ${spouse.birthYear()}, a ${diff} year diff`)
                    }
                    // Test 7 - compare birth and death years with children's birth years
                    for(let j=0; j<family.children().length; j++) {
                        const child = family.childPerson(j)
                        if (child.birthYear()) {
                            const age = child.birthYear() - birthYear
                            if (age < this.adultAge)
                                report('NOT-OF-AGE', `Born in ${birthYear} but issued child '${child.label()} - ${child.birthYear()}' at age ${age}`)
                            if (deathYear && child.birthYear() > deathYear)
                                report('CHILD-AFTER-DEATH', `Died in ${deathYear} but issued child '${child.label()}' in ${child.birthYear()}`)
                        }
                    }
                }
            }

            if (person.lineage()) {
                if (person.file() !== person.lineageFile()) {
                    report('FILE-SEQ', `Seq number ${person.lineageSeq()} expected file '${person.lineageFile()}', not '${person.file()}'`)
                }
            }
        }

        return {person, gedKey, nameKey, log}
    }
}