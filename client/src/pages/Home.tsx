import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { 
  BookOpenIcon, 
  SparklesIcon, 
  UserGroupIcon, 
  TrophyIcon,
  HeartIcon,
  GlobeAltIcon,
  MusicalNoteIcon,
  MapIcon
} from '@heroicons/react/24/outline';

// Components
import Hero from '../components/home/Hero';
import FeaturedBooks from '../components/home/FeaturedBooks';
import AIRecommendations from '../components/home/AIRecommendations';
import MoodSelector from '../components/home/MoodSelector';
import ReadingJourney from '../components/home/ReadingJourney';
import CommunityHighlights from '../components/home/CommunityHighlights';
import GamificationSection from '../components/home/GamificationSection';
import ImmersiveFeatures from '../components/home/ImmersiveFeatures';
import SustainabilitySection from '../components/home/SustainabilitySection';

// Services
import { getFeaturedBooks, getAIRecommendations } from '../services/api';

const Home: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Fetch featured books
  const { data: featuredBooks, isLoading: featuredLoading } = useQuery({
    queryKey: ['featuredBooks'],
    queryFn: getFeaturedBooks,
  });

  // Fetch AI recommendations
  const { data: aiRecommendations, isLoading: aiLoading } = useQuery({
    queryKey: ['aiRecommendations', selectedMood],
    queryFn: () => getAIRecommendations(selectedMood),
    enabled: !!selectedMood,
  });

  // Get user location for local features
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, []);

  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Recommendations',
      description: 'Get personalized book suggestions based on your reading history, mood, and preferences.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: UserGroupIcon,
      title: 'Social Reading',
      description: 'Join virtual book clubs, find reading partners, and share your literary journey.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrophyIcon,
      title: 'Gamified Experience',
      description: 'Earn badges, points, and achievements as you explore the world of literature.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: HeartIcon,
      title: 'Mood-Based Reading',
      description: 'Discover books that match your current emotional state and life circumstances.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: GlobeAltIcon,
      title: 'Interactive Maps',
      description: 'Explore the real-world locations from your favorite books with interactive maps.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: MusicalNoteIcon,
      title: 'Book Soundtracks',
      description: 'Listen to curated playlists that complement the mood and themes of your books.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <>
      <Helmet>
        <title>LitVerse – Beyond the Bookstore | Innovative Reading Platform</title>
        <meta name="description" content="Discover a revolutionary reading experience with AI-powered recommendations, social reading features, and immersive content. Join LitVerse today!" />
        <meta name="keywords" content="bookstore, e-commerce, AI recommendations, social reading, gamification, virtual bookshelf" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Features Grid */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Revolutionary Reading Experience
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                LitVerse combines cutting-edge AI technology with social features to create 
                the most innovative reading platform ever built.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-gradient-to-r p-1 rounded-2xl">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 h-full">
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Recommendations Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                AI-Powered Discovery
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Let our intelligent system find your next favorite book
              </p>
            </motion.div>

            <MoodSelector onMoodSelect={setSelectedMood} />
            
            {selectedMood && (
              <AIRecommendations 
                recommendations={aiRecommendations} 
                isLoading={aiLoading}
                mood={selectedMood}
              />
            )}
          </div>
        </section>

        {/* Featured Books */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Books
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Curated selections from our vast collection
              </p>
            </motion.div>

            <FeaturedBooks books={featuredBooks} isLoading={featuredLoading} />
          </div>
        </section>

        {/* Reading Journey */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ReadingJourney />
          </div>
        </section>

        {/* Gamification Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GamificationSection />
          </div>
        </section>

        {/* Community Highlights */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CommunityHighlights userLocation={userLocation} />
          </div>
        </section>

        {/* Immersive Features */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ImmersiveFeatures />
          </div>
        </section>

        {/* Sustainability Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SustainabilitySection />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your Reading Experience?
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                Join thousands of readers who have already discovered the future of literature. 
                Start your personalized reading journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-purple-50 transition-colors duration-300"
                >
                  Start Reading Journey
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors duration-300"
                >
                  Explore Features
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home; 