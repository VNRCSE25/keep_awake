const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Define a route to keep the server awake
app.get('/keep-awake', async (req, res) => {
  try {
    const response = await fetch('http://yourwebsite.com');
    if (response.ok) {
      res.send('Server is awake');
    } else {
      res.status(500).send('Failed to keep server awake');
    }
  } catch (error) {
    res.status(500).send(`Error keeping server awake: ${error.message}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Function to make HTTP request to keep the server awake
const keepAwake = async () => {
  try {
    await fetch('http://localhost:3000/keep-awake');
    console.log('Server is kept awake');
  } catch (error) {
    console.error('Error keeping server awake:', error.message);
  }
};

// Schedule keepAwake function to run every 10 minutes
setInterval(keepAwake, 10 * 60 * 1000); // 10 minutes * 60 seconds * 1000 milliseconds