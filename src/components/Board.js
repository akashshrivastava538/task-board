import React, { useState, useEffect } from "react";
import { fetchTickets } from "./apifetch";
import Column from "./Column";
import "./Board.css"; // Assuming you have styles for your components

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState(
    localStorage.getItem("groupingOption") || "status"
  );
  const [sortingCriteria, setSortingCriteria] = useState(
    localStorage.getItem("sortedBy") || "priority"
  );

  useEffect(() => {
    const retrieveTickets = async () => {
      const fetchedData = await fetchTickets();
      setTickets(fetchedData.tickets);
    };
    retrieveTickets();
  }, []);

  useEffect(() => {
    localStorage.setItem("groupingOption", groupingOption);
  }, [groupingOption]);

  useEffect(() => {
    localStorage.setItem("sortedBy", sortingCriteria);
  }, [sortingCriteria]);

  const organizeTickets = (ticketsList, criterion) => {
    const groupedTickets = {};

    ticketsList.forEach((ticket) => {
      const key =
        criterion === "status"
          ? ticket.status
          : criterion === "user"
          ? ticket.user
          : ticket.priority;
      if (!groupedTickets[key]) {
        groupedTickets[key] = [];
      }
      groupedTickets[key].push(ticket);
    });

    return groupedTickets;
  };

  const arrangeTickets = (groupedTickets, criterion) => {
    const sortedTickets = {};

    Object.keys(groupedTickets).forEach((groupTitle) => {
      const group = groupedTickets[groupTitle];
      sortedTickets[groupTitle] =
        criterion === "priority"
          ? group.sort((a, b) => b.priority - a.priority)
          : group.sort((a, b) => a.title.localeCompare(b.title));
    });

    return sortedTickets;
  };

  const groupedTickets = organizeTickets(tickets, groupingOption);
  const sortedTickets = arrangeTickets(groupedTickets, sortingCriteria);

  return (
    <div className="kanban-board">
      <div className="options">
        <select
          value={groupingOption}
          onChange={(e) => setGroupingOption(e.target.value)}
          style={{ width: 180, marginRight: 10 }}
        >
          <option value="status">Group by Status</option>
          <option value="user">Group by User</option>
          <option value="priority">Group by Priority</option>
        </select>
        <button onClick={() => setSortingCriteria("priority")} className="btn-primary">
          Sort by Priority
        </button>
        <button onClick={() => setSortingCriteria("title")} className="btn-primary">
          Sort by Title
        </button>
      </div>
      <div className="board-columns">
        {Object.keys(sortedTickets).map((groupTitle) => (
          <Column
            key={groupTitle}
            title={groupTitle}
            tickets={sortedTickets[groupTitle]}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

