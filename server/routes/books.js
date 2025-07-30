const express = require('express');
const Book = require('../models/Book');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all books with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      genre,
      search,
      sortBy = 'title',
      sortOrder = 'asc',
      minPrice,
      maxPrice,
      format
    } = req.query;

    // Build filter object
    const filter = { status: 'Published' };

    if (genre) {
      filter.genres = { $in: [genre] };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    if (minPrice || maxPrice) {
      filter['format.physical.price'] = {};
      if (minPrice) filter['format.physical.price'].$gte = parseFloat(minPrice);
      if (maxPrice) filter['format.physical.price'].$lte = parseFloat(maxPrice);
    }

    if (format) {
      filter[`format.${format}.available`] = true;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const books = await Book.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('author', 'name');

    // Get total count for pagination
    const total = await Book.countDocuments(filter);

    res.json({
      books,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalBooks: total,
        hasNext: skip + books.length < total,
        hasPrev: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Server error while fetching books' });
  }
});

// Get featured books
router.get('/featured', async (req, res) => {
  try {
    const books = await Book.find({ 
      isFeatured: true, 
      status: 'Published' 
    })
    .limit(8)
    .populate('author', 'name');

    res.json({ books });

  } catch (error) {
    console.error('Error fetching featured books:', error);
    res.status(500).json({ error: 'Server error while fetching featured books' });
  }
});

// Get bestsellers
router.get('/bestsellers', async (req, res) => {
  try {
    const books = await Book.find({ 
      isBestseller: true, 
      status: 'Published' 
    })
    .sort({ 'community.averageRating': -1 })
    .limit(10)
    .populate('author', 'name');

    res.json({ books });

  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    res.status(500).json({ error: 'Server error while fetching bestsellers' });
  }
});

// Get new releases
router.get('/new-releases', async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const books = await Book.find({
      isNewRelease: true,
      status: 'Published',
      createdAt: { $gte: thirtyDaysAgo }
    })
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('author', 'name');

    res.json({ books });

  } catch (error) {
    console.error('Error fetching new releases:', error);
    res.status(500).json({ error: 'Server error while fetching new releases' });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('author', 'name bio avatar socialLinks')
      .populate('readingGroups', 'name description');

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Get similar books
    const similarBooks = await Book.find({
      _id: { $ne: book._id },
      genres: { $in: book.genres },
      status: 'Published'
    })
    .limit(5)
    .populate('author', 'name');

    res.json({ 
      book,
      similarBooks
    });

  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Server error while fetching book' });
  }
});

// Search books
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const books = await Book.find({
      $text: { $search: query },
      status: 'Published'
    })
    .sort({ score: { $meta: 'textScore' } })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('author', 'name');

    const total = await Book.countDocuments({
      $text: { $search: query },
      status: 'Published'
    });

    res.json({
      books,
      query,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalBooks: total
      }
    });

  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ error: 'Server error while searching books' });
  }
});

// Get books by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const { genre } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const books = await Book.find({
      genres: genre,
      status: 'Published'
    })
    .sort({ 'community.averageRating': -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('author', 'name');

    const total = await Book.countDocuments({
      genres: genre,
      status: 'Published'
    });

    res.json({
      books,
      genre,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalBooks: total
      }
    });

  } catch (error) {
    console.error('Error fetching books by genre:', error);
    res.status(500).json({ error: 'Server error while fetching books by genre' });
  }
});

// Get books by author
router.get('/author/:authorId', async (req, res) => {
  try {
    const { authorId } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const books = await Book.find({
      'author._id': authorId,
      status: 'Published'
    })
    .sort({ publicationDate: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('author', 'name');

    const total = await Book.countDocuments({
      'author._id': authorId,
      status: 'Published'
    });

    res.json({
      books,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalBooks: total
      }
    });

  } catch (error) {
    console.error('Error fetching books by author:', error);
    res.status(500).json({ error: 'Server error while fetching books by author' });
  }
});

// Rate a book
router.post('/:id/rate', [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, review } = req.body;
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Update book rating
    const newTotalRatings = book.community.totalRatings + 1;
    const newAverageRating = (
      (book.community.averageRating * book.community.totalRatings + rating) / newTotalRatings
    );

    book.community.totalRatings = newTotalRatings;
    book.community.averageRating = newAverageRating;

    if (review) {
      book.community.totalReviews += 1;
    }

    await book.save();

    res.json({
      message: 'Rating submitted successfully',
      newAverageRating,
      totalRatings: newTotalRatings
    });

  } catch (error) {
    console.error('Error rating book:', error);
    res.status(500).json({ error: 'Server error while rating book' });
  }
});

// Get book statistics
router.get('/:id/stats', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const stats = {
      totalRatings: book.community.totalRatings,
      averageRating: book.community.averageRating,
      totalReviews: book.community.totalReviews,
      readingGroups: book.community.readingGroups.length,
      userShelves: book.community.userShelves.length,
      formats: {
        physical: book.format.physical.available,
        ebook: book.format.ebook.available,
        audiobook: book.format.audiobook.available
      },
      readingTime: book.description.aiGenerated?.estimatedReadingTime,
      complexity: book.stats.complexity,
      readingLevel: book.stats.readingLevel
    };

    res.json({ stats });

  } catch (error) {
    console.error('Error fetching book stats:', error);
    res.status(500).json({ error: 'Server error while fetching book stats' });
  }
});

module.exports = router; 