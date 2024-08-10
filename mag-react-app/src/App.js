import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  handleSearchById, 
  handleGetAllUsers, 
  handleGetAllProfessions,
  handleSearchByProfession,
  handleSearchByDateRange,
  handleAddUser
} from './Services';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [professions, setProfessions] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false); // State to toggle the form

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

  const handleAddNewUser = async () => {
    const newUser = {
      id,
      firstName,
      lastName,
      email,
      profession,
      country,
      city,
      createdDate
    };

    const addedUser = await handleAddUser(newUser);
    if (addedUser) {
        const allUsers = await handleGetAllUsers();
        setUsers(allUsers);
        setFilteredUsers(allUsers);
        clearFormFields(); // Clear the form fields after adding
        setShowAddUserForm(false); // Hide the form after adding the user
    }
  };

  const clearFormFields = () => {
    setId('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setProfession('');
    setCountry('');
    setCity('');
    setCreatedDate('');
  };

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
    setFilteredUsers(users); // Reset to original users if both dates are cleared
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
        <h2>User Information ({filteredUsers.length}) </h2>
      </header>

      {/* Button to Show Add User Form */}
      <button className="toggle-form-button" onClick={() => setShowAddUserForm(!showAddUserForm)}>
        {showAddUserForm ? "Close Add User Form" : "Add New User"}
      </button>

      {/* Add New User Form */}
      {showAddUserForm && (
        <div className="add-user-form">
          <h2>Add New User</h2>
          <div className="form-field">
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="profession">Profession:</label>
            <select
              id="profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            >
              <option value="">Select Profession</option>
              {professions.map((prof) => (
                <option key={prof} value={prof}>
                  {prof}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="createdDate">Created Date:</label>
            <input
              type="date"
              id="createdDate"
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
            />
          </div>
          <button className="toggle-form-button" onClick={handleAddNewUser}>Add User</button>
        </div>
      )}

      {/* Search functionality */}
      <div className="search-container">
        <div className="search-field">
          <label htmlFor="id">Search by ID:</label>
          <input
            type="text"
            id="searchId"
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
          <label htmlFor="searchProfession">Search by Profession:</label>
          <select
            id="searchProfession"
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

      {/* Display users */}
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
