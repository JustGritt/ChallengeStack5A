
import dayHours from "@/lib/constants/day_hours.json";
import { Schedule } from "@/types/Schedule";
import { Employee, User } from "@/types/User";
import { DateTime } from "luxon";
import { convertDateToNormal, dateWithoutTimezone } from "./utils";
import moment from "moment";

type ScheduleAvailable = {
    employee: Pick<User, "email" | "id">
} & Pick<Schedule, 'startDate' | 'endDate'>

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

export const isOnHour = (currentDate: Date, excludeRanges: Range[], includeRanges: Range[], isAllBookings?: boolean): boolean => {
    const dateTime = currentDate;

    if (includeRanges.length === 0 && excludeRanges.length === 0) {
        return false;
    }
    const isInIncludeRanges = includeRanges.some(range => isInRange(dateTime, range));
    const isInExcludeRanges = excludeRanges.some(range => isInRange(dateTime, range));

    // if (isAllBookings && isInExcludeRanges && includeRanges.length > 0) {
    //     return true;
    // }
    return isInIncludeRanges && !isInExcludeRanges;
};

const isInRange = (time: Date, range: Range): boolean => {
    const normalizedTime = convertDateToNormal(time);
    const normalizedRangeStart = convertDateToNormal(range.start);
    const normalizedRangeEnd = convertDateToNormal(range.end);

    return ((normalizedTime.getTime() >= normalizedRangeStart.getTime()) && (normalizedTime.getTime() <= normalizedRangeEnd.getTime()));
};


export const getWorkinHours = (date: string) => {
    return dayHours.filter((day) => {
        const militaryTime =
            parseInt(day.military_format.slice(0, 2)) * 60 +
            parseInt(day.military_format.slice(2));
        return (
            militaryTime >= 540 &&
            militaryTime <= 1140
        );
    })
}


export const filterSchedulesInsideRange = (date: Date, schedules: ScheduleAvailable[], serviceTime: number): ScheduleAvailable[] => {
    // Convert date string to Date object
    const dateTime = moment(date.getTime()).utc(true).toDate();
    // Filter schedules that are inside the given date range
    const filteredSchedules = schedules.filter(schedule => {
        const scheduleStartTime = moment(schedule.startDate).utc(true).toDate();
        const scheduleEndTime = moment(schedule.endDate).utc(true).toDate();
        console.log((scheduleEndTime.getTime() / 3600000) >= (serviceTime * 1000));
        return dateTime.getTime() >= scheduleStartTime.getTime() && dateTime.getTime() <= scheduleEndTime.getTime() && (Math.abs(scheduleStartTime.getTime() - scheduleEndTime.getTime()) / 3600000) >= (serviceTime * 1000);
    });

    return filteredSchedules;
};



const findNonOverlappingSchedules = (vacationSchedules: ScheduleAvailable[], workingSchedules: ScheduleAvailable[]): ScheduleAvailable[] => {
    const vacationEmployeeEmails = vacationSchedules.map(schedule => schedule.employee.email);
    console.log(vacationEmployeeEmails);

    const nonOverlappingSchedules = workingSchedules.filter(schedule =>
        vacationEmployeeEmails.includes(schedule.employee.email)
    );

    return nonOverlappingSchedules;
};