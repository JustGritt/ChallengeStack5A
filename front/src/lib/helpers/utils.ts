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
    console.log(date);

    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
}

export function convertDateToNormal(date: Date) {
    return new Date(date.toISOString()
        .slice(0, -1)
        .replace("T", " "));
}


export const dateWithoutTimezone = (date: Date) => {
    const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    const withoutTimezone = new Date(date.valueOf() - tzoffset)
        .toISOString()
        .slice(0, -1);
    return withoutTimezone;
};