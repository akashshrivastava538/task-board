import React, { useState } from 'react';
import "./Navbar.css";

function Navbar({ setGrouping, setOrdering }) {
  // Available grouping and ordering options
  let groupingOptions = ['Status', 'User', 'Priority'];
  let orderingOptions = ['Title', 'Priority'];

  // Default view for the options under display is hidden
  const [optionsView, toggleOptionsView] = useState(false);

  // Toggle the view of options under display
  let toggleOptions = () => {
    toggleOptionsView(!optionsView);
  };

  return (
    <div className='navbar-main'>
      <div className='navbar-options-dropdown'>
        <button id="navbar-dropdown-button" onClick={() => toggleOptions()}>
          <span className="icon-tune">⚙️</span>
          <p id="navbar-dropdown-text">Display</p>
          <span className="icon-arrow">⬇️</span>
        </button>
        {optionsView && (
          <div className='navbar-options'>
            <div className='navbar-option'>
              <label htmlFor="grouping">Grouping</label>
              <select
                name="grouping"
                id="grouping"
                onChange={(e) => {
                  localStorage.setItem("grouping", e.target.value);
                  setGrouping(e.target.value);
                }}
              >
                {localStorage.getItem('grouping') && (
                  <option>{localStorage.getItem('grouping')}</option>
                )}
                {groupingOptions.map((group, key) => {
                  return (
                    localStorage.getItem('grouping') !== group && (
                      <option key={key} value={group}>{group}</option>
                    )
                  );
                })}
              </select>
            </div>
            <div className='navbar-option'>
              <div>
                <label htmlFor="ordering">Ordering</label>
              </div>
              <div>
                <select
                  name="ordering"
                  id="ordering"
                  onChange={(e) => {
                    localStorage.setItem("ordering", e.target.value);
                    setOrdering(e.target.value);
                  }}
                >
                  {localStorage.getItem('ordering') && (
                    <option>{localStorage.getItem('ordering')}</option>
                  )}
                  {orderingOptions.map((order, key) => {
                    return (
                      localStorage.getItem('ordering') !== order && (
                        <option key={key} value={order}>{order}</option>
                      )
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
