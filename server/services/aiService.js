const OpenAI = require('openai');
const User = require('../models/User');
const Book = require('../models/Book');

// Initialize OpenAI only if API key is available
let openai = null;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here') {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

class AIService {
  constructor() {
    this.openai = openai;
  }

  // Check if AI service is available
  isAIAvailable() {
    return this.openai !== null;
  }

  // Generate personalized book recommendations
  async generateRecommendations(userId, mood = null, context = '') {
    try {
      // Check if AI is available
      if (!this.isAIAvailable()) {
        // Return placeholder recommendations
        return [
          {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            reason: "Classic literature that matches your reading preferences",
            readingTime: "4-5 hours",
            moodMatch: "Thoughtful and reflective",
            bookId: "placeholder_1",
            coverImage: "https://via.placeholder.com/150x200",
            price: 12.99
          },
          {
            title: "1984",
            author: "George Orwell",
            reason: "Dystopian fiction that challenges your thinking",
            readingTime: "5-6 hours",
            moodMatch: "Intense and thought-provoking",
            bookId: "placeholder_2",
            coverImage: "https://via.placeholder.com/150x200",
            price: 9.99
          }
        ];
      }

      const user = await User.findById(userId).populate('library.completed');
      
      if (!user) {
        throw new Error('User not found');
      }

      // Build user profile for AI
      const userProfile = {
        favoriteGenres: user.readingPreferences.favoriteGenres,
        completedBooks: user.library.completed.map(book => ({
          title: book.title,
          author: book.author.name,
          genres: book.genres,
          rating: book.community.averageRating
        })),
        readingSpeed: user.readingPreferences.readingSpeed,
        mood: mood,
        context: context
      };

      const prompt = `
        As a literary expert, recommend 5 books for a reader with the following profile:
        
        Favorite Genres: ${userProfile.favoriteGenres.join(', ')}
        Reading Speed: ${userProfile.readingSpeed} words per minute
        Current Mood: ${mood || 'Not specified'}
        Context: ${context || 'General reading'}
        
        Recently Read Books:
        ${userProfile.completedBooks.slice(-5).map(book => 
          `- "${book.title}" by ${book.author} (${book.genres.join(', ')})`
        ).join('\n')}
        
        Please recommend 5 diverse books that would appeal to this reader. For each book, provide:
        1. Title and Author
        2. Brief reason for recommendation
        3. Expected reading time
        4. Mood match (if mood was specified)
        
        Format as JSON array with objects containing: title, author, reason, readingTime, moodMatch
      `;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      });

      const recommendations = JSON.parse(completion.choices[0].message.content);
      
      // Find actual books in database
      const bookPromises = recommendations.map(async (rec) => {
        const book = await Book.findOne({
          title: { $regex: new RegExp(rec.title, 'i') },
          'author.name': { $regex: new RegExp(rec.author, 'i') },
          status: 'Published'
        });
        
        return book ? {
          ...rec,
          bookId: book._id,
          coverImage: book.media.coverImage.thumbnail,
          price: book.getLowestPrice()
        } : null;
      });

      const books = (await Promise.all(bookPromises)).filter(book => book !== null);
      
      return books;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw error;
    }
  }

  // Analyze book content and generate insights
  async analyzeBookContent(bookId) {
    try {
      // Check if AI is available
      if (!this.isAIAvailable()) {
        // Return placeholder analysis
        return {
          sentiment: "positive",
          themes: ["love", "loss", "redemption"],
          characters: ["Main character", "Supporting character"],
          locations: ["New York", "Long Island"],
          quotes: ["So we beat on, boats against the current..."],
          complexity: "medium",
          readingLevel: "high school to college"
        };
      }

      const book = await Book.findById(bookId);
      
      if (!book) {
        throw new Error('Book not found');
      }

      const prompt = `
        Analyze this book and provide detailed insights:
        
        Title: ${book.title}
        Author: ${book.author.name}
        Description: ${book.description.short}
        Genres: ${book.genres.join(', ')}
        
        Please provide:
        1. Overall sentiment analysis (Positive/Negative/Neutral/Mixed)
        2. Key themes (3-5 themes with descriptions)
        3. Character analysis (main characters with roles and relationships)
        4. Reading level assessment
        5. Estimated reading time for average reader
        6. Key quotes (3-5 memorable quotes)
        7. Discussion questions (5-7 questions for book clubs)
        
        Format as JSON with: sentiment, themes, characters, readingLevel, readingTime, quotes, discussionQuestions
      `;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 1500
      });

      const analysis = JSON.parse(completion.choices[0].message.content);
      
      // Update book with AI analysis
      book.aiAnalysis = {
        sentiment: { overall: analysis.sentiment },
        themes: analysis.themes.map(theme => ({
          name: theme.name,
          description: theme.description,
          frequency: 1
        })),
        characters: analysis.characters,
        quotes: analysis.quotes.map(quote => ({
          text: quote.text,
          character: quote.character || 'Narrator',
          chapter: 1,
          significance: quote.significance || 'Memorable quote'
        }))
      };

      book.description.aiGenerated = {
        summary: analysis.summary || book.description.short,
        keyThemes: analysis.themes.map(t => t.name),
        readingLevel: analysis.readingLevel,
        estimatedReadingTime: analysis.readingTime
      };

      await book.save();
      
      return analysis;
    } catch (error) {
      console.error('Error analyzing book content:', error);
      throw error;
    }
  }

  // Generate reading journey path
  async generateReadingJourney(userId, goal = 'explore') {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      const prompt = `
        Create a personalized reading journey for a reader who wants to ${goal}.
        
        Current preferences:
        - Favorite genres: ${user.readingPreferences.favoriteGenres.join(', ')}
        - Reading speed: ${user.readingPreferences.readingSpeed} words per minute
        - Completed books: ${user.library.completed.length}
        
        Create a 5-book journey that:
        1. Starts with something familiar but introduces new elements
        2. Gradually expands horizons
        3. Builds complexity and depth
        4. Connects themes across books
        5. Ends with a satisfying culmination
        
        For each book, provide:
        - Title and author
        - Why it fits in this journey
        - What the reader will gain
        - Estimated reading time
        
        Format as JSON array with: title, author, reason, benefits, readingTime, order
      `;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1200
      });

      const journey = JSON.parse(completion.choices[0].message.content);
      
      // Update user's reading journey
      user.aiProfile.readingJourney.currentPath = goal;
      user.aiProfile.readingJourney.nextRecommendations = [];
      
      // Find actual books for the journey
      for (const bookRec of journey) {
        const book = await Book.findOne({
          title: { $regex: new RegExp(bookRec.title, 'i') },
          status: 'Published'
        });
        
        if (book) {
          user.aiProfile.readingJourney.nextRecommendations.push(book._id);
        }
      }
      
      await user.save();
      
      return journey;
    } catch (error) {
      console.error('Error generating reading journey:', error);
      throw error;
    }
  }

  // Generate mood-based recommendations
  async getMoodBasedRecommendations(mood, limit = 5) {
    try {
      const prompt = `
        Recommend ${limit} books that match the mood: "${mood}"
        
        Consider:
        - Books that evoke or complement this mood
        - Different genres that can express this mood
        - Both uplifting and contemplative options
        
        For each book, provide:
        - Title and author
        - How it relates to the mood
        - Genre
        - Brief description
        
        Format as JSON array with: title, author, moodConnection, genre, description
      `;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 1000
      });

      const recommendations = JSON.parse(completion.choices[0].message.content);
      
      // Find books in database
      const books = [];
      for (const rec of recommendations) {
        const book = await Book.findOne({
          title: { $regex: new RegExp(rec.title, 'i') },
          status: 'Published'
        });
        
        if (book) {
          books.push({
            ...rec,
            bookId: book._id,
            coverImage: book.media.coverImage.thumbnail,
            price: book.getLowestPrice()
          });
        }
      }
      
      return books.slice(0, limit);
    } catch (error) {
      console.error('Error getting mood-based recommendations:', error);
      throw error;
    }
  }

  // Generate book companion content
  async generateCompanionContent(bookId, contentType = 'discussion') {
    try {
      const book = await Book.findById(bookId);
      
      if (!book) {
        throw new Error('Book not found');
      }

      const prompts = {
        discussion: `Generate 10 thought-provoking discussion questions for "${book.title}" by ${book.author.name}. Include questions about themes, characters, plot, and personal connections.`,
        activities: `Create 5 engaging activities related to "${book.title}" by ${book.author.name}. These could be creative writing, art projects, research tasks, or experiential activities.`,
        soundtrack: `Suggest a playlist of 10 songs that would complement the mood and themes of "${book.title}" by ${book.author.name}. Include song titles and artists.`,
        recipes: `If "${book.title}" by ${book.author.name} mentions food or cooking, suggest 3 recipes inspired by the book. If not food-related, suggest 3 comfort food recipes that would pair well with reading this book.`
      };

      const prompt = prompts[contentType] || prompts.discussion;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 800
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating companion content:', error);
      throw error;
    }
  }

  // Predict book-to-movie potential
  async predictMoviePotential(bookId) {
    try {
      const book = await Book.findById(bookId);
      
      if (!book) {
        throw new Error('Book not found');
      }

      const prompt = `
        Analyze the movie adaptation potential of "${book.title}" by ${book.author.name}.
        
        Consider:
        - Visual storytelling elements
        - Character development
        - Plot structure
        - Market appeal
        - Technical feasibility
        
        Provide:
        1. Adaptation potential score (1-10)
        2. Recommended genre for film
        3. Key challenges
        4. Suggested director style
        5. Casting suggestions for main characters
        6. Estimated budget range
        
        Format as JSON with: score, genre, challenges, directorStyle, casting, budget
      `;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
        max_tokens: 1000
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error predicting movie potential:', error);
      throw error;
    }
  }

  // Generate personalized reading insights
  async generateReadingInsights(userId) {
    try {
      const user = await User.findById(userId).populate('library.completed');
      
      if (!user) {
        throw new Error('User not found');
      }

      const prompt = `
        Analyze this reader's profile and provide personalized insights:
        
        Reading Stats:
        - Total books read: ${user.analytics.totalBooksRead}
        - Total pages read: ${user.analytics.totalPagesRead}
        - Average rating: ${user.analytics.averageRating}
        - Reading speed: ${user.readingPreferences.readingSpeed} words per minute
        - Current streak: ${user.achievements.streaks.reading} days
        
        Favorite Genres: ${user.readingPreferences.favoriteGenres.join(', ')}
        
        Recent Books (last 5):
        ${user.library.completed.slice(-5).map(book => 
          `- "${book.title}" by ${book.author.name}`
        ).join('\n')}
        
        Provide:
        1. Reading personality type
        2. Strengths and areas for growth
        3. Genre exploration suggestions
        4. Reading habit recommendations
        5. Goal-setting advice
        
        Format as JSON with: personalityType, strengths, growthAreas, genreSuggestions, habitRecommendations, goalAdvice
      `;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1200
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error generating reading insights:', error);
      throw error;
    }
  }
}

module.exports = new AIService(); 