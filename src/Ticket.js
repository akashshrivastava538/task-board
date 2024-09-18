import React from 'react';

const Ticket = ({ ticket }) => 
{
  return (
    <div className={`ticket priority-${ticket.priority}`}>
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>Assigned to: {ticket.assignedTo}</p>
    </div>
  );
};

export default Ticket;