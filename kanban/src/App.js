import React, { useState, useEffect } from 'react';

import Board from './components/Board/Board';
import Editable from './components/Editable/Editable';
import './App.css';
import Board2 from './components/Board/Board2';
import Board3 from './components/Board/Board3';
import Board4 from './components/Board/Board4';

function App() {
  const [groupOption, setGroupOption] = useState('status');
  const [sortOption, setSortOption] = useState('priority');
  const [displayOptionsVisible, setDisplayOptionsVisible] = useState(false);

  const handleGroupByUser = () => {
    setGroupOption('user');
    setDisplayOptionsVisible(false);
  };

  const handleGroupByPriority = () => {
    setGroupOption('priority');
    setDisplayOptionsVisible(false);
  };

  const handleDisplayClick = () => {
    setDisplayOptionsVisible(!displayOptionsVisible);
  };

  const handleSortByPriority = () => {
    setSortOption('priority');
    setDisplayOptionsVisible(false);
  };

  const handleSortByTitle = () => {
    setSortOption('title');
    setDisplayOptionsVisible(false);
  };

  return (
    <div className="app">
      <div className="app_navbar">
        <h2>
          <button className="display-button" onClick={handleDisplayClick}>
            Display
          </button>
        </h2>
        {displayOptionsVisible && (
          <div className="display-options">
            <button onClick={handleGroupByUser}>Group by User</button>
            <button onClick={handleGroupByPriority}>Group by Priority</button>
            <button onClick={handleSortByPriority}>Sort by Priority</button>
            <button onClick={handleSortByTitle}>Sort by Title</button>
          </div>
        )}
      </div>
      <div className="app_outer">
        <div className="app_boards">
          <Board
            groupOption={groupOption}
            setGroupOption={setGroupOption}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <Board2 />
          <Board3 />
          <Board4/>
          <div className="app_boards_board">
            <Editable
              displayClass="app_boards_board_add"
              text="Add Board"
              placeholder="Enter board title"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


