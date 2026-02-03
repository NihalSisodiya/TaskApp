import React from 'react';
import TaskList from './TaskList';

function Dashboard({ setToken }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <TaskList />
    </div>
  );
}

export default Dashboard;