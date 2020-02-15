// Day 1
import fs from 'fs'

function load(): Array<number> {
    const input = fs.readFileSync('input.txt', 'utf-8')
    return input.split("\n")
        .filter(line => line.length > 0)
        .map(line => {
            return Number(line)
        })
}

function part1() {
    let frequencies = load()
    let current = 0

    frequencies.map(f => {
        current += f
    })

    console.log(current)
}

function part2() {
    let frequencies = load()
    let current = 0
    let index = 0

    let repeat = new Map<number, boolean>()
    while (true) {
        current += frequencies[index]
        if (repeat.has(current)) {
            console.log(current)
            break
        }
        repeat.set(current, true)
        index = (index + 1) % frequencies.length
    }
}

// part1()
part2()