import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaUsers, FaGraduationCap, FaHandshake, FaRocket, FaHeart, FaStar } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <motion.div 
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h1 
            className="text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SkillSwap
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Connect with people who can teach you the skills you want to learn, 
            and share your expertise with those who want to learn from you.
            <br />
            <span className="text-blue-600 font-medium">Learn, Teach, Grow Together!</span>
          </motion.p>
          
          <motion.div 
            className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FaRocket className="inline mr-2" />
                  Go to Dashboard
                </Link>
                <Link
                  to="/skill-matching"
                  className="inline-block bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg border-2 border-gray-200"
                >
                  <FaUsers className="inline mr-2" />
                  Find Matches
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FaRocket className="inline mr-2" />
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-block bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg border-2 border-gray-200"
                >
                  <FaHeart className="inline mr-2" />
                  Sign In
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={itemVariants}
        >
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaGraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center text-gray-900">Learn New Skills</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Find mentors who can teach you the skills you want to acquire. 
              From programming to cooking, find experts in any field.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaStar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center text-gray-900">Share Your Knowledge</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Help others learn by sharing your expertise and experience. 
              Become a mentor and make a difference in someone's life.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHandshake className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center text-gray-900">Build Connections</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Connect with like-minded people and build meaningful relationships. 
              Create a network of learners and teachers.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose SkillSwap?</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Active Users</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Skills Available</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-4xl font-bold text-green-600 mb-2">2000+</div>
              <div className="text-gray-600">Successful Matches</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-4xl font-bold text-orange-600 mb-2">4.9★</div>
              <div className="text-gray-600">User Rating</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home; 