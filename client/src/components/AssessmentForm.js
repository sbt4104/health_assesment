import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import API_ENDPOINTS from '../config/api';
import { 
  User, 
  Calendar, 
  Ruler, 
  Scale, 
  Activity, 
  Target, 
  Clock, 
  Plus,
  ArrowRight,
  Info
} from 'lucide-react';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const FormCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FormTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const FormSubtitle = styled.p`
  text-align: center;
  color: #718096;
  margin-bottom: 3rem;
  font-size: 1.1rem;
`;

const FormSection = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &.error {
    border-color: #e53e3e;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &.error {
    border-color: #e53e3e;
  }
`;

const ErrorMessage = styled.span`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const OptionalLabel = styled.span`
  font-size: 0.875rem;
  color: #718096;
  font-weight: normal;
`;

const AdvancedSection = styled.div`
  border-top: 2px solid #e2e8f0;
  padding-top: 2rem;
  margin-top: 2rem;
`;

const AdvancedToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  
  &:hover {
    color: #5a67d8;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  margin-top: 2rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const InfoBox = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const AssessmentForm = () => {
  const navigate = useNavigate();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const primaryGoal = watch('primaryGoal');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.assessment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Store assessment data in localStorage for results page
        localStorage.setItem('assessmentData', JSON.stringify(result.data));
        toast.success('Assessment generated successfully!');
        navigate('/results');
      } else {
        toast.error(result.message || 'Error generating assessment');
      }
    } catch (error) {
      console.error('Assessment error:', error);
      toast.error('Error generating assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FormTitle>Fitness Assessment</FormTitle>
        <FormSubtitle>
          Complete the form below to generate your personalized fitness assessment and training plan
        </FormSubtitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Information */}
          <FormSection>
            <SectionTitle>
              <User size={20} />
              Basic Information
            </SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Client Name *</Label>
                <Input
                  {...register('name', { 
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                  })}
                  placeholder="Enter client name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Age *</Label>
                <Input
                  type="number"
                  {...register('age', { 
                    required: 'Age is required',
                    min: { value: 16, message: 'Age must be at least 16' },
                    max: { value: 100, message: 'Age must be 100 or less' }
                  })}
                  placeholder="16-100"
                  className={errors.age ? 'error' : ''}
                />
                {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Height (inches) *</Label>
                <Input
                  type="number"
                  {...register('height', { 
                    required: 'Height is required',
                    min: { value: 48, message: 'Height must be at least 48 inches' },
                    max: { value: 96, message: 'Height must be 96 inches or less' }
                  })}
                  placeholder="48-96 inches"
                  className={errors.height ? 'error' : ''}
                />
                {errors.height && <ErrorMessage>{errors.height.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Current Weight (lbs) *</Label>
                <Input
                  type="number"
                  {...register('currentWeight', { 
                    required: 'Current weight is required',
                    min: { value: 80, message: 'Weight must be at least 80 lbs' },
                    max: { value: 500, message: 'Weight must be 500 lbs or less' }
                  })}
                  placeholder="80-500 lbs"
                  className={errors.currentWeight ? 'error' : ''}
                />
                {errors.currentWeight && <ErrorMessage>{errors.currentWeight.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Gender *</Label>
                <Select
                  {...register('gender', { required: 'Gender is required' })}
                  className={errors.gender ? 'error' : ''}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
                {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Activity Level *</Label>
                <Select
                  {...register('activityLevel', { required: 'Activity level is required' })}
                  className={errors.activityLevel ? 'error' : ''}
                >
                  <option value="">Select activity level</option>
                  <option value="Sedentary">Sedentary (little to no exercise)</option>
                  <option value="Lightly Active">Lightly Active (light exercise 1-3 days/week)</option>
                  <option value="Moderately Active">Moderately Active (moderate exercise 3-5 days/week)</option>
                  <option value="Very Active">Very Active (hard exercise 6-7 days/week)</option>
                </Select>
                {errors.activityLevel && <ErrorMessage>{errors.activityLevel.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <input
                    type="checkbox"
                    {...register('isAthlete')}
                    style={{ marginRight: '0.5rem' }}
                  />
                  Athlete/Competitive Sport Participant
                </Label>
                <small style={{ color: '#718096', display: 'block', marginTop: '0.25rem' }}>
                  Check if client is an athlete or participates in competitive sports
                </small>
              </FormGroup>
            </FormGrid>
          </FormSection>

          {/* Goals and Training */}
          <FormSection>
            <SectionTitle>
              <Target size={20} />
              Goals & Training
            </SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Primary Goal *</Label>
                <Select
                  {...register('primaryGoal', { required: 'Primary goal is required' })}
                  className={errors.primaryGoal ? 'error' : ''}
                >
                  <option value="">Select primary goal</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Athletic Performance">Athletic Performance</option>
                  <option value="General Fitness">General Fitness</option>
                </Select>
                {errors.primaryGoal && <ErrorMessage>{errors.primaryGoal.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>
                  Target Weight (lbs) 
                  <OptionalLabel> (optional)</OptionalLabel>
                </Label>
                <Input
                  type="number"
                  {...register('targetWeight', {
                    min: { value: 80, message: 'Target weight must be at least 80 lbs' },
                    max: { value: 500, message: 'Target weight must be 500 lbs or less' }
                  })}
                  placeholder="80-500 lbs"
                  className={errors.targetWeight ? 'error' : ''}
                />
                {errors.targetWeight && <ErrorMessage>{errors.targetWeight.message}</ErrorMessage>}
                {primaryGoal === 'Weight Loss' && (
                  <small style={{ color: '#718096', marginTop: '0.25rem' }}>
                    Recommended for weight loss goals
                  </small>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Workout Frequency (days/week) *</Label>
                <Input
                  type="number"
                  {...register('workoutFrequency', { 
                    required: 'Workout frequency is required',
                    min: { value: 1, message: 'Frequency must be at least 1 day' },
                    max: { value: 7, message: 'Frequency must be 7 days or less' }
                  })}
                  placeholder="1-7 days"
                  className={errors.workoutFrequency ? 'error' : ''}
                />
                {errors.workoutFrequency && <ErrorMessage>{errors.workoutFrequency.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Session Duration (minutes) *</Label>
                <Input
                  type="number"
                  {...register('sessionDuration', { 
                    required: 'Session duration is required',
                    min: { value: 30, message: 'Duration must be at least 30 minutes' },
                    max: { value: 180, message: 'Duration must be 180 minutes or less' }
                  })}
                  placeholder="30-180 minutes"
                  className={errors.sessionDuration ? 'error' : ''}
                />
                {errors.sessionDuration && <ErrorMessage>{errors.sessionDuration.message}</ErrorMessage>}
              </FormGroup>
            </FormGrid>
          </FormSection>

          {/* Advanced Information */}
          <AdvancedSection>
            <AdvancedToggle
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <Plus size={16} />
              {showAdvanced ? 'Hide' : 'Show'} Advanced Information
            </AdvancedToggle>

            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <InfoBox>
                  <Info size={16} />
                  <div>
                    <strong>Advanced Information:</strong> These fields are optional but will provide more accurate results if you have access to this data. If not provided, we'll use industry-standard estimates.
                  </div>
                </InfoBox>

                <FormGrid>
                  <FormGroup>
                    <Label>
                      Body Fat Percentage (%) 
                      <OptionalLabel> (optional)</OptionalLabel>
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register('bodyFatPercentage', {
                        min: { value: 5, message: 'Body fat must be at least 5%' },
                        max: { value: 50, message: 'Body fat must be 50% or less' }
                      })}
                      placeholder="5-50%"
                      className={errors.bodyFatPercentage ? 'error' : ''}
                    />
                    {errors.bodyFatPercentage && <ErrorMessage>{errors.bodyFatPercentage.message}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Skeletal Muscle Mass (lbs) 
                      <OptionalLabel> (optional)</OptionalLabel>
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register('skeletalMuscleMass', {
                        min: { value: 20, message: 'SMM must be at least 20 lbs' },
                        max: { value: 200, message: 'SMM must be 200 lbs or less' }
                      })}
                      placeholder="20-200 lbs"
                      className={errors.skeletalMuscleMass ? 'error' : ''}
                    />
                    {errors.skeletalMuscleMass && <ErrorMessage>{errors.skeletalMuscleMass.message}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Resting Heart Rate (bpm) 
                      <OptionalLabel> (optional)</OptionalLabel>
                    </Label>
                    <Input
                      type="number"
                      {...register('restingHeartRate', {
                        min: { value: 40, message: 'Heart rate must be at least 40 bpm' },
                        max: { value: 120, message: 'Heart rate must be 120 bpm or less' }
                      })}
                      placeholder="40-120 bpm"
                      className={errors.restingHeartRate ? 'error' : ''}
                    />
                    {errors.restingHeartRate && <ErrorMessage>{errors.restingHeartRate.message}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Pushup Test Reps
                      <OptionalLabel> (optional)</OptionalLabel>
                    </Label>
                    <Input
                      type="number"
                      {...register('pushupReps', {
                        min: { value: 1, message: 'Reps must be at least 1' },
                        max: { value: 100, message: 'Reps must be 100 or less' }
                      })}
                      placeholder="Number of pushups completed"
                      className={errors.pushupReps ? 'error' : ''}
                    />
                    {errors.pushupReps && <ErrorMessage>{errors.pushupReps.message}</ErrorMessage>}
                    <small style={{ color: '#718096', marginTop: '0.25rem' }}>
                      Enter actual pushup test results for more accurate strength calculations
                    </small>
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Medical Conditions 
                      <OptionalLabel> (optional)</OptionalLabel>
                    </Label>
                    <Input
                      {...register('medicalConditions')}
                      placeholder="Any relevant medical conditions"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Current/Past Injuries 
                      <OptionalLabel> (optional)</OptionalLabel>
                    </Label>
                    <Input
                      {...register('injuries')}
                      placeholder="Any injuries to consider"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Dietary Restrictions 
                      <OptionalLabel> (optional)</OptionalLabel>
                    </Label>
                    <Input
                      {...register('dietaryRestrictions')}
                      placeholder="Vegetarian, allergies, etc."
                    />
                  </FormGroup>
                </FormGrid>
              </motion.div>
            )}
          </AdvancedSection>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner />
                Generating Assessment...
              </>
            ) : (
              <>
                Generate Assessment
                <ArrowRight size={20} />
              </>
            )}
          </SubmitButton>
        </form>
      </FormCard>
    </FormContainer>
  );
};

export default AssessmentForm; 