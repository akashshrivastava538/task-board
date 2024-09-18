import React, { useState, useEffect } from 'react';
import "./Dashboard.css";
import List from '../List/List';

function Dashboard({ statuses, priorities, priorityScores, grouping, ordering }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ tickets: [], users: [] });
    const [ticketGroups, setTicketGroups] = useState([]);

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    // Helper function to group and sort tickets
    const groupAndSortTickets = () => {
        let groupedTickets = [];

        const tickets = data.tickets;
        let groupByProp, groupValues;

        // Determine grouping and sorting based on props
        if (grouping === 'Status') {
            groupByProp = 'status';
            groupValues = statuses;
        } else if (grouping === 'User') {
            groupByProp = 'userId';
            groupValues = data.users.map(user => user.id);
        } else if (grouping === 'Priority') {
            groupByProp = 'priority';
            groupValues = priorityScores;
        }

        // Group tickets by the selected property
        groupValues.forEach(value => {
            let filteredTickets = tickets.filter(ticket => ticket[groupByProp] === value);
            filteredTickets.sort(ordering === 'Title' ? (a, b) => a.title.localeCompare(b.title) : (a, b) => b.priority - a.priority);
            groupedTickets.push(filteredTickets);
        });

        setTicketGroups(groupedTickets);
    };

    // Update tickets whenever grouping or ordering changes
    useEffect(() => {
        groupAndSortTickets();
    }, [grouping, ordering, data]);

    if (loading) return <div className="App">Loading...</div>;

    // Helper function to render group header icons and labels
    const getGroupHeader = (index) => {
        if (grouping === 'Status') {
            return { icon: <span className="icon-info">ℹ️</span>, label: statuses[index] };
        } else if (grouping === 'User') {
            return { icon: <span className="icon-user">👤</span>, label: data.users[index]?.name || 'Unknown' };
        } else if (grouping === 'Priority') {
            return { icon: <span className="icon-priority">⚠️</span>, label: priorities[index] };
        }
    };

    return (
        <div className='dashboard-main'>
            {ticketGroups.map((ticketList, index) => {
                const { icon, label } = getGroupHeader(index);
                return (
                    <div className='dashboard-list' key={index}>
                        <div className='dashboard-list-header-controls'>
                            <div className='dashboard-list-header-controls-info'>
                                {icon}
                                <b><p className='dashboard-list-header'>{label}</p></b>
                                <div className='dashboard-list-items-count'>{ticketList.length}</div>
                            </div>
                            {ticketList.length > 0 && (
                                <div>
                                    <span className="icon-add">➕</span>
                                    <span className="icon-more">⋯</span>
                                </div>
                            )}
                        </div>
                        <List ticketList={ticketList} />
                    </div>
                );
            })}
        </div>
    );
}

export default Dashboard;

