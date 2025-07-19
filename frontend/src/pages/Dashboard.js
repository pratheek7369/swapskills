import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);
  const [newTeachSkill, setNewTeachSkill] = useState('');
  const [newLearnSkill, setNewLearnSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const [teachResponse, learnResponse] = await Promise.all([
        axios.get('/api/skills/teach'),
        axios.get('/api/skills/learn')
      ]);
      setTeachSkills(teachResponse.data);
      setLearnSkills(learnResponse.data);
    } catch (error) {
      setError('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const addTeachSkill = async (e) => {
    e.preventDefault();
    if (!newTeachSkill.trim()) return;

    try {
      const response = await axios.post('/api/skills/teach', { skill: newTeachSkill });
      setTeachSkills([...teachSkills, response.data]);
      setNewTeachSkill('');
    } catch (error) {
      setError('Failed to add teach skill');
    }
  };

  const addLearnSkill = async (e) => {
    e.preventDefault();
    if (!newLearnSkill.trim()) return;

    try {
      const response = await axios.post('/api/skills/learn', { skill: newLearnSkill });
      setLearnSkills([...learnSkills, response.data]);
      setNewLearnSkill('');
    } catch (error) {
      setError('Failed to add learn skill');
    }
  };

  const removeTeachSkill = async (skillId) => {
    try {
      await axios.delete(`/api/skills/teach/${skillId}`);
      setTeachSkills(teachSkills.filter(skill => skill._id !== skillId));
    } catch (error) {
      setError('Failed to remove teach skill');
    }
  };

  const removeLearnSkill = async (skillId) => {
    try {
      await axios.delete(`/api/skills/learn/${skillId}`);
      setLearnSkills(learnSkills.filter(skill => skill._id !== skillId));
    } catch (error) {
      setError('Failed to remove learn skill');
    }
  };

  const downloadResume = () => {
    // Placeholder for PDF download functionality
    alert('Resume download feature coming soon!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600">Manage your skills and find learning opportunities.</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Skills I Can Teach */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Skills I Can Teach</h2>
          <form onSubmit={addTeachSkill} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={newTeachSkill}
                onChange={(e) => setNewTeachSkill(e.target.value)}
                placeholder="Add a skill you can teach..."
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md"
              >
                Add
              </button>
            </div>
          </form>
          <div className="space-y-2">
            {teachSkills.map((skill) => (
              <div key={skill._id} className="flex justify-between items-center bg-green-50 p-3 rounded">
                <span className="text-green-800">{skill.skill}</span>
                <button
                  onClick={() => removeTeachSkill(skill._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            {teachSkills.length === 0 && (
              <p className="text-gray-500 text-sm">No skills added yet.</p>
            )}
          </div>
        </div>

        {/* Skills I Want to Learn */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Skills I Want to Learn</h2>
          <form onSubmit={addLearnSkill} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={newLearnSkill}
                onChange={(e) => setNewLearnSkill(e.target.value)}
                placeholder="Add a skill you want to learn..."
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
              >
                Add
              </button>
            </div>
          </form>
          <div className="space-y-2">
            {learnSkills.map((skill) => (
              <div key={skill._id} className="flex justify-between items-center bg-blue-50 p-3 rounded">
                <span className="text-blue-800">{skill.skill}</span>
                <button
                  onClick={() => removeLearnSkill(skill._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            {learnSkills.length === 0 && (
              <p className="text-gray-500 text-sm">No skills added yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/skill-matching"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Find Skill Matches
          </Link>
          <button
            onClick={downloadResume}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Download Resume (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 