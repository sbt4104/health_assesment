const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const FitnessCalculations = require('./utils/fitnessCalculations');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://your-app.vercel.app', // Replace with your actual Vercel domain
        'https://your-app.netlify.app', // Replace with your actual Netlify domain
        'http://localhost:3000' // For local development
      ]
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(morgan('combined'));
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

// Routes
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

// Calculate specific metrics
app.post('/api/calculate/bmi', (req, res) => {
  try {
    const { weight, height } = req.body;
    
    if (!weight || !height) {
      return res.status(400).json({
        success: false,
        message: 'Weight and height are required'
      });
    }

    const bmi = FitnessCalculations.calculateBMI(weight, height);
    const category = FitnessCalculations.getBMICategory(bmi);
    const healthyRange = FitnessCalculations.calculateHealthyWeightRange(height);

    res.json({
      success: true,
      data: {
        bmi: Math.round(bmi * 10) / 10,
        category,
        healthyRange
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error calculating BMI',
      error: error.message
    });
  }
});

app.post('/api/calculate/calories', (req, res) => {
  try {
    const { weight, activityLevel, age, gender } = req.body;
    
    if (!weight || !activityLevel) {
      return res.status(400).json({
        success: false,
        message: 'Weight and activity level are required'
      });
    }

    const rmr = FitnessCalculations.calculateRMR(weight);
    const activityMultiplier = FitnessCalculations.getActivityMultiplier(activityLevel);
    const totalCalories = FitnessCalculations.calculateTotalDailyCalories(rmr, activityMultiplier);

    res.json({
      success: true,
      data: {
        rmr: Math.round(rmr),
        activityMultiplier,
        totalDailyCalories: Math.round(totalCalories)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error calculating calories',
      error: error.message
    });
  }
});

app.post('/api/calculate/weight-loss', (req, res) => {
  try {
    const { currentWeight, targetWeight, activityLevel } = req.body;
    
    if (!currentWeight || !targetWeight || !activityLevel) {
      return res.status(400).json({
        success: false,
        message: 'Current weight, target weight, and activity level are required'
      });
    }

    const rmr = FitnessCalculations.calculateRMR(currentWeight);
    const strategy = FitnessCalculations.calculateWeightLossStrategy(currentWeight, targetWeight, rmr, activityLevel);

    if (!strategy) {
      return res.status(400).json({
        success: false,
        message: 'Target weight must be less than current weight for weight loss calculation'
      });
    }

    res.json({
      success: true,
      data: strategy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error calculating weight loss strategy',
      error: error.message
    });
  }
});

// Generate training program
app.post('/api/training/generate', (req, res) => {
  try {
    const { estimated1RM, goal, frequency, heartRateZones, sessionDuration } = req.body;
    
    if (!estimated1RM || !goal || !frequency) {
      return res.status(400).json({
        success: false,
        message: 'Estimated 1RM, goal, and frequency are required'
      });
    }

    const strengthTraining = FitnessCalculations.generateStrengthTraining(estimated1RM, goal, frequency);
    const cardioTraining = FitnessCalculations.generateCardioTraining(heartRateZones, goal, frequency, sessionDuration);

    res.json({
      success: true,
      data: {
        strength: strengthTraining,
        cardio: cardioTraining
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating training program',
      error: error.message
    });
  }
});

// Generate nutrition plan
app.post('/api/nutrition/generate', (req, res) => {
  try {
    const { totalCalories, goal, smm } = req.body;
    
    if (!totalCalories || !goal || !smm) {
      return res.status(400).json({
        success: false,
        message: 'Total calories, goal, and skeletal muscle mass are required'
      });
    }

    const macronutrients = FitnessCalculations.calculateMacronutrients(totalCalories, goal, smm);

    res.json({
      success: true,
      data: macronutrients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating nutrition plan',
      error: error.message
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Fitness Assessment API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
}); 