import React from 'react';
import "./Ticket.css";

function Ticket({ ticket }) {
  return (
    <div className='ticket-main'>
      <div className='ticket-header'>
        <div className='ticket-id'>{ticket.id}</div>
        <span className='icon-user'>👤</span>
      </div>
      <div className='ticket-content'>
        <div className='ticket-content-title'>
          <span className='icon-check'>✔️</span>
          <div className='ticket-title'><b>{ticket.title}</b></div>
        </div>
      </div>
      <div className='ticket-metadata'>
        <div className='ticket-tags'>
          <div className="ticket-tag">
            <span className='icon-email'>📧</span>
          </div>
          {ticket.tag.map((tag, key) => {
            return (
              <div key={key} className='ticket-tag'>
                <span className='icon-dot'>•</span>
                <div>{tag}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
