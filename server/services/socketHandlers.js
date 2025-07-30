// Socket.io event handlers
const socketHandlers = (io, socket) => {
  console.log(`🔌 Socket ${socket.id} connected`);

  // Join user to their personal room
  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`👤 User ${userId} joined their room`);
  });

  // Join book club room
  socket.on('join-book-club', (clubId) => {
    socket.join(`club-${clubId}`);
    console.log(`📚 Socket ${socket.id} joined book club ${clubId}`);
  });

  // Leave book club room
  socket.on('leave-book-club', (clubId) => {
    socket.leave(`club-${clubId}`);
    console.log(`📚 Socket ${socket.id} left book club ${clubId}`);
  });

  // Handle book club messages
  socket.on('book-club-message', (data) => {
    const { clubId, message, userId, username } = data;
    
    io.to(`club-${clubId}`).emit('new-book-club-message', {
      clubId,
      message,
      userId,
      username,
      timestamp: new Date().toISOString()
    });
  });

  // Handle reading progress updates
  socket.on('reading-progress', (data) => {
    const { userId, bookId, progress, page } = data;
    
    // Broadcast to user's followers
    io.to(`user-${userId}`).emit('reading-progress-update', {
      userId,
      bookId,
      progress,
      page,
      timestamp: new Date().toISOString()
    });
  });

  // Handle anonymous reading partner requests
  socket.on('find-reading-partner', (data) => {
    const { userId, preferences } = data;
    
    // Find available partners
    socket.broadcast.emit('reading-partner-request', {
      userId,
      preferences,
      timestamp: new Date().toISOString()
    });
  });

  // Handle reading partner responses
  socket.on('reading-partner-response', (data) => {
    const { requesterId, responderId, accepted } = data;
    
    if (accepted) {
      // Create a private room for the pair
      const roomId = `reading-pair-${requesterId}-${responderId}`;
      socket.join(roomId);
      io.to(`user-${requesterId}`).emit('reading-partner-found', {
        partnerId: responderId,
        roomId
      });
    }
  });

  // Handle virtual bookshelf interactions
  socket.on('bookshelf-interaction', (data) => {
    const { userId, bookId, action } = data;
    
    // Broadcast to user's followers
    io.to(`user-${userId}`).emit('bookshelf-update', {
      userId,
      bookId,
      action,
      timestamp: new Date().toISOString()
    });
  });

  // Handle achievement notifications
  socket.on('achievement-earned', (data) => {
    const { userId, achievement } = data;
    
    // Send to user
    io.to(`user-${userId}`).emit('new-achievement', {
      achievement,
      timestamp: new Date().toISOString()
    });
  });

  // Handle typing indicators
  socket.on('typing-start', (data) => {
    const { clubId, userId, username } = data;
    
    socket.to(`club-${clubId}`).emit('user-typing', {
      userId,
      username,
      isTyping: true
    });
  });

  socket.on('typing-stop', (data) => {
    const { clubId, userId } = data;
    
    socket.to(`club-${clubId}`).emit('user-typing', {
      userId,
      isTyping: false
    });
  });

  // Handle online status
  socket.on('user-online', (userId) => {
    socket.broadcast.emit('user-status-change', {
      userId,
      status: 'online',
      timestamp: new Date().toISOString()
    });
  });

  // Handle offline status
  socket.on('user-offline', (userId) => {
    socket.broadcast.emit('user-status-change', {
      userId,
      status: 'offline',
      timestamp: new Date().toISOString()
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`🔌 Socket ${socket.id} disconnected`);
  });
};

module.exports = socketHandlers; 