const express = require('express');
const cors = require('cors');
const { generatePath } = require('./utils/pathfinder');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ success: true, message: 'Authentication successful' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// API Endpoint for generating path
app.post('/api/path', (req, res) => {
  const { startNode, destinationNode } = req.body;

  if (!startNode || !destinationNode) {
    return res.status(400).json({ error: 'startNode and destinationNode are required' });
  }

  try {
    // Generate the path using our mock pathfinder
    const path = generatePath(startNode, destinationNode);
    
    // Simulate a slight network delay for realism (optional)
    setTimeout(() => {
      res.json({ path });
    }, 500);

  } catch (error) {
    console.error('Error generating path:', error);
    res.status(500).json({ error: 'Failed to generate path' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
