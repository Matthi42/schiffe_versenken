export const nameToColor = (name: string): string => {
    const hashR = hashCode('rot' + name + 'rot')
    const hashG = hashCode('grün' + name + 'grün')
    const hashB = hashCode('blau' + name + 'blau')
    const redValue = Math.abs(hashR % 170) + 30
    const greenValue = Math.abs(hashG % 170) + 30
    const blueValue = Math.abs(hashB % 170) + 30
    return `rgb(${redValue},${greenValue},${blueValue})`
}

const luminance = ([R,G,B]:number[]) => (0.299 * R + 0.587 * G + 0.114 * B)

const parseRGB = (color: string): number[] => {
    const m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    console.debug(m)
    if (m) {
        return [m[1], m[2], m[3]].map(s => Number.parseInt(s))
    }
    return []
}

export const luminanceOfString = (string:string) => luminance(parseRGB(string))




const hashCode = (string: string): number => {
    let hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
