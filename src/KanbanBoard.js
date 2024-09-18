import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortedByPriority, setSortedByPriority] = useState(false);
  const [sortedByTitle, setSortedByTitle] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTickets(data);
        }
      })
      .catch((error) => console.error('Error fetching tickets:', error));
  }, []);

  // Group and sort tickets based on user selection
  const groupAndSortTickets = () => {
    let groupedTickets = [...tickets];

    // Grouping Logic
    switch (groupingOption) {
      case 'status':
        groupedTickets.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'user':
        groupedTickets.sort((a, b) => a.assignedTo.localeCompare(b.assignedTo));
        break;
      case 'priority':
        groupedTickets.sort((a, b) => b.priority - a.priority);
        break;
      default:
        break;
    }

    // Sorting Logic
    if (sortedByPriority) {
      groupedTickets.sort((a, b) => b.priority - a.priority);
    } else if (sortedByTitle) {
      groupedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    return groupedTickets;
  };

  // Load and save view state to/from localStorage
  useEffect(() => {
    const savedGroupingOption = localStorage.getItem('groupingOption');
    const savedSortingByPriority = localStorage.getItem('sortedByPriority');
    const savedSortingByTitle = localStorage.getItem('sortedByTitle');

    if (savedGroupingOption) {
      setGroupingOption(savedGroupingOption);
    }
    if (savedSortingByPriority !== null) {
      setSortedByPriority(JSON.parse(savedSortingByPriority));
    }
    if (savedSortingByTitle !== null) {
      setSortedByTitle(JSON.parse(savedSortingByTitle));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('groupingOption', groupingOption);
    localStorage.setItem('sortedByPriority', JSON.stringify(sortedByPriority));
    localStorage.setItem('sortedByTitle', JSON.stringify(sortedByTitle));
  }, [groupingOption, sortedByPriority, sortedByTitle]);

  const ticketsToDisplay = groupAndSortTickets();

  return (
    <div className="kanban-board">
      {/* Dropdown for selecting grouping option */}
      <select onChange={(e) => setGroupingOption(e.target.value)} value={groupingOption}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>

      {/* Checkbox for sorting by priority */}
      <label>
        <input
          type="checkbox"
          checked={sortedByPriority}
          onChange={(e) => setSortedByPriority(e.target.checked)}
        />
        Sort by Priority
      </label>

      {/* Checkbox for sorting by title */}
      <label>
        <input
          type="checkbox"
          checked={sortedByTitle}
          onChange={(e) => setSortedByTitle(e.target.checked)}
        />
        Sort by Title
      </label>

      {/* Tickets Container */}
      <div className="tickets-container">
        {ticketsToDisplay.map((ticket) => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
