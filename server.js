const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    // Collect data chunks
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // When all data is received
    req.on('end', () => {
      console.log('POST request body:', body);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('POST request body received and logged.\n');
    });

    // Handle errors
    req.on('error', (err) => {
      console.error('Error receiving data:', err);
      res.statusCode = 400;
      res.end('Error receiving data');
    });
  } else {
    // For other HTTP methods, respond with 405 Method Not Allowed
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Only POST requests are supported.\n');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/`);
});
