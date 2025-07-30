const express = require('express');
const aiService = require('../services/aiService');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get AI recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const { mood, context } = req.query;
    const userId = req.user.userId;

    const recommendations = await aiService.generateRecommendations(userId, mood, context);

    res.json({ recommendations });

  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Server error while generating recommendations' });
  }
});

// Get mood-based recommendations
router.get('/mood-recommendations', async (req, res) => {
  try {
    const { mood, limit = 5 } = req.query;

    if (!mood) {
      return res.status(400).json({ error: 'Mood parameter is required' });
    }

    const recommendations = await aiService.getMoodBasedRecommendations(mood, parseInt(limit));

    res.json({ recommendations });

  } catch (error) {
    console.error('Error getting mood-based recommendations:', error);
    res.status(500).json({ error: 'Server error while getting mood-based recommendations' });
  }
});

// Analyze book content
router.post('/analyze-book/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;

    const analysis = await aiService.analyzeBookContent(bookId);

    res.json({ analysis });

  } catch (error) {
    console.error('Error analyzing book content:', error);
    res.status(500).json({ error: 'Server error while analyzing book content' });
  }
});

// Generate reading journey
router.post('/reading-journey', [
  body('goal').notEmpty().withMessage('Reading goal is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { goal } = req.body;
    const userId = req.user.userId;

    const journey = await aiService.generateReadingJourney(userId, goal);

    res.json({ journey });

  } catch (error) {
    console.error('Error generating reading journey:', error);
    res.status(500).json({ error: 'Server error while generating reading journey' });
  }
});

// Generate companion content
router.post('/companion-content/:bookId', [
  body('contentType').isIn(['discussion', 'activities', 'soundtrack', 'recipes']).withMessage('Invalid content type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bookId } = req.params;
    const { contentType } = req.body;

    const content = await aiService.generateCompanionContent(bookId, contentType);

    res.json({ content });

  } catch (error) {
    console.error('Error generating companion content:', error);
    res.status(500).json({ error: 'Server error while generating companion content' });
  }
});

// Predict movie potential
router.get('/movie-potential/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;

    const prediction = await aiService.predictMoviePotential(bookId);

    res.json({ prediction });

  } catch (error) {
    console.error('Error predicting movie potential:', error);
    res.status(500).json({ error: 'Server error while predicting movie potential' });
  }
});

// Generate reading insights
router.get('/reading-insights', async (req, res) => {
  try {
    const userId = req.user.userId;

    const insights = await aiService.generateReadingInsights(userId);

    res.json({ insights });

  } catch (error) {
    console.error('Error generating reading insights:', error);
    res.status(500).json({ error: 'Server error while generating reading insights' });
  }
});

// Update user mood
router.post('/update-mood', [
  body('mood').notEmpty().withMessage('Mood is required'),
  body('bookId').optional().isMongoId().withMessage('Invalid book ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mood, bookId } = req.body;
    const userId = req.user.userId;

    // This would typically update the user's mood history
    // For now, we'll just return a success response
    res.json({ 
      message: 'Mood updated successfully',
      mood,
      bookId
    });

  } catch (error) {
    console.error('Error updating mood:', error);
    res.status(500).json({ error: 'Server error while updating mood' });
  }
});

// Get personalized book critic insights
router.get('/book-critic/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.userId;

    // This would use the user's personal critic AI to analyze the book
    // For now, we'll return a placeholder response
    res.json({
      personalRating: 4.2,
      reasons: [
        'Matches your preference for character-driven stories',
        'Similar to books you rated highly in the past',
        'Fits your current reading mood'
      ],
      warnings: [
        'Contains themes you typically avoid',
        'Pacing might be slower than your usual preference'
      ],
      recommendation: 'Highly recommended based on your reading history'
    });

  } catch (error) {
    console.error('Error getting book critic insights:', error);
    res.status(500).json({ error: 'Server error while getting book critic insights' });
  }
});

// Generate reading environment suggestions
router.post('/reading-environment', [
  body('bookId').notEmpty().withMessage('Book ID is required'),
  body('currentEnvironment').notEmpty().withMessage('Current environment is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bookId, currentEnvironment } = req.body;

    // This would analyze the book and suggest optimal reading conditions
    res.json({
      suggestions: {
        lighting: 'Warm, dim lighting for this atmospheric book',
        sound: 'Soft instrumental music or complete silence',
        temperature: 'Comfortable room temperature (20-22°C)',
        seating: 'Cozy chair with good back support',
        duration: 'Plan for 45-60 minute reading sessions'
      },
      bookMood: 'Contemplative and immersive',
      optimalTime: 'Evening or early morning'
    });

  } catch (error) {
    console.error('Error generating reading environment suggestions:', error);
    res.status(500).json({ error: 'Server error while generating reading environment suggestions' });
  }
});

module.exports = router; 