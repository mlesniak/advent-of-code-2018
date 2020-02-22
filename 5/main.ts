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

// Iterate over all chars.
let min = input.length + 1
for (const c of 'abcdefghijklmnopqrstuvwxyz') {
    const re = new RegExp(c, 'gi')
    const tmp = input.replace(re, '')
    const n = applyPolymer(tmp)
    log(c, n)
    if (min > n) {
        min = n
    }
}

log(min)


function applyPolymer(input: string): number {
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

    return input.length
}
