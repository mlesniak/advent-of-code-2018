// Day 1
import fs from 'fs'

function load() {
    const input = fs.readFileSync('input.txt', 'utf-8')
    return input.split("\n").map(line => {
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

part1()

