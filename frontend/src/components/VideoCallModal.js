import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVideo, FaTimes, FaUser } from 'react-icons/fa';
import VideoCall from './VideoCall';

const VideoCallModal = ({ isOpen, onClose, remoteUser }) => {
  const [isCallActive, setIsCallActive] = useState(false);

  const handleStartCall = () => {
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {!isCallActive ? (
          // Call Initiation Modal
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUser className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Start Video Call
              </h2>
              
              <p className="text-gray-600 mb-6">
                Call {remoteUser?.name || 'this user'} for a skill exchange session
              </p>

              <div className="space-y-4">
                <motion.button
                  onClick={handleStartCall}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaVideo className="mr-2" />
                  Start Video Call
                </motion.button>

                <motion.button
                  onClick={onClose}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaTimes className="mr-2" />
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          // Active Video Call
          <VideoCall
            isOpen={isCallActive}
            onClose={handleEndCall}
            remoteUserId={remoteUser?._id}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoCallModal; 