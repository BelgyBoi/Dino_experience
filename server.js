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
