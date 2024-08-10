import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [professions, setProfessions] = useState([]);

  useEffect(() => {
    // Fetch all users on initial load
    fetch('http://127.0.0.1:8080/api/users', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }).then((data) => {
      setUsers(data);
      setFilteredUsers(data); // Initially show all users
    }).catch((err) => {
      console.error("Fetch error:", err);
    });

    // Fetch list of professions for the dropdown
    fetch('http://127.0.0.1:8080/api/users/all-professions', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())
      .then((data) => setProfessions(data))
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h3>User Information</h3>
      </header>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Profession</th>
            <th>Country</th>
            <th>City</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.profession}</td>
                <td>{user.country}</td>
                <td>{user.city}</td>
                <td>{user.createdDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default App;
