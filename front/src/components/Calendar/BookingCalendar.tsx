import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

export default function UserCalendar() {

    const data = [
        {
            title: 'Work',
            start: '2024-02-04T08:00:00.347Z',
            end: '2024-02-04T11:00:35.347Z'
        },
        {
            title: 'Day Off',
            start: '2024-02-04T12:51:35.347Z',
            end: '2024-02-05T08:51:35.347Z'
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

    // TODO: POST Schedule
    // {
    //     "startDate": "2024-02-04 21:02:39.927",
    //     "endDate": "2024-02-04T21:02:39.927Z",
    //     "onVacation": true,
    //     "employee": "https://example.com/",
    //     "store": "https://example.com/"
    //   }

    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <FullCalendar
                plugins={[ timeGridPlugin, interactionPlugin ]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }}
                expandRows={true}
                events={data}
                editable={true}
            />
        </div>
    )
}
