import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('login');

  return (
    <div>
      {!token ? (
        <>
          <button onClick={() => setView('login')}>Login</button>
          <button onClick={() => setView('register')}>Register</button>
          {view === 'login' ? <Login setToken={setToken} /> : <Register setToken={setToken} />}
        </>
      ) : (
        <Dashboard setToken={setToken} />
      )}
    </div>
  );
}

export default App;