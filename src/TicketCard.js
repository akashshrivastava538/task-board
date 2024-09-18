import React from 'react';

function TicketCard({ ticket }) {
  return (
    <div className="ticket-card">
      <h3>CAM Number: {ticket.camNumber}</h3>
      <p>Title: {ticket.title}</p>
    </div>
  );
}

export default TicketCard;

