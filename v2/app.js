const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const resultFile = process.env.RESULT_FILE || 'logs/log.txt';

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Utility function to log interactions
const logInteraction = (req) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const timestamp = new Date().toISOString();
  const method = req.method;
  const requestPath = req.originalUrl;

  let logEntry = `${timestamp} - IP: ${ip} - Method: ${method} - Path: ${requestPath}\n`;

  // Log form data for POST requests
  if (method === 'POST') {
    if (req.body) {
      const bodyData = Object.entries(req.body).map(([key, value]) => `${key}: ${value}`).join(', ');
      logEntry += `Login attempt: ${bodyData}\n`;
    }
  }

  fs.appendFileSync(resultFile, logEntry);
  console.log(logEntry);
};

// Middleware to log requests
app.use((req, res, next) => {
  logInteraction(req);
  next();
});

// Route for the root path
app.get('/', (req, res) => {
  res.render('index');
});

// Route for handling all dynamic paths
const dynamicPaths = [
  '/server-status',
  '/api/v1/data',
  '/access',
  '/login',
  '/alerts',
  '/config'
];

app.all(dynamicPaths, (req, res) => {
  const currentPath = req.originalUrl;
  const data = {
    path: currentPath,
    serverStatus: {
      uptime: '24 days',
      cpuUsage: '15',
      memoryUsage: '55%',
      diskSpace: '70GB',
      connections: '120'
    },
    apiData: {
      sampleData: { key: 'value' }
    },
    adminData: {
      users: [
        { id: 1, username: 'admin', role: 'Administrator' }
      ],
      systemLogs: [
        { timestamp: '2024-08-30T12:31:10Z', message: 'System started' }
      ]
    }
  };

  res.render('user', data);
});

// Route for handling 404 and unknown paths
app.use((req, res) => {
  res.status(404).render('user', { path: '/404' });
});

// Start the server
app.listen(port, () => {
  console.log(`Honeypot running on port ${port}`);
});
