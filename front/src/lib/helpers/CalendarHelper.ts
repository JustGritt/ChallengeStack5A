const years = [];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

// Generate a calendar for 3 years from current year
const generateDays = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
        days.push({
        date: new Date(date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }),
        events: []
        });
        date.setDate(date.getDate() + 1);
    }
    return days;
}

for (let year = currentYear; year < currentYear + 3; year++) {
    const months = [];
    for (let month = 0; month < 12; month++) {
        months.push({
        name: new Date(year, month).toLocaleString('en-US', { month: 'long' }),
        days: generateDays(year, month)
        });
    }
    years.push({
        year,
        months
    });
}

export const CalendarDates = years;