import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth"; //npm i @fullcalendar/multimonth ---> For year view
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { Modal, TimePicker, DatePicker } from "antd";
import moment from "moment";

function CalendarWithTime() {
  const currentYear = moment().format("YYYY");
  const onlyMonth = moment().format("MM");
  const currentMonthYear = moment().format("YYYY-MM");
  const currentDate = moment().format("YYYY-MM-DD");

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showDate, setShowDate] = useState(false);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [hoveredEventTitle, setHoveredEventTitle] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const [calObj, setCalObj] = useState({});
  const [selectedMY, setSelectedMY] = useState(currentMonthYear);
  const [selectedYear, setSelectedYear] = useState(currentYear); // Initial year
  const [selectedMonth, setSelectedMonth] = useState(onlyMonth);
  const [rerender, setRerender] = useState(false);

  const handleTimeChange = (time, field) => {
    if (field === "startTime") {
      setStartTime(time);
    } else if (field === "endTime") {
      setEndTime(time);
    }
  };

  const handleFromDate = (date) => {
    if (date) {
      const formattedDate = moment(date.$d).format("YYYY-MM-DD");
      console.log("formattedDate", formattedDate);
      setSelectedDate(formattedDate);
    } else {
      setSelectedDate(null);
    }
  };

  const handleToDate = (date) => {
    if (date) {
      const formattedDate = moment(date.$d).format("YYYY-MM-DD");
      setSelectedToDate(formattedDate);
    } else {
      setSelectedToDate(null);
    }
  };

  const handleEventSave = () => {
    if (!showDate) {
      const newEventTime = {
        title: "Time event",
        start: moment(selectedDate)
          .set({ hour: startTime.hour(), minute: startTime.minute() })
          .toISOString(),
        end: moment(selectedDate)
          .set({ hour: endTime.hour(), minute: endTime.minute() })
          .toISOString(),
      };
      setEvents([...events, newEventTime]);
    } else if (selectedToDate) {
      const newEventDate = {
        title: "Date event",
        start: selectedDate,
        // end: selectedToDate,
        end: moment(selectedToDate).add(1, "day").format("YYYY-MM-DD"),
      };
      setEvents([...events, newEventDate]);
    }

    setStartTime(null);
    setEndTime(null);
    setSelectedDate(null);
    setSelectedToDate(null);
    setShowModal(false);
  };

  const handleAddEvent = () => {
    setShowModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Fetch events from an API or any other data source
    const fetchedEvents = [
      {
        title: "Mahi day celebration",
        start: "2023-07-07",
        // backgroundColor: "red",
        content: "Mahi day",
        completed: true,
      },
      {
        title: "CSK",
        start: "2023-07-07",
        // backgroundColor: "yellow",
        content: "Mahi day",
        completed: false,
      },
      {
        title: "Improvisation of code",
        start: "2023-07-07",
        // backgroundColor: "yellow",
        content: "Mahi day",
        completed: false,
      },
      {
        title: "Solar work of installation to roof",
        start: "2023-07-09",
        // backgroundColor: "yellow",
        content: "Hi, I m content",
        completed: false,
      },
      {
        title: "Mid-day work of installation to roof",
        start: "2023-07-15",
        // backgroundColor: "yellow",
        content: "Hi, I m content",
        completed: false,
      },
      {
        title: "SAWAN_RANGE",
        start: "2023-08-05",
        end: "2023-08-15",
        // backgroundColor: "blue",
        content: "SAWAN_RANGE",
        completed: false,
      },
    ];
    setEvents(fetchedEvents);
  }, []);

  const handleDateClick = (arg) => {
    console.log("Clicked_date", arg.date);
  };

  const handleDatesSet = (arg) => {
    setCalObj(arg);
    console.log("arg_", arg);
    const { view, start, end } = arg;
    console.log("view_type", view.type); //date type monthView, weekView, dayView
    console.log("View_title", view.title); //-----> this is one, I needed so that I can know that date or date range
  };

  // const handleViewDidMount = (arg) => {
  //   console.log("Current_view", arg.view.title);
  // };

  // const handleViewWillUnmount = (arg) => {
  //   console.log("Previous_view", arg.view.title);
  // };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const dayPopoverContent = (arg) => {
    const eventsOnDate = events.filter((event) =>
      isSameDay(event.start, arg.date)
    );

    console.log("eventsOnDate", eventsOnDate);

    if (eventsOnDate.length <= 2) {
      // Render default popover content if there are 2 or fewer events
      return (
        <div>
          <h3>{arg.date.toLocaleDateString()}</h3>
          <ul>
            {eventsOnDate.map((event, index) => (
              <li key={index}>{event.title}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      // Render custom popover content with "More" button
      const visibleEvents = eventsOnDate.slice(0, 2);
      const hiddenEvents = eventsOnDate.slice(2);

      return (
        <div>
          <h3>{arg.date.toLocaleDateString()}</h3>
          <ul>
            {visibleEvents.map((event, index) => (
              <li key={index}>{event.title}</li>
            ))}
          </ul>
          <button
            className="more-button"
            onClick={() => {
              // Handle "More" button click here
            }}
          >
            More ({hiddenEvents.length})
          </button>
        </div>
      );
    }
  };

  const handleEventMouseEnter = (event) => {
    // console.log("event_title", event);
    setHoveredEventTitle(event.event.title);
    const tooltipLeft = event.jsEvent.clientX - 40; // Adjust the values as per your needs
    const tooltipTop = event.jsEvent.clientY - 60; // Adjust the values as per your needs
    setTooltipPosition({ left: tooltipLeft, top: tooltipTop });
  };

  const handleEventMouseLeave = () => {
    setHoveredEventTitle("");
  };

  // Function to handle date picker change
  const handleMonthSelect = (date, dateString) => {
    if (date) {
      const optedMonth = date.format("MM");
      const optedMY = date.format("YYYY-MM");
      setSelectedMonth(optedMonth); // Update state with the selected month
      setSelectedMY(optedMY);
    } else {
      // Date is cleared (not allowed due to allowClear={false})
      setSelectedMonth(null); // Clear the selected month in the state
    }
  };

  // Function to handle the year selection from the Ant Design DatePicker
  const handleYearSelect = (date) => {
    const selectedYear = date.format("YYYY");
    console.log("selectedYear", selectedYear);
    setSelectedYear(selectedYear);
    setSelectedMonth("01");
  };

  // Function to set the initial date based on the selected year
  const getInitialDate = () => {
    if (calObj["view"]?.type === "multiMonthYear") {
      return `${selectedYear}-01-01`;
    } else if (calObj["view"]?.type === "dayGridMonth") {
      if (selectedMY === currentMonthYear) {
        return currentDate;
      } else return `${selectedYear}-${selectedMonth}-01`;
    }
  };

  useEffect(() => {
    setRerender(!rerender);
  }, [selectedMonth, selectedYear]);

  return (
    <Layout>
      <div className="calendar-container">
        <button onClick={handleAddEvent}>Add Eventsawa</button>

        {calObj["view"]?.type === "multiMonthYear" && (
          <DatePicker
            picker="year"
            allowClear={false}
            onChange={handleYearSelect}
            // defaultValue={moment(selectedYear, "YYYY")}
          />
        )}

        {calObj["view"]?.type === "dayGridMonth" && (
          <DatePicker
            picker="month"
            allowClear={false}
            onChange={handleMonthSelect}
            // defaultValue={moment(`${selectedYear}-${selectedMonth}`, "YYYY-MM")}
          />
        )}

        <FullCalendar
          key={rerender ? "1" : "0"}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            multiMonthPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            center: "dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear",
          }}
          // initialDate={"2030-01-01"}
          initialDate={getInitialDate()}
          customButtons={{
            customButton: {
              text: "Select Year",
              click: handleYearSelect,
            },
          }}
          events={events}
          contentHeight={395}
          // dateClick={handleDateClick}
          datesSet={handleDatesSet}
          views={{
            dayGridYear: {
              type: "dayGrid",
              duration: { years: 1 },
            },
          }}
          dayPopoverContent={dayPopoverContent}
          dayMaxEvents={true}
          eventClassNames={({ event }) => {
            return event.extendedProps.completed ? "completed-event" : "";
          }}
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
        />

        {hoveredEventTitle && (
          <div
            style={{
              left: tooltipPosition.left,
              top: tooltipPosition.top,
              position: "fixed",
              zIndex: 9999,
              backgroundColor: "#474747",
              padding: "10px",
              color: "white",
              borderRadius: "6px",
            }}
          >
            {hoveredEventTitle}
          </div>
        )}

        <Modal
          open={showModal}
          onCancel={handleModalCancel}
          onOk={handleEventSave}
        >
          <div>
            <label>Select Date:</label>
            <DatePicker onChange={handleFromDate} format="YYYY-MM-DD" />
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
                  onChange={(time) => handleTimeChange(time, "startTime")}
                  format="h:mm A"
                  disabled={!selectedDate ? true : false}
                />
              </div>
              <div>
                <label>End Time:</label>
                <TimePicker
                  value={endTime}
                  onChange={(time) => handleTimeChange(time, "endTime")}
                  format="h:mm A"
                  disabled={!selectedDate ? true : false}
                />
              </div>
            </>
          ) : (
            <div>
              <label>Select To Date:</label>
              <DatePicker onChange={handleToDate} format="YYYY-MM-DD" />
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
}

export default CalendarWithTime;
