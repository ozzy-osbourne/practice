export function getItem(value: string) {
    return JSON.parse(localStorage.getItem(value));
}

export function setItem(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value));
}
