import React from 'react';
import Column from './Column';

// Utility function to group tickets
const groupTickets = (tickets, grouping) => {
  const groups = {};
  tickets.forEach(ticket => {
    const key = ticket[grouping];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(ticket);
  });
  return groups;
};

// Utility function to sort tickets
const sortTickets = (tickets, sorting) => {
  return tickets.sort((a, b) => {
    if (sorting === 'priority') {
      return b.priority - a.priority;
    } else if (sorting === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
};

function Board({ tickets, grouping, sorting }) {
  const groupedTickets = groupTickets(tickets, grouping);
  const sortedGroups = Object.entries(groupedTickets).map(([key, value]) => ({
    key,
    tickets: sortTickets(value, sorting)
  }));

  return (
    <div className="board">
      {sortedGroups.map(group => (
        <Column key={group.key} title={group.key} tickets={group.tickets} />
      ))}
    </div>
  );
}

export default Board;




