import fs from 'fs'
import log from './log'

enum Action {
    BeginShift,
    Sleep,
    WakeUp
}

interface Guard {
    year: number
    month: number
    day: number
    hour: number
    minute: number

    actionDescription: string
    action?: Action
}

function toString(l: Guard): string {
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
        // .slice(0, 10)
        .map(parseLine)
        .sort(compareDates)
}

function compareDates(a: Guard, b: Guard): number {
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


function parseLine(line: string): Guard {
    const re = new RegExp("^.(....)-(..)-(..) (..):(..). (.*)$")
    const match = re.exec(line)
    if (match === null) {
        throw new Error(`Parse error on ${line}`)
    }

    const g: Guard = {
        year: Number(match[1]),
        month: Number(match[2]),
        day: Number(match[3]),
        hour: Number(match[4]),
        minute: Number(match[5]),
        actionDescription: match[6]
    }

    return g
}

let sorted = load()
const guards = new Map<string, Guard[]>()
let guard = ""
sorted.forEach(line => {
    const action = line.actionDescription
    if (action.startsWith("Guard")) {
        // Update current guard and initialize undefined list.
        guard = action.split(" ")[1].substring(1)
        let lines = guards.get(guard)
        if (lines === undefined) {
            // Set action.
            line.action = Action.BeginShift
            guards.set(guard, [line])
        }
    } else {
        // Set action.
        if (action === "wakes up") {
            line.action = Action.WakeUp
        } else {
            line.action = Action.Sleep
        }

        // Add line to guard list.
        let lines = guards.get(guard)
        lines?.push(line)
    }
})

log(guards)