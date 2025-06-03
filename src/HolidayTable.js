// src/HolidayTable.js

import React, { useState } from 'react';

const HolidayTable = ({ holidays, updateHoliday }) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingField, setEditingField] = useState(null);

    const handleInputChange = (e, index, field) => {
        const { value } = e.target;
        const updatedHoliday = { ...holidays[index], [field]: value };
        updateHoliday(index, updatedHoliday);
    };

    const handleDoubleClick = (index, field) => {
        setEditingIndex(index);
        setEditingField(field);
    };

    const handleBlur = () => {
        setEditingIndex(null);
        setEditingField(null);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Summary</th>
                    <th>Date</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {holidays.map((holiday, index) => (
                    <tr key={index}>
                        <td onDoubleClick={() => handleDoubleClick(index, 'summary')}>
                            {editingIndex === index && editingField === 'summary' ? (
                                <input
                                    type="text"
                                    name="summary"
                                    value={holiday.summary}
                                    onChange={(e) => handleInputChange(e, index, 'summary')}
                                    onBlur={handleBlur}
                                    autoFocus
                                />
                            ) : (
                                holiday.summary
                            )}
                        </td>
                        <td onDoubleClick={() => handleDoubleClick(index, 'dtstart')}>
                            {editingIndex === index && editingField === 'dtstart' ? (
                                <input
                                    type="date"
                                    name="dtstart"
                                    value={holiday.dtstart}
                                    onChange={(e) => handleInputChange(e, index, 'dtstart')}
                                    onBlur={handleBlur}
                                    autoFocus
                                />
                            ) : (
                                holiday.dtstart
                            )}
                        </td>
                        <td onDoubleClick={() => handleDoubleClick(index, 'description')}>
                            {editingIndex === index && editingField === 'description' ? (
                                <input
                                    type="text"
                                    name="description"
                                    value={holiday.description}
                                    onChange={(e) => handleInputChange(e, index, 'description')}
                                    onBlur={handleBlur}
                                    autoFocus
                                />
                            ) : (
                                holiday.description
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default HolidayTable;