const express = require('express');
const { body } = require('express-validator');
const skillController = require('../controllers/skillController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const skillValidation = [
  body('skill')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Skill must be between 1 and 100 characters')
];

// Apply auth middleware to all routes
router.use(auth);

// Teach skills routes
router.get('/teach', skillController.getTeachSkills);
router.post('/teach', skillValidation, skillController.addTeachSkill);
router.delete('/teach/:id', skillController.deleteTeachSkill);

// Learn skills routes
router.get('/learn', skillController.getLearnSkills);
router.post('/learn', skillValidation, skillController.addLearnSkill);
router.delete('/learn/:id', skillController.deleteLearnSkill);

// Matching route
router.get('/matches', skillController.getMatches);

module.exports = router; 