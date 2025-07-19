const { validationResult } = require('express-validator');
const Skill = require('../models/Skill');
const User = require('../models/User');

// @desc    Get user's teach skills
// @route   GET /api/skills/teach
// @access  Private
const getTeachSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user._id, type: 'teach' });
    res.json(skills);
  } catch (error) {
    console.error('Get teach skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's learn skills
// @route   GET /api/skills/learn
// @access  Private
const getLearnSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user._id, type: 'learn' });
    res.json(skills);
  } catch (error) {
    console.error('Get learn skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add teach skill
// @route   POST /api/skills/teach
// @access  Private
const addTeachSkill = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { skill } = req.body;

    // Check if skill already exists
    const existingSkill = await Skill.findOne({
      user: req.user._id,
      skill: skill.trim(),
      type: 'teach'
    });

    if (existingSkill) {
      return res.status(400).json({ message: 'Skill already exists' });
    }

    const newSkill = new Skill({
      user: req.user._id,
      skill: skill.trim(),
      type: 'teach'
    });

    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    console.error('Add teach skill error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Skill already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add learn skill
// @route   POST /api/skills/learn
// @access  Private
const addLearnSkill = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { skill } = req.body;

    // Check if skill already exists
    const existingSkill = await Skill.findOne({
      user: req.user._id,
      skill: skill.trim(),
      type: 'learn'
    });

    if (existingSkill) {
      return res.status(400).json({ message: 'Skill already exists' });
    }

    const newSkill = new Skill({
      user: req.user._id,
      skill: skill.trim(),
      type: 'learn'
    });

    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    console.error('Add learn skill error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Skill already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete teach skill
// @route   DELETE /api/skills/teach/:id
// @access  Private
const deleteTeachSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
      type: 'teach'
    });

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ message: 'Skill removed' });
  } catch (error) {
    console.error('Delete teach skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete learn skill
// @route   DELETE /api/skills/learn/:id
// @access  Private
const deleteLearnSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
      type: 'learn'
    });

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ message: 'Skill removed' });
  } catch (error) {
    console.error('Delete learn skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get skill matches
// @route   GET /api/skills/matches
// @access  Private
const getMatches = async (req, res) => {
  try {
    // Get current user's skills
    const userTeachSkills = await Skill.find({ user: req.user._id, type: 'teach' });
    const userLearnSkills = await Skill.find({ user: req.user._id, type: 'learn' });

    const userTeachSkillNames = userTeachSkills.map(s => s.skill);
    const userLearnSkillNames = userLearnSkills.map(s => s.skill);

    // Find other users
    const otherUsers = await User.find({ _id: { $ne: req.user._id } });

    const matches = [];

    for (const otherUser of otherUsers) {
      // Get other user's skills
      const otherUserTeachSkills = await Skill.find({ user: otherUser._id, type: 'teach' });
      const otherUserLearnSkills = await Skill.find({ user: otherUser._id, type: 'learn' });

      const otherUserTeachSkillNames = otherUserTeachSkills.map(s => s.skill);
      const otherUserLearnSkillNames = otherUserLearnSkills.map(s => s.skill);

      // Find matching skills
      const canTeachYou = otherUserTeachSkillNames.filter(skill => 
        userLearnSkillNames.includes(skill)
      );
      const youCanTeachThem = userTeachSkillNames.filter(skill => 
        otherUserLearnSkillNames.includes(skill)
      );

      // Calculate match score
      const totalPossibleMatches = userLearnSkillNames.length + userTeachSkillNames.length;
      const actualMatches = canTeachYou.length + youCanTeachThem.length;
      const matchScore = totalPossibleMatches > 0 ? Math.round((actualMatches / totalPossibleMatches) * 100) : 0;

      if (canTeachYou.length > 0 || youCanTeachThem.length > 0) {
        matches.push({
          _id: otherUser._id,
          user: {
            _id: otherUser._id,
            name: otherUser.name,
            email: otherUser.email
          },
          canTeachYou,
          youCanTeachThem,
          matchScore
        });
      }
    }

    // Sort by match score (highest first)
    matches.sort((a, b) => b.matchScore - a.matchScore);

    res.json(matches);
  } catch (error) {
    console.error('Get matches error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTeachSkills,
  getLearnSkills,
  addTeachSkill,
  addLearnSkill,
  deleteTeachSkill,
  deleteLearnSkill,
  getMatches
}; 