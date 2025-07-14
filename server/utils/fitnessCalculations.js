// Enhanced Fitness Assessment Calculations with InBody Methodologies
class FitnessCalculations {
  static calculateBMI(weight, height) {
    return (weight * 703) / (height * height);
  }

  static getBMICategory(bmi) {
    if (bmi < 18.5) return { category: 'Underweight', color: 'blue' };
    if (bmi < 25) return { category: 'Normal Weight', color: 'green' };
    if (bmi < 30) return { category: 'Overweight', color: 'orange' };
    return { category: 'Obese', color: 'red' };
  }

  // InBody Goal Weight Calculation
  static calculateGoalWeightRange(height, isAthlete = false) {
    let minBMI, maxBMI;
    
    if (isAthlete) {
      // Athlete weight range for competition
      minBMI = 29;
      maxBMI = 32;
    } else {
      // Healthy long-term goal range
      minBMI = 23;
      maxBMI = 25;
    }
    
    const minWeight = (height * height * minBMI) / 703;
    const maxWeight = (height * height * maxBMI) / 703;
    
    return { 
      min: Math.round(minWeight), 
      max: Math.round(maxWeight),
      recommended: Math.round((minWeight + maxWeight) / 2)
    };
  }

  static estimateBodyFatPercentage(age, gender, activityLevel) {
    let baseFat = gender === 'Male' ? 15 : 25;
    if (age > 50) baseFat += 2;
    if (age > 60) baseFat += 3;
    const activityAdjustments = {
      'Sedentary': 3,
      'Lightly Active': 1,
      'Moderately Active': -1,
      'Very Active': -3
    };
    baseFat += activityAdjustments[activityLevel] || 0;
    return Math.max(8, Math.min(35, baseFat));
  }

  static calculateSkeletalMuscleMass(weight, bodyFatPercentage) {
    const leanMass = weight * (1 - bodyFatPercentage / 100);
    return leanMass * 0.45;
  }

  static calculateSMMPercentage(smm, weight) {
    return (smm / weight) * 100;
  }

  static getSMMTargetRange(gender) {
    return gender === 'Male' 
      ? { min: 45, max: 55, target: 50 }
      : { min: 40, max: 50, target: 45 };
  }

  // InBody RMR Calculation
  static calculateRMR(weight) {
    return weight * 11;
  }

  static getActivityMultiplier(activityLevel) {
    const multipliers = {
      'Sedentary': 1.2,
      'Lightly Active': 1.375,
      'Moderately Active': 1.55,
      'Very Active': 1.725
    };
    return multipliers[activityLevel] || 1.2;
  }

  static calculateTotalDailyCalories(rmr, activityMultiplier) {
    return rmr * activityMultiplier;
  }

  // Enhanced Protein Calculation with Ranges
  static calculateProteinRequirements(smm, weight, gender) {
    const baseNeed = smm * 1.5;
    const minProtein = smm * 1.0;
    const maxProtein = smm * 2.0;
    
    return {
      baseNeed: Math.round(baseNeed),
      minimum: Math.round(minProtein),
      maximum: Math.round(maxProtein),
      recommended: Math.round(baseNeed)
    };
  }

  // Enhanced Weight Loss Strategy with InBody Methodology
  static calculateWeightLossStrategy(currentWeight, targetWeight, currentRMR, activityLevel, age, gender, smm, workoutFrequency, sessionDuration, isAthlete = false) {
    if (targetWeight >= currentWeight) return null;
    
    // Calculate RMRs
    const currentRMRCalculated = currentWeight * 11;
    const targetRMR = targetWeight * 11;
    
    // Nutritional caloric deficit
    const nutritionalDeficit = currentRMRCalculated - targetRMR;
    
    // Additional active calories based on activity level
    const activeCaloriesPerDay = {
      'Sedentary': 0,
      'Lightly Active': currentRMRCalculated * 0.1, // 10% of RMR
      'Moderately Active': currentRMRCalculated * 0.2, // 20% of RMR
      'Very Active': currentRMRCalculated * 0.3 // 30% of RMR
    }[activityLevel] || 0;
    
    // Workout-based calorie deficit (InBody methodology)
    const sessionCalorieDeficit = sessionDuration * 8; // ~8 calories per minute of exercise
    const weeklyWorkoutDeficit = sessionCalorieDeficit * workoutFrequency;
    const dailyWorkoutDeficit = weeklyWorkoutDeficit / 7;
    
    const totalDailyDeficit = nutritionalDeficit + activeCaloriesPerDay + dailyWorkoutDeficit;
    const weeklyDeficit = totalDailyDeficit * 7;
    const weeklyWeightLoss = weeklyDeficit / 3500;
    const weightToLose = currentWeight - targetWeight;
    const timelineWeeks = weightToLose / weeklyWeightLoss;
    
    // Calculate fat loss vs muscle preservation
    const currentBodyFat = this.estimateBodyFatPercentage(age, gender, activityLevel);
    const targetBodyFat = isAthlete ? 15 : 16; // More realistic target for weight loss
    const fatToLose = Math.max(0, (currentWeight * currentBodyFat / 100) - (targetWeight * targetBodyFat / 100));
    
    // InBody approach: protein and training help preserve muscle during weight loss
    const realisticFatLoss = Math.min(fatToLose, weightToLose * 0.8); // Assume 80% of weight loss is fat
    
    // Calculate muscle preservation based on protein intake and training
    const proteinIntake = smm * 1.5; // Base protein need
    const proteinPreservationFactor = Math.min(1, proteinIntake / (smm * 1.2)); // Protein helps preserve muscle
    const trainingPreservationFactor = workoutFrequency >= 3 ? 0.8 : 1.0; // Training 3+ days/week helps preserve muscle
    
    const musclePreservation = weightToLose - realisticFatLoss;
    
    // With adequate protein and training, muscle loss should be minimal
    const adjustedMuscleLoss = Math.max(0, musclePreservation * (1 - proteinPreservationFactor * 0.5) * trainingPreservationFactor);
    
    // Calculate scenarios for comparison
    const withoutProteinMuscleLoss = musclePreservation; // No protein preservation
    const withProteinMuscleLoss = adjustedMuscleLoss; // With protein preservation
    const musclePreserved = withoutProteinMuscleLoss - withProteinMuscleLoss;
    
    return {
      nutritionalDeficit: Math.round(nutritionalDeficit),
      activeCalories: Math.round(activeCaloriesPerDay),
      workoutCalories: Math.round(dailyWorkoutDeficit),
      totalDailyDeficit: Math.round(totalDailyDeficit),
      weeklyDeficit: Math.round(weeklyDeficit),
      weeklyWeightLoss: Math.round(weeklyWeightLoss * 100) / 100,
      timelineWeeks: Math.round(timelineWeeks),
      weightToLose: Math.round(weightToLose * 10) / 10,
      fatToLose: Math.round(realisticFatLoss * 10) / 10,
      musclePreservation: Math.round(adjustedMuscleLoss * 10) / 10,
      proteinComparison: {
        withoutProtein: {
          muscleLoss: Math.round(withoutProteinMuscleLoss * 10) / 10,
          fatLoss: Math.round((weightToLose - withoutProteinMuscleLoss) * 10) / 10
        },
        withProtein: {
          muscleLoss: Math.round(withProteinMuscleLoss * 10) / 10,
          fatLoss: Math.round((weightToLose - withProteinMuscleLoss) * 10) / 10,
          musclePreserved: Math.round(musclePreserved * 10) / 10
        }
      }
    };
  }

  // Enhanced Body Composition Analysis
  static analyzeBodyComposition(weight, height, age, gender, activityLevel, bodyFatPercentage, isAthlete = false) {
    const bmi = this.calculateBMI(weight, height);
    const bmiCategory = this.getBMICategory(bmi);
    const goalWeightRange = this.calculateGoalWeightRange(height, isAthlete);
    const estimatedBodyFat = bodyFatPercentage || this.estimateBodyFatPercentage(age, gender, activityLevel);
    const smm = this.calculateSkeletalMuscleMass(weight, estimatedBodyFat);
    const smmPercentage = this.calculateSMMPercentage(smm, weight);
    const smmTarget = this.getSMMTargetRange(gender);
    
    // Calculate desired SMM at goal weight
    const desiredSMM = smm; // Assume maintaining current SMM
    const desiredSMMPercentage = this.calculateSMMPercentage(desiredSMM, goalWeightRange.recommended);
    
    // Body fat analysis
    const idealBodyFatRange = gender === 'Male' 
      ? { min: 12, max: 20 }
      : { min: 22, max: 30 };
    
    const bodyFatStatus = estimatedBodyFat < idealBodyFatRange.min ? 'Low' :
                         estimatedBodyFat > idealBodyFatRange.max ? 'High' : 'Optimal';
    
    return {
      bmi,
      bmiCategory,
      goalWeightRange,
      bodyFatPercentage: estimatedBodyFat,
      bodyFatStatus,
      idealBodyFatRange,
      skeletalMuscleMass: Math.round(smm * 10) / 10,
      smmPercentage: Math.round(smmPercentage * 10) / 10,
      smmTarget,
      desiredSMM: Math.round(desiredSMM * 10) / 10,
      desiredSMMPercentage: Math.round(desiredSMMPercentage * 10) / 10,
      muscleDeficit: smmPercentage < smmTarget.min ? Math.round((smmTarget.min - smmPercentage) * weight / 100 * 10) / 10 : 0
    };
  }

  // Enhanced Metabolic Analysis
  static analyzeMetabolicProfile(weight, activityLevel, smm, gender) {
    const rmr = this.calculateRMR(weight);
    const activityMultiplier = this.getActivityMultiplier(activityLevel);
    const totalCalories = this.calculateTotalDailyCalories(rmr, activityMultiplier);
    const proteinRequirements = this.calculateProteinRequirements(smm, weight, gender);
    
    // Calculate macronutrient breakdown
    const proteinCalories = proteinRequirements.recommended * 4;
    const fatCalories = totalCalories * 0.25; // 25% from fat
    const carbCalories = totalCalories - proteinCalories - fatCalories;
    
    return {
      rmr: Math.round(rmr),
      activityMultiplier,
      totalDailyCalories: Math.round(totalCalories),
      proteinRequirements,
      macronutrients: {
        protein: {
          grams: proteinRequirements.recommended,
          calories: Math.round(proteinCalories),
          percentage: Math.round((proteinCalories / totalCalories) * 100)
        },
        fat: {
          grams: Math.round(fatCalories / 9),
          calories: Math.round(fatCalories),
          percentage: Math.round((fatCalories / totalCalories) * 100)
        },
        carbs: {
          grams: Math.round(carbCalories / 4),
          calories: Math.round(carbCalories),
          percentage: Math.round((carbCalories / totalCalories) * 100)
        }
      }
    };
  }

  static generateCompleteAssessment(clientData) {
    const {
      name, age, height, currentWeight, gender, activityLevel,
      primaryGoal, targetWeight, workoutFrequency, sessionDuration,
      bodyFatPercentage, skeletalMuscleMass, restingHeartRate, isAthlete = false
    } = clientData;
    
    // Enhanced body composition analysis
    const bodyComposition = this.analyzeBodyComposition(
      currentWeight, height, age, gender, activityLevel, bodyFatPercentage, isAthlete
    );
    
    // Enhanced metabolic analysis
    const metabolic = this.analyzeMetabolicProfile(
      currentWeight, activityLevel, bodyComposition.skeletalMuscleMass, gender
    );
    
    // Enhanced weight loss strategy
    const weightLossStrategy = targetWeight ? 
      this.calculateWeightLossStrategy(currentWeight, targetWeight, metabolic.rmr, activityLevel, age, gender, bodyComposition.skeletalMuscleMass, workoutFrequency, sessionDuration, isAthlete) : null;
    
    return {
      clientInfo: {
        name,
        age,
        height,
        currentWeight,
        gender,
        activityLevel,
        primaryGoal,
        targetWeight,
        workoutFrequency,
        sessionDuration,
        isAthlete
      },
      bodyComposition,
      metabolic,
      weightLossStrategy
    };
  }
}

module.exports = FitnessCalculations; 