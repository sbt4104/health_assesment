# Fitness Assessment App

A comprehensive, science-based fitness assessment and training plan generator for gym trainers and nutritionists. Built with proven InBody formulas and industry standards to provide accurate, personalized fitness assessments.

## 🎯 Features

### Core Functionality
- **Complete Fitness Assessment**: Generate comprehensive assessments with body composition analysis
- **Science-Based Calculations**: Powered by proven InBody formulas and industry standards
- **Personalized Training Plans**: Custom strength and cardio programs based on goals
- **Nutrition Planning**: Detailed macronutrient breakdown and meal recommendations
- **Weight Loss Strategy**: Timeline and caloric deficit calculations
- **Professional Reports**: Print-ready assessment reports with charts and analytics

### Technical Features
- **Modern React Frontend**: Built with React 18, styled-components, and Framer Motion
- **Node.js Backend**: Express server with comprehensive API endpoints
- **Real-time Validation**: Form validation with error handling
- **Responsive Design**: Mobile-first design with beautiful UI/UX
- **Print Functionality**: Professional report printing
- **Data Persistence**: Local storage for assessment history

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitness-assessment-app
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Start the development servers**
   ```bashn
   # Start both frontend and backend (recommended)
   npm run dev
   
   # Or start them separately:
   # Backend only
   npm run server
   
   # Frontend only (in another terminal)
   cd client && npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## 📊 Assessment Features

### Required Inputs
- Client Name
- Age (16-100)
- Height (inches)
- Current Weight (lbs)
- Gender (Male/Female)
- Activity Level (Sedentary, Lightly Active, Moderately Active, Very Active)
- Primary Goal (Weight Loss, Muscle Gain, Athletic Performance, General Fitness)
- Workout Frequency (days per week, 1-7)
- Session Duration (minutes, 30-180)

### Optional Advanced Inputs
- Target Weight (lbs)
- Body Fat Percentage (%)
- Skeletal Muscle Mass (lbs)
- Resting Heart Rate (bpm)
- Medical Conditions
- Current/Past Injuries
- Dietary Restrictions

### Generated Outputs

#### Body Composition Analysis
- BMI calculation and classification
- Healthy weight range
- Body fat percentage (estimated or measured)
- Skeletal muscle mass and percentage
- SMM target ranges

#### Metabolic Profile
- Resting Metabolic Rate (RMR)
- Total Daily Calorie Needs
- Protein Requirements
- Activity Level Impact

#### Weight Loss Strategy (if applicable)
- Weekly weight loss projections
- Timeline to goal
- Caloric deficit breakdown
- Sustainability assessment

#### Fitness Assessment
- Estimated 1RM calculations
- Push-up capacity estimation
- Heart rate training zones
- Max and resting heart rate

#### Nutrition Plan
- Daily calorie targets
- Macronutrient breakdown (protein/carbs/fat)
- Percentage distributions
- Visual charts

#### Training Program
- **Strength Training**:
  - 4-week progression cycle
  - Exercise recommendations by goal
  - Rep ranges and set schemes
- **Cardiovascular Training**:
  - Heart rate zone training
  - Duration and frequency
  - Cardio type recommendations

## 🧮 Calculation Methods

### InBody Formulas Used
- **BMI**: `(Body Weight × 703) / Height²`
- **RMR**: `Body Weight × 11`
- **Activity Multipliers**: Sedentary (1.2), Lightly Active (1.375), Moderately Active (1.55), Very Active (1.725)
- **Protein Requirements**: `SMM × 1.5`
- **Weight Loss**: 3500 calories = 1 lb deficit
- **Heart Rate Zones**: 5 zones from 50-100% of HR Reserve

### Estimation Methods
- **Body Fat**: Base estimates by gender, adjusted for age and activity
- **Skeletal Muscle Mass**: Calculated from lean mass × 0.45
- **Push-up Capacity**: Estimated from age, gender, and activity level
- **Resting Heart Rate**: Age and fitness level defaults

## 🛠️ API Endpoints

### Assessment
- `POST /api/assessment` - Generate complete fitness assessment
- `POST /api/calculate/bmi` - Calculate BMI and healthy weight range
- `POST /api/calculate/calories` - Calculate RMR and daily calories
- `POST /api/calculate/weight-loss` - Generate weight loss strategy

### Training & Nutrition
- `POST /api/training/generate` - Generate training program
- `POST /api/nutrition/generate` - Generate nutrition plan

### Health Check
- `GET /api/health` - API health status

## 📁 Project Structure

```
fitness-assessment-app/
├── server/
│   ├── index.js                 # Express server
│   └── utils/
│       └── fitnessCalculations.js # Core calculation logic
├── client/
│   ├── public/
│   │   └── index.html          # Main HTML file
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js       # Navigation header
│   │   │   ├── LandingPage.js  # Home page
│   │   │   ├── AssessmentForm.js # Assessment input form
│   │   │   ├── AssessmentResults.js # Results display
│   │   │   └── Dashboard.js    # Assessment management
│   │   ├── App.js              # Main app component
│   │   ├── index.js            # React entry point
│   │   └── index.css           # Global styles
│   └── package.json            # Frontend dependencies
├── package.json                # Backend dependencies
└── README.md                   # This file
```

## 🎨 UI/UX Features

### Design System
- **Modern Gradient Background**: Purple to blue gradient theme
- **Glass Morphism**: Translucent cards with backdrop blur
- **Responsive Grid Layouts**: Adaptive design for all screen sizes
- **Smooth Animations**: Framer Motion animations throughout
- **Professional Typography**: Inter font family

### User Experience
- **Progressive Form**: Step-by-step assessment with validation
- **Real-time Feedback**: Immediate error messages and success states
- **Print-Ready Reports**: Professional formatting for printing
- **Mobile Responsive**: Optimized for all devices
- **Accessibility**: WCAG compliant with focus management

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start both frontend and backend
npm run server       # Start backend only
npm run client       # Start frontend only

# Production
npm run build        # Build frontend for production
npm start            # Start production server

# Installation
npm run install-all  # Install all dependencies
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
```

### Adding New Features

1. **Backend Calculations**: Add new methods to `server/utils/fitnessCalculations.js`
2. **API Endpoints**: Add routes to `server/index.js`
3. **Frontend Components**: Create new components in `client/src/components/`
4. **Styling**: Use styled-components for component-specific styles

## 📈 Future Enhancements

### Phase 2 Features
- User authentication and registration
- Database integration (MongoDB/PostgreSQL)
- PDF export functionality
- Progress tracking over time
- Advanced analytics and reporting

### Phase 3 Features
- Mobile app (React Native)
- Integration with fitness trackers
- AI-powered recommendations
- Social features and sharing
- Advanced progress analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Medical Disclaimer

This application is for informational purposes only and should not replace professional medical advice. Always consult with healthcare providers before starting any fitness program, especially if you have medical conditions or concerns. The calculations are estimates based on standard formulas and may not be accurate for all individuals.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for fitness professionals and their clients** 