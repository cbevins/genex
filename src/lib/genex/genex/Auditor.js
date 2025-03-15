export class Auditor {
    constructor() {
        this.person = null
    }

    audit(person) {
        this.person = person
        const log = []
        const gedKey = person.gedKey()
        const nameKey = person.nameKey()

        function report(code, msg) { log.push([code, msg]) }
        
        // Test 1
        if (! person.famcKey() && ! person.fams().length)
            report('ISOLATE', 'Has no Childhood or Adulthood family members')

        // Test 2
        const birthYear = person.birthYear()
        const deathYear = person.deathYear()
        if (birthYear && deathYear && birthYear > deathYear)
            report('DEAD-BEFORE-BIRTH', `Born in ${birthYear} but died in ${deathYear}`)

        const mother = person.mother()
        const father = person.father()

        // If unknown birth year
        if (! birthYear ) {
            if (mother && mother.birthYear() && mother.birthYear() > birthYear) {
                report('BIRTH-MISSING-HINT', `Mother was known to be born in ${mother.birthYear()}`)
            }
            if (father && father.birthYear() && father.birthYear() > birthYear) {
                report('BIRTH-MISSING-HINT', `Father was known to be born in ${father.birthYear()}`)
            }
        }
        // else if known birth year
        else {
            // compare birth year with mother's birth and death years
            if (mother) {
                if (mother.birthYear() && mother.birthYear() > birthYear)
                    report('BORN-BEFORE-MOTHER', `Born in ${birthYear} but mother '${mother.label()}' was born in ${mother.birthYear()}`)
                else if (mother.birthYear() && mother.birthYear() > birthYear+15)
                    report('BORN-UNDERAGE-MOTHER', `Born in ${birthYear} but mother '${mother.label()}' was born in ${mother.birthYear()}`)
                if (mother.deathYear() && mother.deathYear() < birthYear)
                    report('BORN-DECEASED-MOTHER', `Born in ${birthYear} but mother '${mother.label()}' died in ${mother.birthYear()}`)
            }
            // compare birth year with mother's birth and death years
            if (father) {
                if (father.birthYear() && father.birthYear() >= birthYear)
                    report('BORN-BEFORE-FATHER', `Born in ${birthYear} but father '${father.label()}' was born in ${father.birthYear()}`)
                else if (father.birthYear() && father.birthYear() > birthYear+15)
                    report('BORN-UNDERAGE-FATHER', `Born in ${birthYear} but father '${father.label()}' was born in ${father.birthYear()}`)
                if (father.deathYear() && father.deathYear() < birthYear)
                    report('BORN-DECEASED-FATHER', `Born in ${birthYear} but father '${father.label()}' died in ${father.birthYear()}`)
            }
            // compare brth and death with children
            for(let i=0; i<person.fams().length; i++) {
                if (person.famsKey(i)) {
                    const family = person.famsFamily(i)
                    for(let j=0; j<family.children().length; j++) {
                        const child = family.childPerson(j)
                        if (child.birthYear() && child.birthYear() < birthYear+15)
                            report('CHILD-UNDERAGE', `Born in ${birthYear} but issued child '${child.label()}' in ${child.birthYear()} at age ${child.birthYear()-birthYear}`)
                        if (deathYear && child.birthYear() && child.birthYear() > deathYear)
                            report('CHILD-AFTER-DEATH', `Died in ${deathYear} but issued child '${child.label()}' in ${child.birthYear()}`)
                    }
                }
            }
        }

        return {person, gedKey, nameKey, log}
    }
}