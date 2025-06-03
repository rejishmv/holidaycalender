// src/App.js

import React, { useState } from 'react';
import holidays from './holidays';
import { parseTabDelimitedText, generateICS } from './utils';
import HolidayForm from './HolidayForm';
import HolidayTable from './HolidayTable';
import './App.css';

function App() {
    const [userHolidays, setUserHolidays] = useState([]);

    const addHoliday = (holiday) => {
        setUserHolidays([...userHolidays, holiday]);
    };

    const updateHoliday = (index, updatedHoliday) => {
        const updatedHolidays = userHolidays.map((holiday, i) =>
            i === index ? updatedHoliday : holiday
        );
        setUserHolidays(updatedHolidays);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const newHolidays = parseTabDelimitedText(data);
            setUserHolidays((prevHolidays) => [...prevHolidays, ...newHolidays]);
        };
        reader.readAsText(file);
    };

    const handleDownload = () => {
        const allHolidays = [...holidays, ...userHolidays.map((holiday, index) => ({
            ...holiday,
            uid: `user-${index + 1}`,
            dtstamp: new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z'
        }))];
        generateICS(allHolidays);
    };

    const allHolidays = [...holidays, ...userHolidays];

    return (
        <div className="App">
            <header className="App-header">
                <h1>Indian Holiday Calendar</h1>
                <input type="file" accept=".txt" onChange={handleFileUpload} />
                <HolidayForm addHoliday={addHoliday} />
                <button onClick={handleDownload}>Download ICS File</button>
                <HolidayTable holidays={allHolidays} updateHoliday={updateHoliday} />
            </header>
        </div>
    );
}

export default App;