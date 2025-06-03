// src/HolidayForm.js

import React, { useState } from 'react';

const HolidayForm = ({ addHoliday }) => {
    const [holiday, setHoliday] = useState({
        summary: '',
        dtstart: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHoliday({
            ...holiday,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (holiday.summary && holiday.dtstart) {
            addHoliday(holiday);
            setHoliday({
                summary: '',
                dtstart: '',
                description: ''
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="summary"
                placeholder="Summary"
                value={holiday.summary}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="dtstart"
                placeholder="Start Date"
                value={holiday.dtstart}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={holiday.description}
                onChange={handleChange}
            />
            <button type="submit">Add Holiday</button>
        </form>
    );
};

export default HolidayForm;