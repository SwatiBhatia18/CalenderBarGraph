import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { openModalWithDate, setCurrentView, setCurrentDate } from '../../store/slices/calendarSlice';
import { hasDataForDate } from '../../utils/dateUtils';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarComponent.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const dispatch = useDispatch();
  const { calendarData, selectedDate, currentView, currentDate } = useSelector((state) => state.calendar);

  const handleSelectSlot = useCallback(({ start }) => {
    dispatch(openModalWithDate(start));
  }, [dispatch]);

  const handleSelectEvent = useCallback((event) => {
    dispatch(openModalWithDate(event.start));
  }, [dispatch]);

  const handleNavigate = useCallback((date) => {
    dispatch(setCurrentDate(date));
  }, [dispatch]);

  const handleViewChange = useCallback((view) => {
    dispatch(setCurrentView(view));
  }, [dispatch]);

  const dayPropGetter = useCallback((date) => {
    const hasData = hasDataForDate(date, calendarData);
    const isSelected = selectedDate && 
      date.toDateString() === selectedDate.toDateString();

    let className = '';
    let style = {};

    if (isSelected) {
      className += ' rbc-selected-day';
      style.backgroundColor = '#2196f3';
      style.color = 'white';
    } else if (hasData) {
      className += ' has-data';
      style.backgroundColor = '#fff3cd';
      style.borderColor = '#ffc107';
      style.fontWeight = 'bold';
    }

    if (moment(date).isSame(moment(), 'day')) {
      className += ' rbc-today';
      if (!isSelected && !hasData) {
        style.backgroundColor = '#e3f2fd';
      }
    }

    return {
      className: className.trim(),
      style
    };
  }, [calendarData, selectedDate]);

  const events = useMemo(() => 
    Object.keys(calendarData).map(dateKey => {
      const [day, month, year] = dateKey.split('-');
      const date = new Date(year, month - 1, day);
      
      return {
        id: dateKey,
        title: '📊 Data Available',
        start: date,
        end: date,
        allDay: true,
        resource: calendarData[dateKey]
      };
    }), [calendarData]);

  return (
    <div className="calendar-wrapper">
      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color today"></div>
          <span>Today</span>
        </div>
        <div className="legend-item">
          <div className="legend-color has-data"></div>
          <span>Has Data</span>
        </div>
        <div className="legend-item">
          <div className="legend-color selected"></div>
          <span>Selected</span>
        </div>
      </div>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        view={currentView}
        date={currentDate}
        selectable
        dayPropGetter={dayPropGetter}
        views={['month', 'week', 'day']}
        popup
        showMultiDayTimes
        step={60}
        showAllEvents
        className="custom-calendar"
      />
    </div>
  );
};

export default React.memo(CalendarComponent);
