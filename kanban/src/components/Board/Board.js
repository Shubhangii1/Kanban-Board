import React, { useState, useEffect } from 'react';
import './Board.css';
import { MoreHorizontal, Circle } from 'react-feather';
import Editable from '../Editable/Editable';
import Card from '../Card/Card';
import Dropdown from '../Dropdown/Dropdown';

function Board({ status, groupOption, setGroupOption, sortOption, setSortOption }) {
  const [tickets, setTickets] = useState([]);
  const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';

  const groupTicketsByStatus = () => {
    const groupedTickets = {
      ToDo: [],
      Progress: [],
      Done: [],
    };

    tickets.forEach((ticket) => {
      groupedTickets[ticket.status].push(ticket);
    });

    return groupedTickets;
  };

  const sortTicketsByPriority = () => {
    return [...tickets].sort((a, b) => b.priority - a.priority);
  };

  const sortTicketsByTitle = () => {
    return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
  };

  let groupedAndSortedTickets = tickets;
  if (groupOption === 'Status') {
    groupedAndSortedTickets = groupTicketsByStatus()[sortOption];
  }

  if (sortOption === 'Priority') {
    groupedAndSortedTickets = sortTicketsByPriority();
  } else if (sortOption === 'Title') {
    groupedAndSortedTickets = sortTicketsByTitle();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          console.error('Failed to fetch data from API');
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          <Circle />
          {status} <span>To Do{groupedAndSortedTickets[status] ? groupedAndSortedTickets[status].length : 0}</span>
        </p>
        
        <div className="board_top_more" onClick={() => setShowDropdown(true)}>
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown onClose={() => setShowDropdown(false)}>
              <div className="board_dropdown">
                <p>Delete Board</p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {groupedAndSortedTickets[status] && Array.isArray(groupedAndSortedTickets[status]) ? (
          groupedAndSortedTickets[status].map((ticket) => (
            <Card key={ticket.id} title={ticket.title} status={ticket.status} />
          ))
        ) : (
          <p>No tickets in {status}</p>
        )}
        <Editable
          displayClass="boards_cards_add"
          text="Add Card"
          placeholder="Enter Card Title"
        />
      </div>
    </div>
     );
}

export default Board;

