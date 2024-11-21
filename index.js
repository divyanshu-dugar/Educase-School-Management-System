// Express Setup
const express = require('express');
const app = express();

const School = require('./modules/school');
const haversine = require('haversine-distance');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello Educase India!')
})

// -------------------------
// API Development
// -------------------------

// 1. Add School API
app.post('/addSchool', async (req, res) => {
    const { name, address, latitude, longitude } = req.body;
  
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).send({ error: 'All fields are required.' });
    }
  
    try {
      const school = await School.create({ name, address, latitude, longitude });
      res.status(201).send({ message: 'School added successfully.', school });
    } catch (error) {
      res.status(500).send({ error: 'Failed to add school.', details: error.message });
    }
});

// 2. List Schools API
app.get('/listSchools', async (req, res) => {
    const { latitude, longitude } = req.query;
  
    if (!latitude || !longitude) {
      return res.status(400).send({ error: 'Latitude and longitude are required.' });
    }
  
    try {
      const schools = await School.findAll();
      const userLocation = { lat: parseFloat(latitude), lon: parseFloat(longitude) };
  
      // Calculate distance and sort
      const sortedSchools = schools.map((school) => {
        const schoolLocation = { lat: school.latitude, lon: school.longitude };
        return {
          ...school.dataValues,
          distance: haversine(userLocation, schoolLocation) / 1000, // Convert to km
        };
      }).sort((a, b) => a.distance - b.distance);
  
      res.status(200).send(sortedSchools);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch schools.', details: error.message });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;   