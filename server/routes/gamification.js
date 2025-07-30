const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const router = express.Router();

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

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const { type = 'points', limit = 10 } = req.query;

    let sortField = 'achievements.points.total';
    if (type === 'books') sortField = 'analytics.totalBooksRead';
    if (type === 'pages') sortField = 'analytics.totalPagesRead';
    if (type === 'streak') sortField = 'achievements.streaks.longestReading';

    const users = await User.find({ isActive: true })
      .select('username firstName lastName avatar achievements analytics')
      .sort({ [sortField]: -1 })
      .limit(parseInt(limit));

    res.json({ leaderboard: users, type });

  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Server error while fetching leaderboard' });
  }
});

// Get challenges
router.get('/challenges', async (req, res) => {
  try {
    // Placeholder for challenges
    const challenges = [
      {
        id: '1',
        title: 'January Reading Challenge',
        description: 'Read 5 books this month',
        type: 'monthly',
        goal: 5,
        progress: 2,
        reward: {
          points: 500,
          badge: 'January Reader',
          badgeIcon: '📚'
        },
        endDate: '2024-01-31T23:59:59Z'
      },
      {
        id: '2',
        title: 'Genre Explorer',
        description: 'Read books from 3 different genres',
        type: 'achievement',
        goal: 3,
        progress: 1,
        reward: {
          points: 300,
          badge: 'Genre Explorer',
          badgeIcon: '🗺️'
        },
        endDate: null
      }
    ];

    res.json({ challenges });

  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).json({ error: 'Server error while fetching challenges' });
  }
});

// Join challenge
router.post('/challenges/:challengeId/join', async (req, res) => {
  try {
    const { challengeId } = req.params;
    const userId = req.user.userId;

    // Placeholder for joining challenge
    res.json({ 
      message: 'Successfully joined challenge',
      challengeId,
      userId
    });

  } catch (error) {
    console.error('Error joining challenge:', error);
    res.status(500).json({ error: 'Server error while joining challenge' });
  }
});

// Update challenge progress
router.post('/challenges/:challengeId/progress', [
  body('progress').isInt({ min: 0 }).withMessage('Progress must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { challengeId } = req.params;
    const { progress } = req.body;
    const userId = req.user.userId;

    // Placeholder for updating challenge progress
    res.json({ 
      message: 'Challenge progress updated',
      challengeId,
      progress,
      userId
    });

  } catch (error) {
    console.error('Error updating challenge progress:', error);
    res.status(500).json({ error: 'Server error while updating challenge progress' });
  }
});

// Get user stats
router.get('/stats', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const stats = {
      totalPoints: user.achievements.points.total,
      readingPoints: user.achievements.points.reading,
      socialPoints: user.achievements.points.social,
      challengePoints: user.achievements.points.challenges,
      level: user.calculateLevel(),
      badges: user.achievements.badges.length,
      currentStreak: user.achievements.streaks.reading,
      longestStreak: user.achievements.streaks.longestReading,
      booksRead: user.analytics.totalBooksRead,
      pagesRead: user.analytics.totalPagesRead,
      averageRating: user.analytics.averageRating
    };

    res.json({ stats });

  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Server error while fetching user stats' });
  }
});

// Get available badges
router.get('/badges', async (req, res) => {
  try {
    // Placeholder for available badges
    const badges = [
      {
        id: 'first-book',
        name: 'First Book',
        description: 'Complete your first book',
        icon: '📚',
        points: 100,
        isEarned: true
      },
      {
        id: 'page-turner',
        name: 'Page Turner',
        description: 'Read 1000 pages',
        icon: '📖',
        points: 200,
        isEarned: false
      },
      {
        id: 'streak-master',
        name: 'Streak Master',
        description: 'Maintain a 7-day reading streak',
        icon: '🔥',
        points: 300,
        isEarned: false
      },
      {
        id: 'genre-explorer',
        name: 'Genre Explorer',
        description: 'Read books from 5 different genres',
        icon: '🗺️',
        points: 400,
        isEarned: false
      }
    ];

    res.json({ badges });

  } catch (error) {
    console.error('Error fetching badges:', error);
    res.status(500).json({ error: 'Server error while fetching badges' });
  }
});

// Redeem points
router.post('/redeem-points', [
  body('amount').isInt({ min: 100 }).withMessage('Minimum redemption is 100 points'),
  body('reward').notEmpty().withMessage('Reward type is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, reward } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.achievements.points.total < amount) {
      return res.status(400).json({ error: 'Insufficient points' });
    }

    // Deduct points
    user.achievements.points.total -= amount;

    await user.save();

    res.json({ 
      message: 'Points redeemed successfully',
      redeemedAmount: amount,
      reward,
      remainingPoints: user.achievements.points.total
    });

  } catch (error) {
    console.error('Error redeeming points:', error);
    res.status(500).json({ error: 'Server error while redeeming points' });
  }
});

// Get reading streaks
router.get('/streaks', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const streaks = {
      current: user.achievements.streaks.reading,
      longest: user.achievements.streaks.longestReading,
      lastReadingDate: user.achievements.streaks.lastReadingDate
    };

    res.json({ streaks });

  } catch (error) {
    console.error('Error fetching streaks:', error);
    res.status(500).json({ error: 'Server error while fetching streaks' });
  }
});

module.exports = router; 