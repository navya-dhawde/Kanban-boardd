import React, { useState, useEffect } from 'react';
import Kanban from './components/Kanban';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(() => localStorage.getItem('grouping') || 'status');
  const [ordering, setOrdering] = useState(() => localStorage.getItem('ordering') || 'title');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        
        if (Array.isArray(data.tickets) && Array.isArray(data.users)) {
          setTickets(data.tickets);
          setUsers(data.users);
        } else {
          console.error('Expected an array for tickets or users, received:', data);
          setTickets([]);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Persist grouping and ordering states in localStorage
  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('ordering', ordering);
  }, [grouping, ordering]);

  return (
    <div className="app-container">
      <Kanban tickets={tickets} users={users} grouping={grouping} setGrouping={setGrouping} ordering={ordering} setOrdering={setOrdering} />
    </div>
  );
}

export default App;
