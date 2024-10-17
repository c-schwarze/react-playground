export function create2DArray(width: number, height: number, defaultValue: any) {
    return new Array(height).fill(0).map(() => new Array(width).fill(defaultValue))
}