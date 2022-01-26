import React, { useState } from 'react';
import moment from "moment";
import { addMonths, getWeekDays, getDatesOfMonth, fetchMonthEvents, format } from '../util/date-util';
import './calendar.scss';
import { events as mockEvents } from '../mocks/events';
import EventModal from './eventModal';

const Calendar = () => {
    const days = getWeekDays();
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [weeks, setWeeks] = useState(getDatesOfMonth());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [events, setEvents] = useState(fetchMonthEvents(mockEvents, weeks));

    const nextMonth = () => {
        const date = addMonths(currentMonth, 1);
        setCurrentMonth(date);
        const dates = getDatesOfMonth(date);
        setWeeks(dates);
        setEvents(fetchMonthEvents(mockEvents, dates));
    }

    const prevMonth = () => {
        const date = addMonths(currentMonth, -1);
        setCurrentMonth(date);
        const dates = getDatesOfMonth(date);
        setWeeks(dates);
        setEvents(fetchMonthEvents(mockEvents, dates));
    }

    const openModal = (day: any) => {
        const from = day.date.format("YYYY-MM-DD");
        setSelectedDate(from);
        setSelectedEvent({from});
        setShowEventModal(true);
    }

    const viewEvent = (e: any, event: any) => {
        e.preventDefault();
        e.stopPropagation();
      setSelectedEvent(event);
      setShowEventModal(true);
    };

    const closeModal = (data: any) => {
        setShowEventModal(false);
        if(data && data.from) {
            data.date = moment(data.from).format('L');
            mockEvents.push(data);
            setEvents(fetchMonthEvents(mockEvents, weeks));
        }
    }

    return (
      <div>
        <div className="calender-header">
          <div className="columns">
            <span className="icon-text" onClick={prevMonth}>
              <span className="icon">
                <i className="fas fa-chevron-left"></i>
              </span>
            </span>
            <button className="button is-white">
              {format(currentMonth, "MMMM YYYY")}
            </button>
            <span className="icon-text" onClick={nextMonth}>
              <span className="icon">
                <i className="fas fa-chevron-right"></i>
              </span>
            </span>
          </div>
        </div>
        <div className="calender-container">
          <div className="columns day-header">
            {days.map((day) => (
              <div key={day} className="column">
                {day}
              </div>
            ))}
          </div>
          <div className="calendar">
            {weeks.map((week, i) => (
              <div className="columns" key={i}>
                {week.map((day) => (
                  <div
                    key={day.formattedDate}
                    className={`column${day.isToday ? " today" : ""}`}
                    onClick={() => openModal(day)}
                  >
                    <span>{day.date.format("D")}</span>
                    {events[day.formattedDate]
                      ? events[day.formattedDate].map((event: any) => (
                          <div
                            className="event"
                            style={{
                              background: event.color ? event.color : "green",
                            }}
                            onClick={(e) => viewEvent(e, event)}
                          >
                            {event.title || event.description}
                          </div>
                        ))
                      : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {showEventModal && (
          <EventModal
            onClose={closeModal}
            eventData={selectedEvent}
          />
        )}
      </div>
    );
}

export default Calendar;
