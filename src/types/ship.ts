export interface Ship {
    shipPos: Point,
    shipID: number,
    shipSize: number,
    orientation: "horizontal" | "vertical",
}

export interface Point {
    x: number
    y: number
}