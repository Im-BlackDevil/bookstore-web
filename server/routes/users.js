const express = require('express');
const User = require('../models/User');
const Book = require('../models/Book');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('library.owned', 'title author coverImage')
      .populate('library.wishlist', 'title author coverImage')
      .populate('library.reading', 'title author coverImage')
      .populate('library.completed', 'title author coverImage');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error while fetching profile' });
  }
});

// Update user profile
router.put('/profile', [
  body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
  body('readingPreferences.favoriteGenres').optional().isArray(),
  body('readingPreferences.readingSpeed').optional().isInt({ min: 50, max: 500 }),
  body('readingPreferences.preferredFormat').optional().isIn(['Physical', 'E-Book', 'Audiobook', 'Mixed'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update allowed fields
    const allowedFields = [
      'firstName', 'lastName', 'avatar',
      'readingPreferences', 'social.privacy'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          user[parent][child] = req.body[field];
        } else {
          user[field] = req.body[field];
        }
      }
    });

    await user.save();

    res.json({ 
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        readingPreferences: user.readingPreferences,
        achievements: user.achievements,
        analytics: user.analytics
      }
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error while updating profile' });
  }
});

// Get user library
router.get('/library', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('library.owned', 'title author coverImage genres rating')
      .populate('library.wishlist', 'title author coverImage genres rating')
      .populate('library.reading', 'title author coverImage genres rating')
      .populate('library.completed', 'title author coverImage genres rating');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ library: user.library });

  } catch (error) {
    console.error('Error fetching library:', error);
    res.status(500).json({ error: 'Server error while fetching library' });
  }
});

// Add book to library
router.post('/library/:action', async (req, res) => {
  try {
    const { action } = req.params;
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ error: 'Book ID is required' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const validActions = ['owned', 'wishlist', 'reading', 'completed'];
    if (!validActions.includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    // Remove from other collections first
    validActions.forEach(collection => {
      user.library[collection] = user.library[collection].filter(
        id => id.toString() !== bookId
      );
    });

    // Add to specified collection
    user.library[action].push(bookId);

    // Update analytics if adding to completed
    if (action === 'completed') {
      user.analytics.totalBooksRead += 1;
      user.analytics.totalPagesRead += book.stats.pages || 0;
      
      // Update reading streak
      await user.updateReadingStreak();
      
      // Add achievement for completing a book
      if (user.analytics.totalBooksRead === 1) {
        await user.addAchievement('First Book', 'Completed your first book!', '📚');
      }
    }

    await user.save();

    res.json({ 
      message: `Book added to ${action} successfully`,
      library: user.library
    });

  } catch (error) {
    console.error('Error updating library:', error);
    res.status(500).json({ error: 'Server error while updating library' });
  }
});

// Remove book from library
router.delete('/library/:action/:bookId', async (req, res) => {
  try {
    const { action, bookId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validActions = ['owned', 'wishlist', 'reading', 'completed'];
    if (!validActions.includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    user.library[action] = user.library[action].filter(
      id => id.toString() !== bookId
    );

    await user.save();

    res.json({ 
      message: `Book removed from ${action} successfully`,
      library: user.library
    });

  } catch (error) {
    console.error('Error removing book from library:', error);
    res.status(500).json({ error: 'Server error while removing book' });
  }
});

// Get user achievements
router.get('/achievements', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const levelInfo = user.calculateLevel();

    res.json({
      achievements: user.achievements,
      level: levelInfo,
      analytics: user.analytics
    });

  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Server error while fetching achievements' });
  }
});

// Get user reading analytics
router.get('/analytics', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      analytics: user.analytics,
      readingPreferences: user.readingPreferences,
      achievements: user.achievements
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Server error while fetching analytics' });
  }
});

// Update reading progress
router.post('/reading-progress', [
  body('bookId').notEmpty().withMessage('Book ID is required'),
  body('pagesRead').isInt({ min: 0 }).withMessage('Pages read must be a positive number'),
  body('timeSpent').isInt({ min: 0 }).withMessage('Time spent must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bookId, pagesRead, timeSpent } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update analytics
    user.analytics.totalPagesRead += pagesRead;
    user.analytics.readingTime.total += timeSpent;

    // Update reading streak
    await user.updateReadingStreak();

    // Add points for reading
    user.achievements.points.reading += Math.floor(pagesRead / 10);
    user.achievements.points.total += Math.floor(pagesRead / 10);

    // Check for achievements
    if (user.analytics.totalPagesRead >= 1000 && !user.achievements.badges.find(b => b.name === 'Page Turner')) {
      await user.addAchievement('Page Turner', 'Read 1000 pages!', '📖');
    }

    await user.save();

    res.json({ 
      message: 'Reading progress updated successfully',
      analytics: user.analytics,
      achievements: user.achievements
    });

  } catch (error) {
    console.error('Error updating reading progress:', error);
    res.status(500).json({ error: 'Server error while updating reading progress' });
  }
});

// Get user social connections
router.get('/social', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('social.followers', 'username firstName lastName avatar')
      .populate('social.following', 'username firstName lastName avatar');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      followers: user.social.followers,
      following: user.social.following,
      privacy: user.social.privacy
    });

  } catch (error) {
    console.error('Error fetching social connections:', error);
    res.status(500).json({ error: 'Server error while fetching social connections' });
  }
});

// Follow/unfollow user
router.post('/social/follow/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.userId;

    if (userId === currentUserId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(userId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isFollowing = currentUser.social.following.includes(userId);

    if (isFollowing) {
      // Unfollow
      currentUser.social.following = currentUser.social.following.filter(
        id => id.toString() !== userId
      );
      targetUser.social.followers = targetUser.social.followers.filter(
        id => id.toString() !== currentUserId
      );
    } else {
      // Follow
      currentUser.social.following.push(userId);
      targetUser.social.followers.push(currentUserId);
    }

    await Promise.all([currentUser.save(), targetUser.save()]);

    res.json({ 
      message: isFollowing ? 'Unfollowed successfully' : 'Followed successfully',
      isFollowing: !isFollowing
    });

  } catch (error) {
    console.error('Error following/unfollowing user:', error);
    res.status(500).json({ error: 'Server error while following/unfollowing user' });
  }
});

module.exports = router; 