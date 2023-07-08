import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Layout from '@/components/layout'
import { useEffect, useState } from 'react'

function FullCalendarApp() {
  const [userEvents, setUserEvents] = useState([])
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [showTime, setShowTime] = useState(true)

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value)
  }
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value)
  }

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value)
  }
  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value)
  }

  useEffect(() => {
    // var desiredDiv = document.querySelector(".fc-media-screen");
    // desiredDiv.style.height = "400px";
    // console.log("desiredDiv", desiredDiv);
    // Fetch events from an API or any other data source
    const fetchedEvents = [
      {
        title: 'Event 1',
        start: '2023-05-30',
        backgroundColor: 'red',
        content: 'Hi this is content',
      },
      {
        title: 'Event 2',
        start: '2023-05-31',
        backgroundColor: 'blue',
        content: 'Hi I am boy',
      }
    ]
    setUserEvents(fetchedEvents)
  }, [])

  const handleEventForTime = (e) => {
    // Create a new event object
    const newEvent = {
      title: 'Time Event',
      // start: e.dateStr,
      start: new Date(e.date.getTime()), // Create a new date object for start time
      end: new Date(e.date.getTime()), // Create a new date object for end time
      backgroundColor: 'green',
      content: 'This is a time event content',
    }

    // Set the start and end times based on user input
    const startHours = parseInt(startTime.split(':')[0])
    const startMinutes = parseInt(startTime.split(':')[1])
    newEvent.start.setHours(startHours, startMinutes)

    const endHours = parseInt(endTime.split(':')[0])
    const endMinutes = parseInt(endTime.split(':')[1])
    newEvent.end.setHours(endHours, endMinutes)

    setUserEvents((prevEvents) => [...prevEvents, newEvent])

    // Clear the input fields
    setStartTime('')
    setEndTime('')
  }

  const handleEventForDate = (e) => {
    const newEvent = {
      title: 'Date Event',
      start: startDate, // Use the selected start date
      end: endDate, // Use the selected end date
      backgroundColor: 'green',
      content: 'This is a date event content',
    }

    setUserEvents((prevEvents) => [...prevEvents, newEvent])

    // Clear the input fields
    setStartDate('')
    setEndDate('')
  }

  const handleEventClick = (e) => {
    console.log('Clicked event:', e.event)
    console.log('Event title:', e.event.title)
    console.log('Start time:', e.event.start)
    console.log('End time:', e.event.end)
    console.log('Event color:', e.event.backgroundColor)
    console.log('Event content', e.event.extendedProps.content)
  }



  console.log('userEvents', userEvents)
  return (
    <Layout>
      <div className='calendar-container'>
        <button onClick={() => setShowTime(!showTime)}>Toggle Date/Time</button>
        {showTime && (
          <>
            {' '}
            <div>
              Start Time:{' '}
              <input
                type='time'
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </div>
            <div>
              End Time:{' '}
              <input
                type='time'
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>
          </>
        )}

        {!showTime && (
          <>
            <div>
              Start Date:{' '}
              <input
                type='date'
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div>
              End Date:{' '}
              <input
                type='date'
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </>
        )}

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          headerToolbar={{
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={userEvents}
          nowIndicator
          select={(arg) => console.log('arg', arg)}
          dateClick={(e) => {
            if (showTime) handleEventForTime(e)
            else handleEventForDate(e)
          }}
          eventClick={handleEventClick}
          contentHeight={395}
        />
      </div>
    </Layout>
  )
}

export default FullCalendarApp
