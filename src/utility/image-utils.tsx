export function formatBase64(base64String: string| undefined): string {
    return `data:image/png;base64,${base64String}`
}