
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

const getMiliTaryHoursFromDate = (date: Date) => {
    const militaryHour = new Date(); // Create a new Date object
    const hours = ("0" + militaryHour.getHours()).slice(-2); // Get hours and pad with leading zero if needed
    const minutes = ("0" + militaryHour.getMinutes()).slice(-2); // Get minutes and pad with leading zero if needed

    return hours + minutes
}

interface ExcludeRange {
    start: Date;
    end: Date;
}

export const isOffHour = (militaryTime: string, currentDate: Date, excludeRanges: ExcludeRange[]): boolean => {
    // Convert military time string to hours and minutes
    const hours: number = parseInt(militaryTime.slice(0, 2));
    const minutes: number = parseInt(militaryTime.slice(2));
    const currentTime: Date = new Date(currentDate);

    // Set the military time on the currentDate
    currentTime.setHours(hours, minutes, 0, 0);

    // Check if the currentDate falls within any of the ranges specified by excludeRanges
    for (const range of excludeRanges) {
        if (currentTime >= range.start && currentTime <= range.end) {
            return true; // It's off hour
        }
    }
    return false; // It's working hour
};

export const getWorkinHours = (date: string) => {
    return dayHours.filter((day) => {
        const militaryTime =
            parseInt(day.military_format.slice(0, 2)) * 60 +
            parseInt(day.military_format.slice(2));
        const dayOfWeek = new Date(date).getDay();

        return (
            dayOfWeek !== 0 &&
            dayOfWeek !== 6 &&
            militaryTime >= 600 &&
            militaryTime <= 1080
        );
    })
}