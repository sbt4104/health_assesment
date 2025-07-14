const FitnessCalculations = require('./utils/fitnessCalculations');

// Validation middleware
const validateAssessmentInput = (body) => {
  const {
    name, age, height, currentWeight, gender, activityLevel,
    primaryGoal, workoutFrequency, sessionDuration
  } = body;

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
  if (body.targetWeight) {
    if (body.targetWeight < 80 || body.targetWeight > 500) {
      errors.push('Target weight must be between 80 and 500 lbs');
    }
  }

  if (body.bodyFatPercentage) {
    if (body.bodyFatPercentage < 5 || body.bodyFatPercentage > 50) {
      errors.push('Body fat percentage must be between 5 and 50%');
    }
  }

  if (body.skeletalMuscleMass) {
    if (body.skeletalMuscleMass < 20 || body.skeletalMuscleMass > 200) {
      errors.push('Skeletal muscle mass must be between 20 and 200 lbs');
    }
  }

  if (body.restingHeartRate) {
    if (body.restingHeartRate < 40 || body.restingHeartRate > 120) {
      errors.push('Resting heart rate must be between 40 and 120 bpm');
    }
  }

  return errors;
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true'
};

// Vercel serverless function handler
module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).end();
    return;
  }

  // Set CORS headers for all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  try {
    // Health check endpoint
    if (req.method === 'GET' && req.url === '/api/health') {
      return res.status(200).json({
        success: true,
        message: 'Fitness Assessment API is running',
        timestamp: new Date().toISOString()
      });
    }

    // Generate fitness assessment
    if (req.method === 'POST' && req.url === '/api/assessment') {
      const errors = validateAssessmentInput(req.body);
      
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          errors: errors
        });
      }

      const assessment = FitnessCalculations.generateCompleteAssessment(req.body);
      
      return res.status(200).json({
        success: true,
        data: assessment,
        message: 'Assessment generated successfully'
      });
    }

    // Default response for unmatched routes
    return res.status(404).json({
      success: false,
      message: 'Endpoint not found'
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}; 