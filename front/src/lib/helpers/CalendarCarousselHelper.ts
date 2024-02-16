
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

export const findAvailableEmployees = (date: string, vacationSchedules: ScheduleAvailable[], workingSchedules: ScheduleAvailable[]): Pick<User, "email" | "id">[] => {

    // Filter schedules that are outside the given date range
    const filteredVacationSchedules = filterSchedulesInsideRange(new Date(date), vacationSchedules);
    const filteredWorkingSchedules = filterSchedulesInsideRange(new Date(date), workingSchedules);

    // Find common employees between vacation and working schedules
    const filteredSchedules = findNonOverlappingSchedules(filteredVacationSchedules, filteredWorkingSchedules);
    const availableEmployees = filteredSchedules.map(schedule => schedule.employee);



    return availableEmployees;
};



export const filterSchedulesInsideRange = (date: Date, schedules: ScheduleAvailable[]): ScheduleAvailable[] => {
    // Convert date string to Date object
    const dateTime = moment(date.getTime()).utc(true).toDate();

    // Filter schedules that are inside the given date range
    const filteredSchedules = schedules.filter(schedule => {
        const scheduleStartTime = moment(schedule.startDate).utc(true).toDate();
        const scheduleEndTime = moment(schedule.endDate).utc(true).toDate();
        return dateTime.getTime() >= scheduleStartTime.getTime() && dateTime.getTime() <= scheduleEndTime.getTime();
    });

    return filteredSchedules;
};

export const findAvailableEmployees_ = (date: string, vacationSchedules: ScheduleAvailable[], workingSchedules: ScheduleAvailable[]): Pick<User, "id">[] => {
    // Filter schedules that are outside the given date range
    const filteredVacationSchedules = filterSchedulesInsideRange(new Date(date), vacationSchedules);
    const filteredWorkingSchedules = filterSchedulesInsideRange(new Date(date), workingSchedules);


    const freeEmployees = filteredWorkingSchedules.filter(schedule => {
        return filteredVacationSchedules.some(vacationSchedule => vacationSchedule.employee.id === schedule.employee.id);
    }).map(schedule => schedule.employee);

    console.log({ freeEmployees }, { filteredWorkingSchedules });

    // Find common employees between vacation and working schedules
    const filteredSchedules = findNonOverlappingSchedules(filteredVacationSchedules, filteredWorkingSchedules);
    console.log(filteredSchedules);

    return filteredSchedules.map(schedule => schedule.employee);
}

const findNonOverlappingSchedules = (vacationSchedules: ScheduleAvailable[], workingSchedules: ScheduleAvailable[]): ScheduleAvailable[] => {
    const vacationEmployeeEmails = vacationSchedules.map(schedule => schedule.employee.email);
    console.log(vacationEmployeeEmails);

    const nonOverlappingSchedules = workingSchedules.filter(schedule =>
        vacationEmployeeEmails.includes(schedule.employee.email)
    );

    return nonOverlappingSchedules;
};