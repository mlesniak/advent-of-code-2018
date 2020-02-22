import fs from 'fs'
import log from './log'

function load(): string {
    const input = fs.readFileSync('input.txt', 'utf-8')
    return input
}

let input = load()
// log(input)
// input = "dabAcCaCBAcCcaDA"
// input = "abBA"
// input = "aabAAB"

let changed = true
while (changed) {
    // log(input)
    changed = false
    for (let i = 0; i < input.length - 1; i++) {
        const a = input[i]
        const b = input[i + 1]

        if ((a.toLowerCase() === b && a === a.toUpperCase()) ||
            (a.toUpperCase() === b && a === a.toLowerCase())) {
            changed = true
            // log("Found:", i)
            const left = input.substr(0, i)
            const right = input.substr(i + 2)
            input = left + right
        }
    }
}

// log(input)
log(input.length)