import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaVideo, FaEnvelope, FaUser, FaStar, FaGraduationCap, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';
import VideoCallModal from '../components/VideoCallModal';

const SkillMatching = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [videoCallModal, setVideoCallModal] = useState({ isOpen: false, user: null });

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get('/api/skills/matches');
      setMatches(response.data);
    } catch (error) {
      setError('Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoCall = (user) => {
    setVideoCallModal({ isOpen: true, user });
  };

  const handleMessage = (userId) => {
    // Placeholder for messaging functionality
    console.log('Sending message to user:', userId);
    alert('Messaging feature coming soon!');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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

  if (loading) {
    return (
      <motion.div 
        className="flex justify-center items-center h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xl text-gray-600">Loading matches...</div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <motion.div 
        className="max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-8 text-center" variants={itemVariants}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <FaStar className="inline mr-3 text-yellow-500" />
            Skill Matches
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find people who can teach you skills and want to learn from you.
            Connect, learn, and grow together!
          </p>
        </motion.div>

        {error && (
          <motion.div 
            className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {matches.length === 0 ? (
          <motion.div 
            className="bg-white p-12 rounded-2xl shadow-lg text-center max-w-md mx-auto"
            variants={itemVariants}
          >
            <div className="text-gray-400 mb-6">
              <FaUsers className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No matches found</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Add more skills to your profile to find better matches with other users.
              The more skills you add, the better your matches will be!
            </p>
            <motion.button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGraduationCap className="inline mr-2" />
              Go to Dashboard
            </motion.button>
          </motion.div>
        ) : (
          <motion.div className="grid gap-8" variants={itemVariants}>
            {matches.map((match, index) => (
              <motion.div 
                key={match._id} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <FaUser className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{match.user.name}</h3>
                      <p className="text-gray-600">{match.user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {match.matchScore}%
                    </div>
                    <div className="text-sm text-gray-500">Match Score</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  {/* Skills they can teach you */}
                  <motion.div 
                    className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-bold text-green-800 mb-4 flex items-center text-lg">
                      <FaChalkboardTeacher className="mr-2" />
                      Can teach you:
                    </h4>
                    <div className="space-y-3">
                      {match.canTeachYou.map((skill, index) => (
                        <motion.div 
                          key={index} 
                          className="bg-green-200 text-green-800 px-4 py-3 rounded-lg text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Skills you can teach them */}
                  <motion.div 
                    className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-bold text-blue-800 mb-4 flex items-center text-lg">
                      <FaGraduationCap className="mr-2" />
                      You can teach them:
                    </h4>
                    <div className="space-y-3">
                      {match.youCanTeachThem.map((skill, index) => (
                        <motion.div 
                          key={index} 
                          className="bg-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="flex space-x-4">
                  <motion.button 
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300 flex items-center justify-center"
                    onClick={() => handleVideoCall(match.user)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaVideo className="mr-2" />
                    Video Call
                  </motion.button>
                  <motion.button 
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300 flex items-center justify-center"
                    onClick={() => handleMessage(match.user._id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEnvelope className="mr-2" />
                    Send Message
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Video Call Modal */}
      <VideoCallModal
        isOpen={videoCallModal.isOpen}
        onClose={() => setVideoCallModal({ isOpen: false, user: null })}
        remoteUser={videoCallModal.user}
      />
    </div>
  );
};

export default SkillMatching; 