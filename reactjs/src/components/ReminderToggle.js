import React from 'react'
import { useAccordionButton } from 'react-bootstrap';

export default function ReminderToggle({children, eventKey}) {
    const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <button
        type="button"
        className="btn btn-success btn-sm w-100 mb-1"
        onClick={decoratedOnClick}
    >
    {children}
    </button>
    );
}
