import fs from 'fs'
import log from './log'
import { globalAgent } from 'http'

enum Action {
    BeginShift,
    Sleep,
    WakeUp
}

interface GuardInfo {
    year: number
    month: number
    day: number
    hour: number
    minute: number

    actionDescription: string
    action?: Action
}

function toString(l: GuardInfo): string {
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

function compareDates(a: GuardInfo, b: GuardInfo): number {
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


function parseLine(line: string): GuardInfo {
    const re = new RegExp("^.(....)-(..)-(..) (..):(..). (.*)$")
    const match = re.exec(line)
    if (match === null) {
        throw new Error(`Parse error on ${line}`)
    }

    const g: GuardInfo = {
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
const guards = new Map<string, GuardInfo[]>()
let currentGuardId = ""
sorted.forEach(line => {
    const action = line.actionDescription
    if (action.startsWith("Guard")) {
        // Update current guard and initialize undefined list.
        currentGuardId = action.split(" ")[1].substring(1)
        let lines = guards.get(currentGuardId)
        if (lines === undefined) {
            // Set action.
            line.action = Action.BeginShift
            guards.set(currentGuardId, [line])
        }
    } else {
        // Set action.
        if (action === "wakes up") {
            line.action = Action.WakeUp
        } else {
            line.action = Action.Sleep
        }

        // Add line to guard list.
        let lines = guards.get(currentGuardId)
        lines?.push(line)
    }
})

// Find guard with most minutes asleep.
let minutes = 0
let guard: string | undefined = undefined
guards.forEach((v, k) => {
    let gm = 0

    let start = 0
    for (let m of v) {
        switch (m.action) {
            case Action.BeginShift:
                break
            case Action.Sleep:
                start = m.minute
                break
            case Action.WakeUp:
                gm += m.minute - start
                break
        }
    }

    if (minutes < gm) {
        guard = k
        minutes = gm
    }
})

// Aggregated sleeping times.
const countMinutes: number[] = []
for(let i = 0; i < 60; i++) {
    countMinutes[i] = 0
}
if (guard !== undefined) {
    const steps = guards.get(guard)?.slice(1)
    if (steps === undefined) {
        throw new Error("This should not happen.")
    }

    let start = 0
    for (let m of steps) {
        // log(m)
        switch (m.action) {
            case Action.Sleep:
                start = m.minute
                break
            case Action.WakeUp:
                let end = m.minute
                log(start, end)
                for (let i = start; i < end; i++) {
                    countMinutes[i]++
                }
                break
        }
    }
}

// Find maximal value at position.
let pos = 0
let max = 0
for(let i = 0; i < 60; i++) {
    if (countMinutes[i] > max) {
        max = countMinutes[i]
        pos = i
    }
}

const guardID = Number(guard)
log(guardID * pos)
