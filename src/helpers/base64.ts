export function decodeBase64Url(input: string): Uint8Array {
    // Replace URL-safe characters with base64 characters
    const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4 === 0 ? '' : '==='.slice(0, 4 - (base64.length % 4));
    const base64WithPadding = base64 + pad;
    return Uint8Array.from(Buffer.from(base64WithPadding, 'base64'));
}