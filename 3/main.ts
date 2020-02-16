// Day 1
import fs from 'fs'

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
        .filter(line => line.length > 0)
        .map(line => toClaim(line))
}

function toClaim(line: string): Claim {
    // #1 @ 185,501: 17x15
    const ps = line.split(" ")

    const id = ps[0].substring(1)
    const xy = ps[2].split(",")
    const x = Number(xy[0])
    const y = Number(xy[1].substr(0, xy[1].length -1))
    const wh = ps[3].split("x")
    const width = Number(wh[0])
    const height = Number(wh[1])

    return {
        id,
        x: x,
        y: y,
        width,
        height
    }
}

let c = load()
console.log(c[0])