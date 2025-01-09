import React, { useState, useEffect } from 'react';
import API from '../api';

const Admin = () => {
  const [conferences, setConferences] = useState([]);
  const [newConf, setNewConf] = useState({ title: '', date: '', location: '' });

  const fetchConferences = async () => {
    const { data } = await API.get('/conferences');
    setConferences(data);
  };

  const handleAddConference = async () => {
    await API.post('/conferences', newConf);
    fetchConferences();
    setNewConf({ title: '', date: '', location: '' });
  };

  const handleDeleteConference = async (id) => {
    await API.delete(`/conferences/${id}`);
    fetchConferences();
  };

  useEffect(() => {
    fetchConferences();
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
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

      <div>
        <h3>All Conferences</h3>
        {conferences.map((conf) => (
          <div key={conf._id}>
            <h4>{conf.title}</h4>
            <p>Date: {conf.date}</p>
            <p>Location: {conf.location}</p>
            <button onClick={() => handleDeleteConference(conf._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;