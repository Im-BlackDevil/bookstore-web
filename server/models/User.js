const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Info
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  
  // Reading Profile
  readingPreferences: {
    favoriteGenres: [{
      type: String,
      enum: ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History', 'Self-Help', 'Poetry', 'Children', 'Young Adult', 'Thriller', 'Horror', 'Comedy', 'Drama', 'Adventure', 'Philosophy', 'Science', 'Technology']
    }],
    readingSpeed: {
      type: Number,
      default: 200 // words per minute
    },
    preferredFormat: {
      type: String,
      enum: ['Physical', 'E-Book', 'Audiobook', 'Mixed'],
      default: 'Mixed'
    },
    readingGoals: {
      booksPerYear: { type: Number, default: 12 },
      pagesPerDay: { type: Number, default: 30 },
      currentStreak: { type: Number, default: 0 }
    }
  },

  // AI & Personalization
  aiProfile: {
    moodHistory: [{
      mood: String,
      timestamp: Date,
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
    }],
    readingJourney: {
      currentPath: String,
      completedPaths: [String],
      nextRecommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
    },
    personalCritic: {
      preferences: [String],
      dislikedGenres: [String],
      favoriteAuthors: [String]
    }
  },

  // Gamification
  achievements: {
    badges: [{
      name: String,
      description: String,
      earnedAt: Date,
      icon: String
    }],
    points: {
      total: { type: Number, default: 0 },
      reading: { type: Number, default: 0 },
      social: { type: Number, default: 0 },
      challenges: { type: Number, default: 0 }
    },
    level: {
      current: { type: Number, default: 1 },
      experience: { type: Number, default: 0 },
      title: { type: String, default: 'Novice Reader' }
    },
    streaks: {
      reading: { type: Number, default: 0 },
      longestReading: { type: Number, default: 0 },
      lastReadingDate: Date
    }
  },

  // Social Features
  social: {
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    bookClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookClub' }],
    anonymousPartners: [{
      partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      startDate: Date,
      endDate: Date
    }],
    privacy: {
      profileVisibility: { type: String, enum: ['Public', 'Friends', 'Private'], default: 'Public' },
      readingHistory: { type: String, enum: ['Public', 'Friends', 'Private'], default: 'Friends' }
    }
  },

  // Reading Analytics
  analytics: {
    totalBooksRead: { type: Number, default: 0 },
    totalPagesRead: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    readingTime: {
      total: { type: Number, default: 0 }, // in minutes
      averagePerSession: { type: Number, default: 0 },
      longestSession: { type: Number, default: 0 }
    },
    genreStats: [{
      genre: String,
      booksRead: Number,
      averageRating: Number
    }],
    monthlyStats: [{
      month: String,
      booksRead: Number,
      pagesRead: Number,
      timeSpent: Number
    }]
  },

  // Library & Collections
  library: {
    owned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    reading: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    completed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    customShelves: [{
      name: String,
      description: String,
      books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
      isPublic: { type: Boolean, default: false }
    }]
  },

  // Sustainability
  sustainability: {
    carbonFootprint: { type: Number, default: 0 },
    ecoFriendlyChoices: { type: Number, default: 0 },
    literacyDonations: { type: Number, default: 0 }
  },

  // Account Status
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin', 'author'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ 'achievements.points.total': -1 });
userSchema.index({ 'analytics.totalBooksRead': -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to calculate reading level
userSchema.methods.calculateLevel = function() {
  const totalPoints = this.achievements.points.total;
  const level = Math.floor(totalPoints / 1000) + 1;
  const titles = [
    'Novice Reader', 'Book Explorer', 'Page Turner', 'Story Seeker',
    'Literary Adventurer', 'Word Wanderer', 'Tale Traveler', 'Narrative Navigator',
    'Epic Reader', 'Legendary Bibliophile'
  ];
  
  return {
    level: Math.min(level, 10),
    title: titles[Math.min(level - 1, titles.length - 1)]
  };
};

// Method to add achievement
userSchema.methods.addAchievement = function(badgeName, description, icon) {
  const achievement = {
    name: badgeName,
    description: description,
    earnedAt: new Date(),
    icon: icon
  };
  
  this.achievements.badges.push(achievement);
  this.achievements.points.total += 100;
  
  return this.save();
};

// Method to update reading streak
userSchema.methods.updateReadingStreak = function() {
  const today = new Date();
  const lastReading = this.achievements.streaks.lastReadingDate;
  
  if (!lastReading) {
    this.achievements.streaks.reading = 1;
  } else {
    const daysDiff = Math.floor((today - lastReading) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      this.achievements.streaks.reading += 1;
    } else if (daysDiff > 1) {
      this.achievements.streaks.reading = 1;
    }
  }
  
  this.achievements.streaks.lastReadingDate = today;
  
  if (this.achievements.streaks.reading > this.achievements.streaks.longestReading) {
    this.achievements.streaks.longestReading = this.achievements.streaks.reading;
  }
  
  return this.save();
};

module.exports = mongoose.model('User', userSchema); 