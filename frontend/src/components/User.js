import React, { useState, useEffect } from 'react';
import API from '../api';

const User = () => {
  const [conferences, setConferences] = useState([]);
  const [registration, setRegistration] = useState({ name: '', email: '', confId: '' });

  const fetchConferences = async () => {
    const { data } = await API.get('/conferences');
    setConferences(data);
  };

  const handleRegister = async () => {
    await API.post('/registrations', registration);
    alert('Registered successfully!');
    setRegistration({ name: '', email: '', confId: '' });
  };

  useEffect(() => {
    fetchConferences();
  }, []);

  return (
    <div>
      <h2>User Panel</h2>
      <div>
        <h3>Register for a Conference</h3>
        <input
          type="text"
          placeholder="Name"
          value={registration.name}
          onChange={(e) => setRegistration({ ...registration, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={registration.email}
          onChange={(e) => setRegistration({ ...registration, email: e.target.value })}
        />
        <select
          value={registration.confId}
          onChange={(e) => setRegistration({ ...registration, confId: e.target.value })}
        >
          <option value="">Select a Conference</option>
          {conferences.map((conf) => (
            <option key={conf._id} value={conf._id}>
              {conf.title}
            </option>
          ))}
        </select>
        <button onClick={handleRegister}>Register</button>
      </div>

      <div>
        <h3>Available Conferences</h3>
        {conferences.map((conf) => (
          <div key={conf._id}>
            <h4>{conf.title}</h4>
            <p>Date: {conf.date}</p>
            <p>Location: {conf.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;