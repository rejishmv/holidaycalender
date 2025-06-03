// src/utils.js

import { saveAs } from 'file-saver';

export const parseTabDelimitedText = (text) => {
    const lines = text.trim().split('\n');
    const holidays = lines.map(line => {
        const [summary, dtstart] = line.split('\t').map(value => value.trim());
        return {
            summary,
            dtstart,
            description: '',
            status: 'CONFIRMED',
            transp: 'TRANSPARENT',
            sequence: 0
        };
    });
    return holidays;
};

export const generateICS = (holidays) => {
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Your Organization//Your Product//EN'
    ];

    holidays.forEach(holiday => {
        const startDate = new Date(holiday.dtstart);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        const formatDate = (date) => {
            return date.toISOString().split('T')[0].replace(/-/g, '') + 'T000000Z';
        };

        icsContent.push('BEGIN:VEVENT');
        icsContent.push(`UID:${holiday.uid}`);
        icsContent.push(`DTSTAMP:${holiday.dtstamp}`);
        icsContent.push(`DTSTART;VALUE=DATE:${holiday.dtstart.replace(/-/g, '')}`);
        icsContent.push(`DTEND;VALUE=DATE:${endDate.toISOString().split('T')[0].replace(/-/g, '')}`);
        icsContent.push(`SUMMARY:${holiday.summary}`);
        icsContent.push(`DESCRIPTION:${holiday.description}`);
        icsContent.push(`STATUS:${holiday.status}`);
        icsContent.push(`TRANSP:${holiday.transp}`);
        icsContent.push(`SEQUENCE:${holiday.sequence}`);
        icsContent.push('END:VEVENT');
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\n')], { type: 'text/calendar' });
    saveAs(blob, 'indian_holidays.ics');
};