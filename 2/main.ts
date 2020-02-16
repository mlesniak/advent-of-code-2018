// Day 1
import fs from 'fs'

type Lines = string[]

function load(): Lines {
    const input = fs.readFileSync('input.txt', 'utf-8')
    return input.split("\n")
        .filter(line => line.length > 0)
}

function part1() {
    const lines = load()

    let count2 = 0
    lines.forEach(l => {
        if (countLetters(l, 2)) {
            count2++
        }
    })

    let count3 = 0
    lines.forEach(l => {
        if (countLetters(l, 3)) {
            count3++
        }
    })

    const result = count2 * count3
    console.log(result)
}

function part2() {
    const lines = load()

    for(const line1 of lines) {
        for(const line2 of lines) {
            if (line1 === line2) {
                continue
            }
            const c = checkIds(line1, line2)
            if (c.numDifferences === 1) {
                console.log(c.sameChars)
                return
            }
        }
    }
}

// part1()
part2()

interface CheckResult {
    numDifferences: number
    sameChars: string
}

function checkIds(line1: string, line2: string): CheckResult {
    let numDifferences = 0
    let sameChars = ''

    for(let i = 0; i < line1.length; i++) {
        if (line1[i] !== line2[i]) {
            numDifferences++
        } else {
            sameChars += line1[i]
        }
    }

    return {
        numDifferences,
        sameChars
    }
}


function countLetters(s: string, count: number): number {
    const counter = new Map<string, number>()

    // Build map.
    for (const c of s) {
        let cur = counter.get(c)
        if (cur === undefined) {
            cur = 0
        }
        counter.set(c, cur + 1)
    }

    // Check count.
    let counts = 0
    for (const v of counter.values()) {
        if (v === count) {
            counts++
        }
    }

    return counts
}