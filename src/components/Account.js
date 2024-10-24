// src/components/Account.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setName(loggedInUser.name);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSave = () => {
    const updatedUser = { ...user, name };
    localStorage.setItem(user.email, JSON.stringify(updatedUser));
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    alert('Account updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div>
      <h2>Account Information</h2>
      {user && (
        <>
          <div>
            <label>Email: {user.email}</label>
          </div>
          <div>
            <label>Name: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Account;
