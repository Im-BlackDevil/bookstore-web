import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  useGLTF,
  Text,
  Float,
  Html
} from '@react-three/drei';
import { motion } from 'framer-motion';
import { BookOpenIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  genre: string;
  rating: number;
  isFavorite: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
}

interface VirtualBookshelfProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
  onToggleFavorite: (bookId: string) => void;
  userLevel: number;
  totalBooks: number;
}

// 3D Book Component
const Book3D: React.FC<{ book: Book; onClick: () => void }> = ({ book, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = book.position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Hover effect
      if (hovered) {
        meshRef.current.rotation.y += 0.02;
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.rotation.y = book.rotation[1];
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={book.position}
        rotation={book.rotation}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        {/* Book cover */}
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial 
          color={hovered ? "#fbbf24" : "#8b5cf6"}
          metalness={0.1}
          roughness={0.8}
        />
        
        {/* Book spine */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color="#6366f1" />
        </mesh>

        {/* Book title on spine */}
        <Html position={[0, 0, 0.06]} center>
          <div className="text-xs text-white font-bold transform rotate-90 whitespace-nowrap">
            {book.title.substring(0, 15)}
          </div>
        </Html>

        {/* Favorite indicator */}
        {book.isFavorite && (
          <Html position={[0.4, 0.5, 0.06]}>
            <HeartIcon className="w-4 h-4 text-red-500" />
          </Html>
        )}

        {/* Rating indicator */}
        <Html position={[0.4, -0.5, 0.06]}>
          <div className="flex items-center space-x-1">
            <div className="text-yellow-400 text-xs">★</div>
            <span className="text-xs text-white">{book.rating}</span>
          </div>
        </Html>
      </mesh>
    </Float>
  );
};

// Bookshelf Component
const Bookshelf: React.FC<{ books: Book[]; onBookSelect: (book: Book) => void }> = ({ 
  books, 
  onBookSelect 
}) => {
  const { camera } = useThree();

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <group>
      {/* Bookshelf structure */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[8, 0.2, 3]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Shelf dividers */}
      {[-2, 0, 2].map((x, index) => (
        <mesh key={index} position={[x, -1.5, 0]} receiveShadow>
          <boxGeometry args={[0.1, 2, 3]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}

      {/* Books */}
      {books.map((book, index) => (
        <Book3D 
          key={book.id} 
          book={book} 
          onClick={() => onBookSelect(book)}
        />
      ))}
    </group>
  );
};

// Main Virtual Bookshelf Component
const VirtualBookshelf: React.FC<VirtualBookshelfProps> = ({
  books,
  onBookSelect,
  onToggleFavorite,
  userLevel,
  totalBooks
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [filter, setFilter] = useState<string>('all');

  const filteredBooks = books.filter(book => {
    if (filter === 'all') return true;
    if (filter === 'favorites') return book.isFavorite;
    return book.genre === filter;
  });

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    onBookSelect(book);
  };

  const stats = [
    { label: 'Total Books', value: totalBooks, icon: BookOpenIcon },
    { label: 'Reading Level', value: userLevel, icon: EyeIcon },
    { label: 'Favorites', value: books.filter(b => b.isFavorite).length, icon: HeartIcon },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Virtual Bookshelf</h1>
            <p className="text-purple-200">Explore your collection in 3D</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex bg-black/20 rounded-lg p-1">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === '3d' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                3D View
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                Grid View
              </button>
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-black/20 text-white border border-purple-500 rounded-lg px-3 py-2"
            >
              <option value="all">All Books</option>
              <option value="favorites">Favorites</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="flex space-x-6 mt-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center space-x-2 text-purple-200">
              <stat.icon className="w-5 h-5" />
              <span className="font-semibold">{stat.label}:</span>
              <span className="text-white">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Canvas */}
      {viewMode === '3d' ? (
        <div className="h-full">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 2, 5]} />
            
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />

            {/* Environment */}
            <Environment preset="sunset" />

            {/* Bookshelf */}
            <Bookshelf 
              books={filteredBooks} 
              onBookSelect={handleBookSelect}
            />

            {/* Controls */}
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minDistance={2}
              maxDistance={10}
            />
          </Canvas>
        </div>
      ) : (
        /* Grid View */
        <div className="pt-32 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBookSelect(book)}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer border border-purple-500/30 hover:border-purple-400 transition-all duration-300"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mb-3 flex items-center justify-center">
                  <BookOpenIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white truncate">{book.title}</h3>
                <p className="text-xs text-purple-200 truncate">{book.author}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs text-white">{book.rating}</span>
                  </div>
                  {book.isFavorite && (
                    <HeartIcon className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Book Details Modal */}
      {selectedBook && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
          onClick={() => setSelectedBook(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedBook.title}
              </h2>
              <button
                onClick={() => onToggleFavorite(selectedBook.id)}
                className={`p-2 rounded-full transition-colors ${
                  selectedBook.isFavorite 
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <HeartIcon className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              by {selectedBook.author}
            </p>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                {selectedBook.genre}
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">★</span>
                <span className="text-gray-700 dark:text-gray-300">{selectedBook.rating}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Read Now
              </button>
              <button className="flex-1 border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                Add to Cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default VirtualBookshelf; 