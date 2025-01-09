const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas Connection
const DB_URI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(DB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Schemas and Models
const ConferenceSchema = new mongoose.Schema({
  title: String,
  date: String,
  location: String,
});

const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  confId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conference' },
});

const Conference = mongoose.model('Conference', ConferenceSchema);
const Registration = mongoose.model('Registration', RegistrationSchema);

// Routes
// Get all conferences
app.get('/conferences', async (req, res) => {
  try {
    const conferences = await Conference.find();
    res.json(conferences);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching conferences', error: err });
  }
});

// Add a new conference
app.post('/conferences', async (req, res) => {
  const { title, date, location } = req.body;
  try {
    const conference = new Conference({ title, date, location });
    await conference.save();
    res.status(201).json(conference);
  } catch (err) {
    res.status(500).json({ message: 'Error adding conference', error: err });
  }
});

// Update a conference
app.put('/conferences/:id', async (req, res) => {
  const { id } = req.params;
  const { title, date, location } = req.body;
  try {
    const updatedConference = await Conference.findByIdAndUpdate(
      id,
      { title, date, location },
      { new: true }
    );
    if (!updatedConference) {
      return res.status(404).json({ message: 'Conference not found' });
    }
    res.json(updatedConference);
  } catch (err) {
    res.status(500).json({ message: 'Error updating conference', error: err });
  }
});

// Delete a conference
app.delete('/conferences/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const conference = await Conference.findByIdAndDelete(id);
    if (!conference) {
      return res.status(404).json({ message: 'Conference not found' });
    }
    res.json({ message: 'Conference deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting conference', error: err });
  }
});

// Register for a conference
app.post('/registrations', async (req, res) => {
  const { name, email, confId } = req.body;
  try {
    const registration = new Registration({ name, email, confId });
    await registration.save();
    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ message: 'Error registering for conference', error: err });
  }
});

// Get all registrations (users who have registered for conferences) along with conference data
app.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find().populate('confId', 'title'); // Populate conference title
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching registrations', error: err });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});