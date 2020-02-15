// Day 1
import fs from 'fs'

type Lines = Array<string>

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

}

part1()
// part2()

function countLetters(s: string, count: number): number {
    let counter = new Map<string, number>()

    // Build map.
    for (let i = 0; i < s.length; i++) {
        let c = s[i]
        let cur = counter.get(c)
        if (cur === undefined) {
            cur = 0
        }
        counter.set(c, cur + 1)
    }

    // Check count.
    let c = 0
    for (let v of counter.values()) {
        if (v === count) {
            c++
        }
    }

    return c
}