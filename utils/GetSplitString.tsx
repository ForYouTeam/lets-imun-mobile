export const splitString = (sentence: string): string[] => {
    if (!sentence) {
        return [];
    }
    const words = sentence.split(",");
    return words;
};
