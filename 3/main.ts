// Day 1
import fs from 'fs'

function log(msg: any): void {
    console.log(msg)
}

interface Claim {
    id: string
    x: number
    y: number
    width: number
    height: number
}

type Claims = Claim[]

function load(): Claims {
    const input = fs.readFileSync('input.txt', 'utf-8')
    return input.split("\n")
        // .slice(0, 1) // For testing...
        .filter(line => line.length > 0)
        .map(line => toClaim(line))
}

function toClaim(line: string): Claim {
    // #1 @ 185,501: 17x15
    const ps = line.split(" ")

    const id = ps[0].substring(1)
    const xy = ps[2].split(",")
    const x = Number(xy[0])
    const y = Number(xy[1].substr(0, xy[1].length - 1))
    const wh = ps[3].split("x")
    const width = Number(wh[0])
    const height = Number(wh[1])

    return {
        id,
        x,
        y,
        width,
        height
    }
}

function part1() {
    const fabrics = load()
    // console.log(c[0])

    // Define a 2D array for storing values.
    // Cache behaviour in TS/JS?
    const area: number[][] = []
    const size = 1000
    for (let x = 0; x < size; x++) {
        area[x] = []
        for (let y = 0; y < size; y++) {
            area[x][y] = 0
        }
    }

    // Iterate over all entries and fill array.
    for (const fabric of fabrics) {
        // log(`Processing ${JSON.stringify(fabric)}`)
        for (let x = fabric.x; x < fabric.x + fabric.width; x++) {
            for (let y = fabric.y; y < fabric.y + fabric.height; y++) {
                // log(`x=${x}/y=${y}`)
                area[x][y]++
            }
        }
    }

    // Check how many inches overlap.
    let overlap = 0
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (area[x][y] > 1) {
                overlap++
            }
        }
    }
    log(`Overlap ${overlap}`)
}

function part2() {
    const fabrics = load()
    // console.log(c[0])

    type fabs = string[]

    // Define a 2D array for storing values.
    // Each element consists of a list of fabrics at this place.
    // Cache behaviour in TS/JS?
    const area: fabs[][] = []
    const size = 1000
    for (let x = 0; x < size; x++) {
        area[x] = []
        for (let y = 0; y < size; y++) {
            area[x][y] = []
        }
    }

    // Remember all ids which had no collision yet.
    const noColl = new Set<string>()
    for (const fabric of fabrics) {
        noColl.add(fabric.id)
    }

    // Iterate over all entries and fill array.
    for (const fabric of fabrics) {
        // log(`Processing ${JSON.stringify(fabric)}`)
        for (let x = fabric.x; x < fabric.x + fabric.width; x++) {
            for (let y = fabric.y; y < fabric.y + fabric.height; y++) {
                // log(`x=${x}/y=${y}`)
                area[x][y].push(fabric.id)
                if (area[x][y].length > 1) {
                    area[x][y].forEach(id => {
                        noColl.delete(id)
                    })
                }
            }
        }
    }

    log(noColl)
}