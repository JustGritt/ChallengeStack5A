import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function UserCalendar() {

    // Mock the data to get the schedule of the employee
    // {
    //     "hydra:member": [{
    //         "@id": "string",
    //         "@type": "string",
    //         "@context": "string",
    //         "id": 0,
    //         "startDate": "2024-02-04T08:51:35.347Z",
    //         "endDate": "2024-02-04T08:51:35.347Z",
    //         "onVacation": true,
    //         "employee": {
    //             "@context": "string",
    //             "@id": "string",
    //             "@type": "string",
    //             "email": "user@example.com"
    //         },
    //         "store": "https://example.com/"
    //     }],
    // }

    const data = [
        {
            title: 'Work',
            start: '2024-02-01',
            end: '2024-02-02'
        },
        {
            title: 'Booking',
            start: '2024-02-03',
            end: '2024-02-04'
        },
        {
            title: 'Day Off',
            start: '2024-02-05',
            end: '2024-02-06'
        },
        {
            title: 'Vacation',
            start: '2024-02-07',
            end: '2024-02-08'
        },
        {
            title: 'Work',
            start: '2024-02-09',
            end: '2024-02-14'
        }
    ]

    const handleDateSelect = (arg: any) => {
        const eventCategory = document.getElementById('selectedEvent') as HTMLSelectElement;
        const title = eventCategory.value;
        const calendarApi = arg.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                title,
                start: arg.start,
                end: arg.end,
                allDay: arg.allDay
            });
        }

        // Send post to the API to save the event
    }

    const handleRemoveEvent = (arg: any) => {
        if (confirm('Are you sure you want to delete this event?')) {
            arg.event.remove();
        }
    }

    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <select id="selectedEvent" className="mb-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option defaultValue="work">Work</option>
                <option defaultValue="vacation">Vacation</option>
            </select>

            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                nowIndicator={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                selectOverlap={false}
                select={handleDateSelect}
                eventClick={handleRemoveEvent}
                events={data}
            />
        </div>
    )
}
