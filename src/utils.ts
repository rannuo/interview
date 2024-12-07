/**
 * 给字符串分段
 * 
 * @example
 * 
 * chunk('aaaabbbbccccdddd', 4) -> ['aaaa', 'bbbb', 'cccc', 'dddd']
 */
export function chunkStr(str: string, length: number) {
    const ret = [];
    while (str.length) {
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

export function sleep(t: number) {
    return new Promise(resolve => {
        setTimeout(resolve, t)
    });
}

export function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}