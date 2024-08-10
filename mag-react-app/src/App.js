import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  handleSearchById, 
  handleGetAllUsers, 
  handleGetAllProfessions 
} from './Services';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [id, setId] = useState('');
  const [professions, setProfessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allUsers = await handleGetAllUsers();
      if (allUsers) {
          setUsers(allUsers);
          setFilteredUsers(allUsers);
      }

      const professions = await handleGetAllProfessions();
      if (professions) {
          setProfessions(professions);
      }
  };
  fetchData();
  }, []);

  const handleSearchUserById = async () => {
    if (id) {
        const user = await handleSearchById(id);
        if (user) {
            setFilteredUsers([user]);
        } else {
            setFilteredUsers([]);
        }
    } else {
        setFilteredUsers(users);
    }
};

  return (
    <div className="App">
      <header className="App-header">
        <h3>User Information</h3>
      </header>
      <div className="search-container">
        <div className="search-field">
          <label htmlFor="id">Search by ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onBlur={handleSearchUserById}
          />
        </div>
      </div>
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
