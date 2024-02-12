import humanizeDuration from "humanize-duration";

export function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export const getUserInitials = (name: string, size = 2): string =>
    name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, size)
        .join('');

function minutesToMilliseconds(minutes: number): number {
    return minutes * 60 * 1000; // 1 minute = 60 seconds = 60,000 milliseconds
}

export const humanizeMinutes = (time: number) => {
    const milliseconds = minutesToMilliseconds(time)
    return humanizeDuration(milliseconds, { language: "fr" })
}


export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createDateAsUTC(date: Date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}
