/** */
export function getISOTimestamp(unix?: number) {
    return unix ? (new Date(unix)).toISOString() : (new Date()).toISOString();
}