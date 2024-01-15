import React, { useState, useEffect } from 'react';
import { FaLeftLong } from "react-icons/fa6";
import { FaRightLong } from "react-icons/fa6";

const daysOfWeek = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [termine, setTermine] = useState([]);
  const [selectedTermine, setSelectedTermine] = useState([]);
  const [grayedOut, setGrayedOut] = useState([]);

  useEffect(() => {
    // Replace this with the URL of your API endpoint
    fetch('http://localhost:3000/api/calendar/read')
      .then(response => response.json())
      .then(data => setTermine(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, [currentDate]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1; // Start with Monday
  };

  const handleDayClick = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    const termineForDay = termine.filter(termin => new Date(termin.startDate).toDateString() === new Date(date).toDateString());
    setSelectedTermine(termineForDay);

    // Set grayedOut state
    if (termineForDay.length > 0) {
      setGrayedOut(prevState => [...prevState, day]);
    } else {
      setGrayedOut(prevState => prevState.filter(d => d !== day));
    }
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const emptyDays = Array(firstDayOfMonth).fill(null);
  const calendarDays = [...emptyDays, ...Array(daysInMonth).keys()];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <button 
          className="px-4 py-2 m-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow"
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
        >
          <FaLeftLong className="icon-size"/>
        </button>

        <div className="flex flex-col sm:flex-row items-center">
          <div className="px-4 py-2 m-1 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow">
            {currentDate.toLocaleString('de', { month: 'long' })}
          </div>
          <div className="px-4 py-2 m-1 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow">
            {currentDate.getFullYear()}
          </div>
        </div>

        <button 
          className="px-4 py-2 m-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow"
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
        >
        <FaRightLong className="icon-size"/>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center font-bold">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div key={index} className={`p-4 rounded-lg ${day !== null ? (day + 1 === new Date().getDate() ? 'bg-blue-200' : '') : ''} ${grayedOut.includes(day + 1) ? 'bg-gray-300' : ''} ${day !== null ? 'bg-white shadow flex justify-center items-center cursor-pointer' : 'opacity-0'}`}
               onClick={() => day !== null && handleDayClick(day + 1)}>
            {day !== null ? day + 1 : ''}
          </div>
        ))}
      </div>

      {selectedTermine.length > 0 && (
        <div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold">Termine am ausgewählten Tag:</h2>
          {selectedTermine.map(termin => (
            <div key={termin.eventId} className="mt-2">
              <p className="font-semibold">{termin.title}</p>
              <p>{new Date(termin.startDate).toLocaleTimeString()} - {new Date(termin.endDate).toLocaleTimeString()}</p>
              {termin.location && <p>Ort: {termin.location}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Calendar;