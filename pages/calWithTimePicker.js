import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'       //npm i @fullcalendar/multimonth ---> For year view
import Layout from '@/components/layout'
import { useEffect, useState } from 'react'
import { Modal, TimePicker, DatePicker } from 'antd'
import moment from 'moment'

function CalendarWithTime() {
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState([])
  const [showDate, setShowDate] = useState(false)
  const [selectedToDate, setSelectedToDate] = useState(null)

  // console.log('selectedToDate', selectedToDate)
  // console.log('selectedFromDate', selectedDate)
  console.log('startTime', startTime)

  const handleTimeChange = (time, field) => {
    if (field === 'startTime') {
      setStartTime(time)
    } else if (field === 'endTime') {
      setEndTime(time)
    }
  }

  const handleFromDate = (date) => {
    if (date) {
      const formattedDate = moment(date.$d).format('YYYY-MM-DD')
      console.log('formattedDate', formattedDate)
      setSelectedDate(formattedDate)
    } else {
      setSelectedDate(null)
    }
  }

  const handleToDate = (date) => {
    if (date) {
      const formattedDate = moment(date.$d).format('YYYY-MM-DD')
      setSelectedToDate(formattedDate)
    } else {
      setSelectedToDate(null)
    }
  }

  const handleEventSave = () => {
    if (!showDate) {
      const newEventTime = {
        title: 'Time event',
        start: moment(selectedDate)
          .set({ hour: startTime.hour(), minute: startTime.minute() })
          .toISOString(),
        end: moment(selectedDate)
          .set({ hour: endTime.hour(), minute: endTime.minute() })
          .toISOString(),
      }
      setEvents([...events, newEventTime])
    } else if (selectedToDate) {
      const newEventDate = {
        title: 'Date event',
        start: selectedDate,
        // end: selectedToDate,
        end: moment(selectedToDate).add(1, 'day').format('YYYY-MM-DD'),
      }
      setEvents([...events, newEventDate])
    }

    setStartTime(null)
    setEndTime(null)
    setSelectedDate(null)
    setSelectedToDate(null)
    setShowModal(false)
  }

  const handleAddEvent = () => {
    setShowModal(true)
  }

  const handleModalCancel = () => {
    setShowModal(false)
  }

  useEffect(() => {
    // Fetch events from an API or any other data source
    const fetchedEvents = [
      {
        title: 'Mahi day',
        start: '2023-07-07',
        backgroundColor: 'red',
        content: 'Mahi day',
      },
      {
        title: 'SAWAN_RANGE',
        start: '2023-08-05',
        end: '2023-08-15',
        backgroundColor: 'blue',
        content: 'SAWAN_RANGE',
      },
    ]
    setEvents(fetchedEvents)
  }, [])

  const handleDateClick = (arg) => {
    console.log('Clicked_date', arg.date)
  }

  const handleDatesSet = (arg) => {
    console.log('arg_', arg)
    const { view, start, end } = arg
    console.log('view_type', view.type) //date type monthView, weekView, dayView
    console.log('View_title', view.title) //-----> this is one, I needed so that I can know that date or date range
  }

  const handleViewDidMount = (arg) => {
    console.log('Current_view', arg.view.title)
  }

  const handleViewWillUnmount = (arg) => {
    console.log('Previous_view', arg.view.title)
  }

  console.log('userEvents', events)
  return (
    <Layout>
      <div className='calendar-container'>
        <button onClick={handleAddEvent}>Add Eventsawa</button>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin ]}
          initialView='dayGridMonth'
          headerToolbar={{
            center: 'dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear',
          }}
          events={events}
          contentHeight={395}
          // dateClick={handleDateClick}
          datesSet={handleDatesSet}
          // viewDidMount={handleViewDidMount}
          // viewWillUnmount={handleViewWillUnmount}
          views={{
            dayGridYear: {
              type: 'dayGrid',
              duration: { years: 1 },
            },
          }}
        />
        <Modal
          open={showModal}
          onCancel={handleModalCancel}
          onOk={handleEventSave}
        >
          <div>
            <label>Select Date:</label>
            <DatePicker onChange={handleFromDate} format='YYYY-MM-DD' />
          </div>
          <button onClick={() => setShowDate(!showDate)}>
            Toggle Date/Time
          </button>

          {!showDate ? (
            <>
              <div>
                <label>Start Time:</label>
                <TimePicker
                  value={startTime}
                  onChange={(time) => handleTimeChange(time, 'startTime')}
                  format='h:mm A'
                  disabled={!selectedDate ? true : false}
                />
              </div>
              <div>
                <label>End Time:</label>
                <TimePicker
                  value={endTime}
                  onChange={(time) => handleTimeChange(time, 'endTime')}
                  format='h:mm A'
                  disabled={!selectedDate ? true : false}
                />
              </div>
            </>
          ) : (
            <div>
              <label>Select To Date:</label>
              <DatePicker onChange={handleToDate} format='YYYY-MM-DD' />
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  )
}

export default CalendarWithTime
