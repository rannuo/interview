/**
 * 给字符串分段
 * 
 * @example
 * 
 * chunk('aaaabbbbccccdddd', 4) -> ['aaaa', 'bbbb', 'cccc', 'dddd']
 */
export function chunkStr(str: string, length: number) {
    const ret = [];
    while(str.length) {
        const part = str.slice(0, length);
        str = str.slice(length);
        if (part) {
            ret.push(part);
        }
    }
    return ret;
}

export function solidStr(str: string) {
    return str.trim().replace(/\s/gi, '');
}
