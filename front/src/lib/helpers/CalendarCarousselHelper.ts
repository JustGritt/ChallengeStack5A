
import dayHours from "@/lib/constants/day_hours.json";

export const getIntlDayAndMonth = (date: string, locale: string) => {
    const intlDate = new Date(date);
    const day = intlDate.toLocaleDateString(locale, {
        day: '2-digit'
    });
    const dayWeek = intlDate.toLocaleDateString(locale, {
        weekday: 'long'
    });

    const month = intlDate.toLocaleDateString(locale, {
        month: 'short'
    });

    return {
        day,
        dayWeek,
        month
    }
}

interface Range {
    start: Date;
    end: Date;
}

export const isOffHour = (militaryTime: string, currentDate: Date, excludeRanges: Range[], includeRanges: Range[]): boolean => {
    const [hours, minutes] = militaryTime.match(/\d{2}/g)!.map(Number);
    const currentTime = new Date(currentDate);
    currentTime.setHours(hours, minutes, 0, 0);

    if (includeRanges.length === 0 && excludeRanges.length === 0) {
        return true; // All times are off
    }
    const isInIncludeRanges = includeRanges.some(range => isInRange(currentTime, range));
    const isInExcludeRanges = excludeRanges.some(range => isInRange(currentTime, range));
    return !isInIncludeRanges || isInExcludeRanges;
};

// Helper function to check if a given time falls within a range
const isInRange = (time: Date, range: Range): boolean => {
    return time >= range.start && time <= range.end;
};


export const getWorkinHours = (date: string) => {
    return dayHours.filter((day) => {
        const militaryTime =
            parseInt(day.military_format.slice(0, 2)) * 60 +
            parseInt(day.military_format.slice(2));
        return (
            militaryTime >= 600 &&
            militaryTime <= 1080
        );
    })
}