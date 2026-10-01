export function maskEmail(email: string): string {
    const [username, domain] = email.split("@");

    if (!username || !domain) {
        return email;
    }

    const [domainName, ...extensionParts] = domain.split(".");
    const extension = extensionParts.join(".");

    const maskedUsername =
        username.length <= 2
            ? `${username[0]}***`
            : `${username[0]}${"*".repeat(username.length - 2)}${username.at(-1)}`;

    const maskedDomain =
        domainName.length <= 2
            ? `${domainName[0]}***`
            : `${domainName[0]}${"*".repeat(domainName.length - 1)}`;

    return `${maskedUsername}@${maskedDomain}.${extension}`;
}
