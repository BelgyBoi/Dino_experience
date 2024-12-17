const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static('public'));

// Serve video files from the videos directory
app.use('/videos', express.static('videos'));

// Serve assets files from the assets directory
app.use('/assets', express.static('assets'));

// Ensure correct MIME type for CSS
app.use((req, res, next) => {
  if (req.url.endsWith('.css')) {
    res.header('Content-Type', 'text/css');
  }
  next();
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('playVideo', (videoId) => {
    io.emit('playVideo', videoId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
