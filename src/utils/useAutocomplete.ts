
export const useAutocomplete = (options: string[]) => {

    const getSuggestions = (input: string): string[] => {
        if (!input.trim()) return [];
        const lowerInput = input.toLowerCase();
        return options.filter(opt => opt.toLowerCase().startsWith(lowerInput));
    };

    const getSharedPrefix = (words: string[]): string => {
        if (!words.length) return '';
        let prefix = words[0];
        for (let i = 1; i < words.length; i++) {
            while (!words[i].startsWith(prefix)) {
                prefix = prefix.slice(0, -1);
            }
        }
        return prefix;
    };

    return { getSuggestions, getSharedPrefix };
};
