import React, { useState, useEffect } from 'react';
import API from '../api';

const Admin = () => {
  const [conferences, setConferences] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [newConf, setNewConf] = useState({ title: '', date: '', location: '' });

  // Fetch all conferences
  const fetchConferences = async () => {
    const { data } = await API.get('/conferences');
    setConferences(data);
  };

  // Fetch all registrations (users who have registered)
  const fetchRegistrations = async () => {
    const { data } = await API.get('/registrations');
    setRegistrations(data);
  };

  // Handle adding a new conference
  const handleAddConference = async () => {
    await API.post('/conferences', newConf);
    fetchConferences();
    setNewConf({ title: '', date: '', location: '' });
  };

  // Handle deleting a conference
  const handleDeleteConference = async (id) => {
    await API.delete(`/conferences/${id}`);
    fetchConferences();
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchConferences();
    fetchRegistrations();
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>

      {/* Add Conference Section */}
      <div>
        <h3>Add Conference</h3>
        <input
          type="text"
          placeholder="Title"
          value={newConf.title}
          onChange={(e) => setNewConf({ ...newConf, title: e.target.value })}
        />
        <input
          type="date"
          value={newConf.date}
          onChange={(e) => setNewConf({ ...newConf, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newConf.location}
          onChange={(e) => setNewConf({ ...newConf, location: e.target.value })}
        />
        <button onClick={handleAddConference}>Add</button>
      </div>

      {/* Display All Conferences */}
      <div>
        <h3>All Conferences</h3>
        {conferences.map((conf) => (
          <div key={conf._id}>
            <h4>{conf.title}</h4>
            <p>Date: {conf.date}</p>
            <p>Location: {conf.location}</p>
            <button onClick={() => handleDeleteConference(conf._id)}>Delete</button>

            {/* Display Registered Users for this Conference */}
            <h5>Registered Users</h5>
            {registrations
              .filter((reg) => reg.confId._id === conf._id) // Filter registrations for the current conference
              .map((reg) => (
                <div key={reg._id}>
                  <p>{reg.name} ({reg.email})</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;