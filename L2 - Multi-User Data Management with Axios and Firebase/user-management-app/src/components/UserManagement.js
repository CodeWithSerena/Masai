import React, { useState, useEffect } from 'react';
import axios from 'axios';
import database from '../firebaseConfig';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  // Fetch Users from Firebase
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://user-management-system-a7252-default-rtdb.asia-southeast1.firebasedatabase.app/users.json');
      const usersData = response.data;
      const usersList = usersData ? Object.keys(usersData).map((key) => ({
        id: key,
        ...usersData[key],
      })) : [];
      setUsers(usersList);
    } catch (error) {
      setError('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add User
  const addUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !validateEmail(email)) {
      setError('Please enter valid Name and Email');
      return;
    }
    try {
      await axios.post('https://user-management-system-a7252-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', {
        name,
        email,
      });
      setName('');
      setEmail('');
      fetchUsers();
    } catch (error) {
      setError('Error adding user');
    }
  };

  // Edit User
  const editUser = async (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !validateEmail(email)) {
      setError('Please enter valid Name and Email');
      return;
    }
    try {
      await axios.patch(`https://user-management-system-a7252-default-rtdb.asia-southeast1.firebasedatabase.app/users/${editId}.json
`, {
        name,
        email,
      });
      setEditId(null);
      setName('');
      setEmail('');
      fetchUsers();
    } catch (error) {
      setError('Error updating user');
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://user-management-system-a7252-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json
`);
      fetchUsers();
    } catch (error) {
      setError('Error deleting user');
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <h1>User Management</h1>

      <form onSubmit={editId ? saveUser : addUser}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
          />
        </div>
        <button type="submit">{editId ? 'Save Changes' : 'Add User'}</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
