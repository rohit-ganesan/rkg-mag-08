import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  handleSearchById, 
  handleGetAllUsers, 
  handleGetAllProfessions,
  handleSearchByProfession,
  handleSearchByDateRange
} from './Services';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [id, setId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [profession, setProfession] = useState('');
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

const handleSearchUserByDateRange = async () => {
  if (startDate && endDate) {
      const usersInRange = await handleSearchByDateRange(startDate, endDate);
      if (usersInRange) {
          setFilteredUsers(usersInRange);
      }
  } else if (!startDate && !endDate) {
    setFilteredUsers(users);
}
};

const handleSearchUserByProfession = async (event) => {
  const selectedProfession = event.target.value;
  setProfession(selectedProfession);

  if (selectedProfession) {
      const usersByProfession = await handleSearchByProfession(selectedProfession);
      if (usersByProfession) {
          setFilteredUsers(usersByProfession);
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
        <div className="search-field">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onBlur={handleSearchUserByDateRange}
          />
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onBlur={handleSearchUserByDateRange}
          />
        </div>
        <div className="search-field">
          <label htmlFor="profession">Search by Profession:</label>
          <select
            id="profession"
            value={profession}
            onChange={handleSearchUserByProfession}
          >
            <option value="">All Professions</option>
            {professions.map((prof) => (
              <option key={prof} value={prof}>
                {prof}
              </option>
            ))}
          </select>
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
