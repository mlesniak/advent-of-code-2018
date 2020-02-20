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

function load() {
    const input = fs.readFileSync('input.txt', 'utf-8')
    return input.split("\n")
        .slice(0, 4)
        .map(parseLine)
}

function parseLine(line: string): Line {
    log(line)
    const re = new RegExp("^.(....)-(..)-(..) (..):(..). (.*)$")
    const match = re.exec(line)
    if (match === null) {
        throw new Error(`Parse error on ${line}`)
    }

    const g: Line  = {
        year: Number(match[1]),
        month: Number(match[2]),
        day: Number(match[3]),
        hour: Number(match[4]),
        minute: Number(match[5]),
        action: match[6]
    }

    log(g)
}

load()