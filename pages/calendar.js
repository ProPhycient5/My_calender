import Layout from '@/components/layout'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'

export default function CalendarPage() {
  const arr = [
    { title: 'event 1', date: '2023-05-28' },
    { title: 'event 2', date: '2023-05-28' },
  ]

  return (
    <Layout>
      <div className='calendar-container'>
        <button>Add Task</button>
        <FullCalendar
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            // multiMonthPlugin
          ]}
          dateClick={(date) => console.log('clicked date', date)}
          events={[...arr]}
          // eventAdd={(data) => console.log("data", data)}
          // eventClick={(data) => console.log("eventClick", data)}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'resourceTimelineWeek,dayGridMonth,timeGridWeek',
          }}
          initialView='dayGridMonth'
          // nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          resources={[
            { id: 'a', title: 'Auditorium A' },
            { id: 'b', title: 'Auditorium B', eventColor: 'green' },
            { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
          ]}
          // initialEvents={[
          //   { title: 'nice event', start: new Date(), resourceId: 'a' },
          //   { title: 'Test-2', start: new Date(), resourceId: 'b' },
          //   { title: 'sawan', start: new Date(), resourceId: 'c' }
          // ]}
        />
        <div>Kiran</div>
      </div>
    </Layout>
  )
}
