import fs from 'fs'
import log from './log'

enum Action {
    BeginShift,
    Sleep,
    WakeUp
}

interface Line {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    action: string
}

function toString(l: Line): string {
    function d2(s: number): string {
        if (s < 10) {
            return `0${s}`
        }

        return `${s}`
    }

    return `[${l.year}-${d2(l.month)}-${d2(l.day)} ${d2(l.hour)}:${d2(l.minute)}] ${l.action}`
}

function load() {
    const input = fs.readFileSync('input.txt', 'utf-8')
    return input.split("\n")
        // .slice(0, 100)
        .map(parseLine)
        .sort(compareDates)
}

function compareDates(a: Line, b: Line): number {
    if (a.year < b.year) {
        return -1
    } else if (a.year > b.year) {
        return 1
    }

    if (a.month < b.month) {
        return -1
    } else if (a.month > b.month) {
        return 1
    }

    if (a.day < b.day) {
        return -1
    } else if (a.day > b.day) {
        return 1
    }

    if (a.hour < b.hour) {
        return -1
    } else if (a.hour > b.hour) {
        return 1
    }

    if (a.minute < b.minute) {
        return -1
    } else if (a.minute > b.minute) {
        return 1
    }

    return 0
}


function parseLine(line: string): Line {
    const re = new RegExp("^.(....)-(..)-(..) (..):(..). (.*)$")
    const match = re.exec(line)
    if (match === null) {
        throw new Error(`Parse error on ${line}`)
    }

    const g: Line = {
        year: Number(match[1]),
        month: Number(match[2]),
        day: Number(match[3]),
        hour: Number(match[4]),
        minute: Number(match[5]),
        action: match[6]
    }

    return g
}

let sorted = load()
sorted
    .map(toString)
    .forEach(log)