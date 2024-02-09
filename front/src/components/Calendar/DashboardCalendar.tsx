import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';

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

    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <FullCalendar
                plugins={[ listPlugin ]}
                initialView="listDay"
                events={data}
                headerToolbar={{
                    start: 'title',
                    end: 'prev,next today',
                }}
                height={'200px'}
            />
        </div>
    )
}
