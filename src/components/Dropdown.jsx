import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css'; // Optional: Create CSS for styling the dropdown
import { ReactComponent as DisplayIcon } from './../assets/Display.svg'; // Import your left SVG as a React component
import { ReactComponent as ArrowIcon } from './../assets/down.svg'; // Import your right SVG as a React component

const Dropdown = ({ onGroupChange, onOrderChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('status');
  const [selectedOrder, setSelectedOrder] = useState('title');
  const [isGroupDropdownOpen, setGroupDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
    onGroupChange(group);
    setGroupDropdownOpen(false);
  };

  const handleOrderChange = (order) => {
    setSelectedOrder(order);
    onOrderChange(order);
    setOrderDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setGroupDropdownOpen(false);
        setOrderDropdownOpen(false);
      }
    };

    // Add event listener
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown" ref={dropdownRef}> {/* Attach the ref here */}
      <button className="dropdown-button" onClick={toggleDropdown}>
        <DisplayIcon className="dropdown-icon" /> Display <ArrowIcon className="dropdown-arrow" />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="group-by">
            <h4>Grouping</h4>
            <div className="group-by-dropdown">
              <button className="drop-button" onClick={() => setGroupDropdownOpen(!isGroupDropdownOpen)}>
                {selectedGroup} <ArrowIcon className="dropdown-arrow" />
              </button>
              {isGroupDropdownOpen && (
                <div className="dropdown-options">
                  <button onClick={() => handleGroupChange('status')}>
                    Status <ArrowIcon className="dropdown-arrow" />
                  </button>
                  <button onClick={() => handleGroupChange('user')}>
                    User <ArrowIcon className="dropdown-arrow" />
                  </button>
                  <button onClick={() => handleGroupChange('priority')}>
                    Priority <ArrowIcon className="dropdown-arrow" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="order-by">
            <h4>Ordering</h4>
            <div className="order-by-dropdown">
              <button className="drop-button" onClick={() => setOrderDropdownOpen(!isOrderDropdownOpen)}>
                {selectedOrder} <ArrowIcon className="dropdown-arrow" />
              </button>
              {isOrderDropdownOpen && (
                <div className="dropdown-options">
                  <button onClick={() => handleOrderChange('priority')}>
                    Priority <ArrowIcon className="dropdown-arrow" />
                  </button>
                  <button onClick={() => handleOrderChange('title')}>
                    Title <ArrowIcon className="dropdown-arrow" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
