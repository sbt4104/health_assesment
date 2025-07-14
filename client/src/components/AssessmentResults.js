import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  Download, 
  Printer, 
  ArrowLeft, 
  User, 
  Activity, 
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const ResultsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ResultsCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ClientName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const AssessmentDate = styled.p`
  color: #718096;
  font-size: 1.1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
  }
  
  &.secondary {
    background: white;
    color: #4a5568;
    border: 2px solid #e2e8f0;
    
    &:hover {
      border-color: #667eea;
      color: #667eea;
    }
  }
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const MetricTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.25rem;
`;

const MetricUnit = styled.span`
  font-size: 1rem;
  color: #718096;
  font-weight: normal;
`;

const MetricDescription = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.5rem;
  
  &.success {
    background: rgba(72, 187, 120, 0.1);
    color: #38a169;
  }
  
  &.warning {
    background: rgba(237, 137, 54, 0.1);
    color: #dd6b20;
  }
  
  &.danger {
    background: rgba(245, 101, 101, 0.1);
    color: #e53e3e;
  }
  
  &.info {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
  }
`;

const TrainingSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  margin-bottom: 2rem;
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }
`;







const DisclaimerBox = styled.div`
  background: rgba(237, 137, 54, 0.1);
  border: 1px solid rgba(237, 137, 54, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const AssessmentResults = () => {
  const navigate = useNavigate();
  const [assessmentData, setAssessmentData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('assessmentData');
    if (data) {
      setAssessmentData(JSON.parse(data));
    } else {
      navigate('/assessment');
    }
  }, [navigate]);

  if (!assessmentData) {
    return <div>Loading...</div>;
  }

  const {
    clientInfo,
    bodyComposition,
    metabolic,
    weightLossStrategy
  } = assessmentData;

  const bmiColor = bodyComposition.bmiCategory.color;
  const bmiColors = {
    green: '#38a169',
    orange: '#dd6b20',
    red: '#e53e3e',
    blue: '#3182ce'
  };



  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implementation for PDF download
    toast.info('PDF download feature coming soon!');
  };

  return (
    <ResultsContainer>
      <ResultsCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeaderSection>
          <ClientName>{clientInfo.name}'s Fitness Assessment</ClientName>
          <AssessmentDate>
            Assessment Date: {new Date().toLocaleDateString()}
          </AssessmentDate>
          
          <ActionButtons>
            <ActionButton
              className="secondary"
              onClick={() => navigate('/assessment')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              New Assessment
            </ActionButton>
            <ActionButton
              className="primary"
              onClick={handlePrint}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Printer size={18} />
              Print Report
            </ActionButton>
            <ActionButton
              className="primary"
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              Download PDF
            </ActionButton>
          </ActionButtons>
        </HeaderSection>



        {/* Body Composition */}
        <Section>
          <SectionTitle>
            <User size={20} />
            Body Composition Analysis
          </SectionTitle>
          <MetricsGrid>
            <MetricCard>
              <MetricTitle>BMI</MetricTitle>
              <MetricValue style={{ color: bmiColors[bmiColor] }}>
                {bodyComposition.bmi.toFixed(1)}
              </MetricValue>
              <StatusBadge className={bmiColor}>
                {bodyComposition.bmiCategory.category}
              </StatusBadge>
              <MetricDescription>
                Goal range: {bodyComposition.goalWeightRange?.min ?? '--'}-{bodyComposition.goalWeightRange?.max ?? '--'} lbs
              </MetricDescription>
            </MetricCard>

            <MetricCard>
              <MetricTitle>Body Fat Percentage</MetricTitle>
              <MetricValue>{bodyComposition.bodyFatPercentage.toFixed(1)}%</MetricValue>
              <StatusBadge className={
                bodyComposition.bodyFatStatus === 'Optimal' ? 'success' :
                bodyComposition.bodyFatStatus === 'High' ? 'warning' : 'info'
              }>
                {bodyComposition.bodyFatStatus}
              </StatusBadge>
              <MetricDescription>
                Ideal: {bodyComposition.idealBodyFatRange?.min ?? '--'}-{bodyComposition.idealBodyFatRange?.max ?? '--'}%
              </MetricDescription>
            </MetricCard>

            <MetricCard>
              <MetricTitle>Skeletal Muscle Mass</MetricTitle>
              <MetricValue>{bodyComposition.skeletalMuscleMass} lbs</MetricValue>
              <MetricDescription>
                {bodyComposition.smmPercentage.toFixed(1)}% of body weight
              </MetricDescription>
            </MetricCard>

            <MetricCard>
              <MetricTitle>SMM Target Range</MetricTitle>
              <MetricValue>
                {bodyComposition.smmTarget?.min ?? '--'}-{bodyComposition.smmTarget?.max ?? '--'}%
              </MetricValue>
              <StatusBadge className={
                bodyComposition.smmPercentage >= bodyComposition.smmTarget?.min && 
                bodyComposition.smmPercentage <= bodyComposition.smmTarget?.max ? 'success' : 'warning'
              }>
                {bodyComposition.smmPercentage >= bodyComposition.smmTarget?.min && 
                 bodyComposition.smmPercentage <= bodyComposition.smmTarget?.max ? 'In Range' : 'Needs Improvement'}
              </StatusBadge>
            </MetricCard>
          </MetricsGrid>

          {/* Muscle Deficit Analysis */}
          {bodyComposition.muscleDeficit > 0 && (
            <TrainingSection>
              <h3>Muscle Development Needs</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Muscle to Add</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                    {bodyComposition.muscleDeficit} lbs
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>to reach target range</div>
                </div>
                <div style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Current SMM</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#38a169' }}>
                    {bodyComposition.smmPercentage.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>of body weight</div>
                </div>
                <div style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Target SMM</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#dd6b20' }}>
                    {bodyComposition.smmTarget?.min ?? '--'}%
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>minimum target</div>
                </div>
              </div>
            </TrainingSection>
          )}
        </Section>

        {/* Metabolic Profile */}
        <Section>
          <SectionTitle>
            <Activity size={20} />
            Metabolic Profile
          </SectionTitle>
          <MetricsGrid>
            <MetricCard>
              <MetricTitle>Resting Metabolic Rate</MetricTitle>
              <MetricValue>{metabolic.rmr.toLocaleString()} <MetricUnit>calories/day</MetricUnit></MetricValue>
              <MetricDescription>
                Base calorie needs at rest
              </MetricDescription>
            </MetricCard>

            <MetricCard>
              <MetricTitle>Total Daily Calories</MetricTitle>
              <MetricValue>{metabolic.totalDailyCalories.toLocaleString()} <MetricUnit>calories/day</MetricUnit></MetricValue>
              <MetricDescription>
                Including activity level ({clientInfo.activityLevel})
              </MetricDescription>
            </MetricCard>

            <MetricCard>
              <MetricTitle>Protein Requirements</MetricTitle>
              <MetricValue>{metabolic.proteinRequirements.recommended} <MetricUnit>grams/day</MetricUnit></MetricValue>
              <MetricDescription>
                Range: {metabolic.proteinRequirements.minimum}-{metabolic.proteinRequirements.maximum}g
              </MetricDescription>
            </MetricCard>

            <MetricCard>
              <MetricTitle>Activity Multiplier</MetricTitle>
              <MetricValue>{metabolic.activityMultiplier}</MetricValue>
              <MetricDescription>
                Applied to RMR for total calories
              </MetricDescription>
            </MetricCard>
          </MetricsGrid>

          {/* Macronutrient Breakdown */}
          {metabolic.macronutrients && (
            <TrainingSection>
              <h3>Macronutrient Breakdown</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Protein</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                    {metabolic.macronutrients.protein.grams}g
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                    {metabolic.macronutrients.protein.calories} cal ({metabolic.macronutrients.protein.percentage}%)
                  </div>
                </div>
                <div style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Carbohydrates</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#48bb78' }}>
                    {metabolic.macronutrients.carbs.grams}g
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                    {metabolic.macronutrients.carbs.calories} cal ({metabolic.macronutrients.carbs.percentage}%)
                  </div>
                </div>
                <div style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Fat</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ed8936' }}>
                    {metabolic.macronutrients.fat.grams}g
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                    {metabolic.macronutrients.fat.calories} cal ({metabolic.macronutrients.fat.percentage}%)
                  </div>
                </div>
              </div>
            </TrainingSection>
          )}
        </Section>

        {/* Weight Loss Strategy */}
        {weightLossStrategy && (
          <Section>
            <SectionTitle>
              <TrendingUp size={20} />
              Weight Loss Strategy
            </SectionTitle>
            <MetricsGrid>
              <MetricCard>
                <MetricTitle>Weekly Weight Loss</MetricTitle>
                <MetricValue>{weightLossStrategy.weeklyWeightLoss} <MetricUnit>lbs/week</MetricUnit></MetricValue>
                <MetricDescription>
                  Sustainable rate
                </MetricDescription>
              </MetricCard>

              <MetricCard>
                <MetricTitle>Timeline to Goal</MetricTitle>
                <MetricValue>{weightLossStrategy.timelineWeeks} <MetricUnit>weeks</MetricUnit></MetricValue>
                <MetricDescription>
                  To reach target weight
                </MetricDescription>
              </MetricCard>

              <MetricCard>
                <MetricTitle>Daily Caloric Deficit</MetricTitle>
                <MetricValue>{weightLossStrategy.totalDailyDeficit} <MetricUnit>calories</MetricUnit></MetricValue>
                <MetricDescription>
                  Nutritional + active deficit
                </MetricDescription>
              </MetricCard>

              <MetricCard>
                <MetricTitle>Weight to Lose</MetricTitle>
                <MetricValue>{weightLossStrategy.weightToLose} <MetricUnit>lbs</MetricUnit></MetricValue>
                <MetricDescription>
                  Current to target weight
                </MetricDescription>
              </MetricCard>
            </MetricsGrid>

            {/* Protein Impact Comparison */}
            {weightLossStrategy.proteinComparison && (
              <TrainingSection>
                <h3>Protein Impact on Weight Loss</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  {/* Without Protein */}
                  <div style={{
                    background: 'linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid #fc8181',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ color: '#c53030', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
                      Without Adequate Protein
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#c53030' }}>Fat Loss</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#e53e3e' }}>
                          {weightLossStrategy.proteinComparison.withoutProtein.fatLoss} lbs
                        </div>
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#c53030' }}>Muscle Loss</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#e53e3e' }}>
                          {weightLossStrategy.proteinComparison.withoutProtein.muscleLoss} lbs
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#c53030', fontStyle: 'italic' }}>
                      Poor body composition outcome
                    </div>
                  </div>

                  {/* With Protein */}
                  <div style={{
                    background: 'linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid #68d391',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ color: '#38a169', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
                      With Adequate Protein ({metabolic.proteinRequirements.recommended}g/day)
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#38a169' }}>Fat Loss</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#e53e3e' }}>
                          {weightLossStrategy.proteinComparison.withProtein.fatLoss} lbs
                        </div>
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#38a169' }}>Muscle Loss</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#e53e3e' }}>
                          {weightLossStrategy.proteinComparison.withProtein.muscleLoss} lbs
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#38a169', fontWeight: '600' }}>
                      +{weightLossStrategy.proteinComparison.withProtein.musclePreserved} lbs muscle preserved
                    </div>
                  </div>
                </div>

                <div style={{ 
                  background: 'rgba(102, 126, 234, 0.1)', 
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginTop: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#667eea', marginBottom: '0.5rem' }}>
                    Key Takeaway
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#4a5568' }}>
                    Adequate protein intake ({metabolic.proteinRequirements.recommended}g/day) helps preserve {weightLossStrategy.proteinComparison.withProtein.musclePreserved} lbs of muscle 
                    and increases fat loss by {weightLossStrategy.proteinComparison.withProtein.fatLoss - weightLossStrategy.proteinComparison.withoutProtein.fatLoss} lbs during your weight loss journey.
                  </div>
                </div>
              </TrainingSection>
            )}

            {/* Enhanced Weight Loss Breakdown */}
            <TrainingSection>
              <h3>Weight Loss Breakdown</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Fat to Lose</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#e53e3e' }}>
                    {weightLossStrategy.fatToLose} lbs
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>target fat loss</div>
                </div>
                <div style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Expected Muscle Loss</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#e53e3e' }}>
                    {weightLossStrategy.musclePreservation} lbs
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>can be minimized with training</div>
                </div>
                <div style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Nutritional Deficit</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#dd6b20' }}>
                    {weightLossStrategy.nutritionalDeficit} cal
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>per day</div>
                </div>
                <div style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Workout Calories</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                    {weightLossStrategy.workoutCalories} cal
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>from {clientInfo.workoutFrequency} sessions/week</div>
                </div>
                <div style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>Active Calories</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#38a169' }}>
                    {weightLossStrategy.activeCalories} cal
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>from daily activity</div>
                </div>
              </div>
            </TrainingSection>
          </Section>
        )}







        {/* Disclaimer */}
        <DisclaimerBox>
          <AlertTriangle size={16} />
          <div>
            <strong>Medical Disclaimer:</strong> This assessment is for informational purposes only and should not replace professional medical advice. Always consult with healthcare providers before starting any fitness program, especially if you have medical conditions or concerns. The calculations are estimates based on standard formulas and may not be accurate for all individuals.
          </div>
        </DisclaimerBox>
      </ResultsCard>
    </ResultsContainer>
  );
};

export default AssessmentResults; 