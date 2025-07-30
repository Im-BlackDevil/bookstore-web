const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  // Basic Book Information
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    name: { type: String, required: true },
    bio: String,
    avatar: String,
    socialLinks: {
      website: String,
      twitter: String,
      instagram: String
    }
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true
  },
  publisher: String,
  publicationDate: Date,
  edition: String,
  
  // Content Details
  description: {
    short: { type: String, required: true },
    long: String,
    aiGenerated: {
      summary: String,
      keyThemes: [String],
      readingLevel: String,
      estimatedReadingTime: Number // in minutes
    }
  },
  
  // Categories & Classification
  genres: [{
    type: String,
    enum: ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History', 'Self-Help', 'Poetry', 'Children', 'Young Adult', 'Thriller', 'Horror', 'Comedy', 'Drama', 'Adventure', 'Philosophy', 'Science', 'Technology']
  }],
  tags: [String],
  ageGroup: {
    type: String,
    enum: ['Children', 'Young Adult', 'Adult', 'All Ages'],
    default: 'Adult'
  },
  
  // Physical & Digital Properties
  format: {
    physical: {
      available: { type: Boolean, default: true },
      price: { type: Number, default: 0 },
      stock: { type: Number, default: 0 },
      weight: Number, // in grams
      dimensions: {
        length: Number,
        width: Number,
        height: Number
      }
    },
    ebook: {
      available: { type: Boolean, default: false },
      price: { type: Number, default: 0 },
      fileSize: Number, // in MB
      format: { type: String, enum: ['PDF', 'EPUB', 'MOBI'] }
    },
    audiobook: {
      available: { type: Boolean, default: false },
      price: { type: Number, default: 0 },
      duration: Number, // in minutes
      narrator: String
    }
  },
  
  // Content Statistics
  stats: {
    pages: Number,
    wordCount: Number,
    chapters: Number,
    readingLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    },
    complexity: {
      type: Number,
      min: 1,
      max: 10
    }
  },
  
  // AI & Analysis Features
  aiAnalysis: {
    sentiment: {
      overall: { type: String, enum: ['Positive', 'Neutral', 'Negative', 'Mixed'] },
      byChapter: [{
        chapter: Number,
        sentiment: String,
        keyEmotions: [String]
      }]
    },
    themes: [{
      name: String,
      description: String,
      frequency: Number
    }],
    characters: [{
      name: String,
      description: String,
      role: { type: String, enum: ['Protagonist', 'Antagonist', 'Supporting', 'Minor'] },
      relationships: [{
        character: String,
        relationship: String
      }]
    }],
    locations: [{
      name: String,
      description: String,
      significance: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    }],
    quotes: [{
      text: String,
      character: String,
      chapter: Number,
      significance: String
    }]
  },
  
  // Immersive Content
  immersive: {
    soundtrack: {
      playlist: String, // Spotify playlist URL
      mood: String,
      description: String
    },
    arContent: {
      available: { type: Boolean, default: false },
      coverPreview: String,
      characterModels: [String],
      locationTours: [String]
    },
    interactiveMap: {
      available: { type: Boolean, default: false },
      mapData: Object,
      locations: [{
        name: String,
        description: String,
        coordinates: {
          lat: Number,
          lng: Number
        }
      }]
    },
    companionContent: {
      studyGuide: String,
      discussionQuestions: [String],
      activities: [String],
      recipes: [String], // for books with food themes
      playlists: [String]
    }
  },
  
  // Community & Social Features
  community: {
    totalRatings: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    readingGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookClub' }],
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
    userShelves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  
  // Awards & Recognition
  awards: [{
    name: String,
    year: Number,
    category: String,
    description: String
  }],
  
  // Environmental Impact
  sustainability: {
    carbonFootprint: Number, // CO2 equivalent
    ecoFriendly: { type: Boolean, default: false },
    recycledMaterials: { type: Boolean, default: false },
    localPrinting: { type: Boolean, default: false }
  },
  
  // Media & Assets
  media: {
    coverImage: {
      original: String,
      thumbnail: String,
      large: String
    },
    samplePages: [String],
    bookTrailer: String,
    authorInterview: String,
    readingSample: String
  },
  
  // SEO & Discovery
  seo: {
    keywords: [String],
    metaDescription: String,
    searchTags: [String]
  },
  
  // Status & Moderation
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Archived', 'Under Review'],
    default: 'Published'
  },
  isFeatured: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  isNewRelease: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Indexes for better performance
bookSchema.index({ title: 'text', 'author.name': 'text', description: 'text' });
bookSchema.index({ genres: 1 });
bookSchema.index({ 'community.averageRating': -1 });
bookSchema.index({ 'community.totalRatings': -1 });
bookSchema.index({ createdAt: -1 });
bookSchema.index({ isFeatured: 1 });
bookSchema.index({ isBestseller: 1 });

// Virtual for full author name
bookSchema.virtual('author.fullName').get(function() {
  return this.author.name;
});

// Method to calculate reading time
bookSchema.methods.calculateReadingTime = function(readingSpeed = 200) {
  if (this.stats.wordCount) {
    return Math.ceil(this.stats.wordCount / readingSpeed);
  }
  return null;
};

// Method to get available formats
bookSchema.methods.getAvailableFormats = function() {
  const formats = [];
  if (this.format.physical.available) formats.push('Physical');
  if (this.format.ebook.available) formats.push('E-Book');
  if (this.format.audiobook.available) formats.push('Audiobook');
  return formats;
};

// Method to get lowest price
bookSchema.methods.getLowestPrice = function() {
  const prices = [
    this.format.physical.price,
    this.format.ebook.price,
    this.format.audiobook.price
  ].filter(price => price > 0);
  
  return prices.length > 0 ? Math.min(...prices) : 0;
};

// Static method to find books by mood
bookSchema.statics.findByMood = function(mood) {
  return this.find({
    'aiAnalysis.sentiment.overall': mood,
    status: 'Published'
  }).limit(10);
};

// Static method to find similar books
bookSchema.statics.findSimilar = function(bookId, limit = 5) {
  return this.findById(bookId).then(book => {
    if (!book) return [];
    
    return this.find({
      _id: { $ne: bookId },
      genres: { $in: book.genres },
      status: 'Published'
    })
    .sort({ 'community.averageRating': -1 })
    .limit(limit);
  });
};

module.exports = mongoose.model('Book', bookSchema); 