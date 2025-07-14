import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  User,
  Target,
  TrendingUp,
  FileText,
  Trash2,
  Eye
} from 'lucide-react';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const DashboardCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const DashboardTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 250px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const NewAssessmentButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #718096;
  font-size: 0.875rem;
`;

const AssessmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const AssessmentCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const AssessmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ClientName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

const AssessmentDate = styled.div`
  color: #718096;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const AssessmentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.span`
  font-weight: 600;
  color: #2d3748;
`;

const GoalBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.5rem;
  
  &.weight-loss {
    background: rgba(72, 187, 120, 0.1);
    color: #38a169;
  }
  
  &.muscle-gain {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
  }
  
  &.athletic {
    background: rgba(237, 137, 54, 0.1);
    color: #dd6b20;
  }
  
  &.fitness {
    background: rgba(159, 122, 234, 0.1);
    color: #9f7aea;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a67d8;
    }
  }
  
  &.danger {
    background: #e53e3e;
    color: white;
    
    &:hover {
      background: #c53030;
    }
  }
  
  &.secondary {
    background: #e2e8f0;
    color: #4a5568;
    
    &:hover {
      background: #cbd5e0;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #718096;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const Dashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGoal, setFilterGoal] = useState('all');

  useEffect(() => {
    // Load saved assessments from localStorage
    const savedAssessments = JSON.parse(localStorage.getItem('savedAssessments') || '[]');
    setAssessments(savedAssessments);
  }, []);

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.clientInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterGoal === 'all' || assessment.clientInfo.primaryGoal === filterGoal;
    return matchesSearch && matchesFilter;
  });

  const getGoalClass = (goal) => {
    const goalMap = {
      'Weight Loss': 'weight-loss',
      'Muscle Gain': 'muscle-gain',
      'Athletic Performance': 'athletic',
      'General Fitness': 'fitness'
    };
    return goalMap[goal] || 'fitness';
  };

  const handleViewAssessment = (assessment) => {
    localStorage.setItem('assessmentData', JSON.stringify(assessment));
    window.location.href = '/results';
  };

  const handleDeleteAssessment = (index) => {
    const updatedAssessments = assessments.filter((_, i) => i !== index);
    setAssessments(updatedAssessments);
    localStorage.setItem('savedAssessments', JSON.stringify(updatedAssessments));
  };

  const stats = {
    total: assessments.length,
    weightLoss: assessments.filter(a => a.clientInfo.primaryGoal === 'Weight Loss').length,
    muscleGain: assessments.filter(a => a.clientInfo.primaryGoal === 'Muscle Gain').length,
    recent: assessments.filter(a => {
      const date = new Date(a.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return date > weekAgo;
    }).length
  };

  return (
    <DashboardContainer>
      <DashboardCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <DashboardHeader>
          <DashboardTitle>Assessment Dashboard</DashboardTitle>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <SearchBar>
              <SearchInput
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FilterSelect
                value={filterGoal}
                onChange={(e) => setFilterGoal(e.target.value)}
              >
                <option value="all">All Goals</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Athletic Performance">Athletic Performance</option>
                <option value="General Fitness">General Fitness</option>
              </FilterSelect>
            </SearchBar>
            
            <NewAssessmentButton to="/assessment">
              <Plus size={18} />
              New Assessment
            </NewAssessmentButton>
          </div>
        </DashboardHeader>

        <StatsGrid>
          <StatCard>
            <StatNumber>{stats.total}</StatNumber>
            <StatLabel>Total Assessments</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.weightLoss}</StatNumber>
            <StatLabel>Weight Loss Goals</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.muscleGain}</StatNumber>
            <StatLabel>Muscle Gain Goals</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.recent}</StatNumber>
            <StatLabel>This Week</StatLabel>
          </StatCard>
        </StatsGrid>

        {filteredAssessments.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📊</EmptyIcon>
            <h3>No assessments found</h3>
            <p>
              {assessments.length === 0 
                ? "You haven't created any assessments yet. Start by creating your first assessment!"
                : "No assessments match your current search and filter criteria."
              }
            </p>
            {assessments.length === 0 && (
              <NewAssessmentButton to="/assessment" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                <Plus size={18} />
                Create First Assessment
              </NewAssessmentButton>
            )}
          </EmptyState>
        ) : (
          <AssessmentsGrid>
            {filteredAssessments.map((assessment, index) => (
              <AssessmentCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AssessmentHeader>
                  <div>
                    <ClientName>{assessment.clientInfo.name}</ClientName>
                    <AssessmentDate>
                      <Calendar size={14} />
                      {new Date(assessment.date).toLocaleDateString()}
                    </AssessmentDate>
                  </div>
                </AssessmentHeader>

                <AssessmentDetails>
                  <DetailItem>
                    <DetailLabel>Age</DetailLabel>
                    <DetailValue>{assessment.clientInfo.age} years</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Weight</DetailLabel>
                    <DetailValue>{assessment.clientInfo.currentWeight} lbs</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>BMI</DetailLabel>
                    <DetailValue>{assessment.bodyComposition.bmi.toFixed(1)}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Activity Level</DetailLabel>
                    <DetailValue>{assessment.clientInfo.activityLevel}</DetailValue>
                  </DetailItem>
                </AssessmentDetails>

                <GoalBadge className={getGoalClass(assessment.clientInfo.primaryGoal)}>
                  {assessment.clientInfo.primaryGoal}
                </GoalBadge>

                <ActionButtons>
                  <ActionButton
                    className="primary"
                    onClick={() => handleViewAssessment(assessment)}
                  >
                    <Eye size={14} />
                    View
                  </ActionButton>
                  <ActionButton
                    className="secondary"
                    onClick={() => window.print()}
                  >
                    <FileText size={14} />
                    Print
                  </ActionButton>
                  <ActionButton
                    className="danger"
                    onClick={() => handleDeleteAssessment(index)}
                  >
                    <Trash2 size={14} />
                    Delete
                  </ActionButton>
                </ActionButtons>
              </AssessmentCard>
            ))}
          </AssessmentsGrid>
        )}
      </DashboardCard>
    </DashboardContainer>
  );
};

export default Dashboard; 