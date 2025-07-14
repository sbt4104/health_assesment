const express = require('express');
const cors = require('cors');
const FitnessCalculations = require('../server/utils/fitnessCalculations');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-app.vercel.app', 'https://your-app.netlify.app', 'http://localhost:3000']
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Validation middleware
const validateAssessmentInput = (req, res, next) => {
  const {
    name, age, height, currentWeight, gender, activityLevel,
    primaryGoal, workoutFrequency, sessionDuration
  } = req.body;

  const errors = [];

  // Required fields validation
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!age || age < 16 || age > 100) {
    errors.push('Age must be between 16 and 100');
  }

  if (!height || height < 48 || height > 96) {
    errors.push('Height must be between 48 and 96 inches');
  }

  if (!currentWeight || currentWeight < 80 || currentWeight > 500) {
    errors.push('Current weight must be between 80 and 500 lbs');
  }

  if (!gender || !['Male', 'Female'].includes(gender)) {
    errors.push('Gender must be Male or Female');
  }

  if (!activityLevel || !['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'].includes(activityLevel)) {
    errors.push('Activity level must be one of: Sedentary, Lightly Active, Moderately Active, Very Active');
  }

  if (!primaryGoal || !['Weight Loss', 'Muscle Gain', 'Athletic Performance', 'General Fitness'].includes(primaryGoal)) {
    errors.push('Primary goal must be one of: Weight Loss, Muscle Gain, Athletic Performance, General Fitness');
  }

  if (!workoutFrequency || workoutFrequency < 1 || workoutFrequency > 7) {
    errors.push('Workout frequency must be between 1 and 7 days per week');
  }

  if (!sessionDuration || sessionDuration < 30 || sessionDuration > 180) {
    errors.push('Session duration must be between 30 and 180 minutes');
  }

  // Optional fields validation
  if (req.body.targetWeight) {
    if (req.body.targetWeight < 80 || req.body.targetWeight > 500) {
      errors.push('Target weight must be between 80 and 500 lbs');
    }
  }

  if (req.body.bodyFatPercentage) {
    if (req.body.bodyFatPercentage < 5 || req.body.bodyFatPercentage > 50) {
      errors.push('Body fat percentage must be between 5 and 50%');
    }
  }

  if (req.body.skeletalMuscleMass) {
    if (req.body.skeletalMuscleMass < 20 || req.body.skeletalMuscleMass > 200) {
      errors.push('Skeletal muscle mass must be between 20 and 200 lbs');
    }
  }

  if (req.body.restingHeartRate) {
    if (req.body.restingHeartRate < 40 || req.body.restingHeartRate > 120) {
      errors.push('Resting heart rate must be between 40 and 120 bpm');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }

  next();
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Fitness Assessment API is running',
    timestamp: new Date().toISOString()
  });
});

// Generate fitness assessment
app.post('/api/assessment', validateAssessmentInput, (req, res) => {
  try {
    const assessment = FitnessCalculations.generateCompleteAssessment(req.body);
    
    res.json({
      success: true,
      data: assessment,
      message: 'Assessment generated successfully'
    });
  } catch (error) {
    console.error('Assessment generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating assessment',
      error: error.message
    });
  }
});

// Export for Vercel
module.exports = app; 