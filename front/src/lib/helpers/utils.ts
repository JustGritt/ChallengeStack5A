export function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export const getUserInitials = (name: string, size = 2): string => 
    name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, size)
        .join('');