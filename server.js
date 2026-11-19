const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3000;
// Replace this with your actual public Render URL once your service is created
const APP_URL = 'https://rendernode-kjvr.onrender.com' 

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/api/data' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: "Hello from the backend server!",
      timestamp: new Date().toISOString(),
      luckyNumber: Math.floor(Math.random() * 100) + 1
    }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Start the self-pinging loop to stop inactivity sleep
  setInterval(() => {
    if (!APP_URL.includes('your-app-name')) { // Avoid running on local machine default
      https.get(APP_URL, (res) => {
        console.log(`Self-ping sent. Status: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error(`Self-ping failed: ${err.message}`);
      });
    }
  }, 12 * 60 * 1000); // 12 minutes loop
});
