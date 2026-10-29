import { gmail_v1 } from 'googleapis';

const HTML_ENTITIES: Record<string, string> = {
    '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'",
};

/**
 * Picks the send-as entry for `from`, or the default one when omitted.
 * Gmail relays through another SMTP only for an accepted send-as address.
 */
export async function resolveSendAs(gmail: gmail_v1.Gmail, from?: string): Promise<gmail_v1.Schema$SendAs | undefined> {
    const response = await gmail.users.settings.sendAs.list({ userId: 'me' });
    const usable = (response.data.sendAs || []).filter(s => s.isPrimary || s.verificationStatus === 'accepted');
    if (!from) return usable.find(s => s.isDefault);

    const entry = usable.find(s => s.sendAsEmail?.toLowerCase() === from.toLowerCase());
    if (!entry) {
        throw new Error(`${from} is not a verified send-as address. Valid addresses: ${usable.map(s => s.sendAsEmail).join(', ')}`);
    }
    return entry;
}

export async function listSendAsAddresses(gmail: gmail_v1.Gmail): Promise<string[]> {
    const response = await gmail.users.settings.sendAs.list({ userId: 'me' });
    return (response.data.sendAs || [])
        .filter(s => s.isPrimary || s.verificationStatus === 'accepted')
        .map(s => s.isDefault ? `${s.sendAsEmail} (default)` : s.sendAsEmail || '');
}

export function htmlToText(html: string): string {
    return html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/?(div|p|li|tr|table|h[1-6])\b[^>]*>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
        .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
        .replace(/&[a-z]+;/gi, entity => HTML_ENTITIES[entity.toLowerCase()] ?? entity)
        .replace(/[ \t]*\n\s*/g, '\n')
        .trim();
}

export function textToHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\r?\n/g, '<br>');
}

// A text/plain email cannot carry the signature's logo and links, so a body-only call gets an HTML part too
export function withSignature(validatedArgs: any, signatureHtml?: string | null): any {
    if (!signatureHtml) return validatedArgs;
    const htmlBody = validatedArgs.htmlBody ?? textToHtml(validatedArgs.body);
    return {
        ...validatedArgs,
        body: `${validatedArgs.body}\n\n${htmlToText(signatureHtml)}`,
        htmlBody: `${htmlBody}<br><br><div class="gmail_signature">${signatureHtml}</div>`,
    };
}

export async function withSendAs(gmail: gmail_v1.Gmail, validatedArgs: any): Promise<any> {
    const entry = await resolveSendAs(gmail, validatedArgs.from);
    const sender = validatedArgs.from ? { fromName: entry?.displayName || undefined } : {};
    return withSignature({ ...validatedArgs, ...sender }, entry?.signature);
}
