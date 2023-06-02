export const pluralize = (number: number | string, word: string) => {
    return `${word}${number === 1 ? '' : 's'}`;
}