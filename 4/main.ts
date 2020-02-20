import fs from 'fs'
import log from './log'

enum Action {
    BeginShift,
    Sleep,
    WakeUp
}

interface Guard {
    id: string

    year: number
    month: number
    day: number

    hour: number
    minute: number

    action: Action
}

function load(): Guard[] {
    const input = fs.readFileSync('input.txt', 'utf-8')
    return input.split("\n")
        .map(parseLine)
}

function parseLine(line: string): any {
    log(line)
}

load()